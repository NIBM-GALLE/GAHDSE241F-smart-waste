import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore();

// Signup function
interface SignupParams {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

export const getUserRole = async (uid: string) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data()?.role : "user";
};

export const signup = async ({ name, email, password, address, phone }: SignupParams) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  
    await updateProfile(user, { displayName: name });
  
    setDoc(doc(db, "users", user.uid), {
        name,
        email,
        address,
        phone,
    });
  };
  
  // export const googleSignup = async () => {
  //   const provider = new GoogleAuthProvider();
  //   const result = await signInWithPopup(auth, provider);
  //   const user = result.user;
  
  //   await setDoc(doc(db, "users", user.uid), {
  //     name: user.displayName,
  //     email: user.email,
  //     address: "",
  //     phone: "",
  //   });
  // };

// Login function
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// Google Login
// export const googleLogin = async () => {
//   try {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     return result.user;
//   } catch (error) {
//     console.error("Google Login Error:", error);
//     throw error;
//   }
// };

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
// Function not implemented error removed

