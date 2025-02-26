import { NextRequest, NextResponse } from "next/server";
import { db } from "./firebase/firebaseConfig"; // Use shared Firestore instance
import { doc, getDoc } from "firebase/firestore";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const url = new URL(req.url);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const userId = req.cookies.get("userId")?.value;

  if (!userId) {
    console.error("User ID is undefined");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const userDoc = await getDoc(doc(db, "users", userId));

    if (!userDoc.exists()) {
      console.error(`User document for ${userId} does not exist.`);
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = userDoc.data()?.role || "user";

    // Ensure `pathname` exists before accessing it
    const pathname = url.pathname;

    if (!pathname) {
      console.error("Failed to retrieve pathname");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/admin/dashboard") && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

  } catch (error) {
    console.error("Firestore Error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/dashboard/:path*"],
};
