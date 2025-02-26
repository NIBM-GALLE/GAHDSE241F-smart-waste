import { auth } from "./firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore();

interface SignupParams {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role?: string; // Role added
}

// Fetch user role
export const getUserRole = async (uid: string) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data()?.role : "user";
};

// Signup function with role
export const signup = async ({ name, email, password, address, phone, role = "user" }: SignupParams) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      address,
      phone,
      role, // Store role in Firestore
    });

    return user;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

// Login function with role retrieval
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user role from Firestore
    const role = await getUserRole(user.uid);

    return { user, role };
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};

export { auth };
