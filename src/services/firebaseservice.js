import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBhJ0gix7pEutkEMOZOUfHELAtxIOv0CI8",
  authDomain: "jewelry-shop-781c0.firebaseapp.com",
  projectId: "jewelry-shop-781c0",
  storageBucket: "jewelry-shop-781c0.appspot.com",
  messagingSenderId: "346498507265",
  appId: "1:346498507265:web:1cec4fb56538a26a081600",
  measurementId: "G-XH8BT8HMX2",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = getAuth(app);

// Firebase authentication service
const FirebaseAuthService = {
  // Function to sign in an existing user
  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Function to sign out the current user
  signOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default FirebaseAuthService;
