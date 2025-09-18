import { create } from "zustand";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/utils/firebase";

export interface CleanUser {
  uid: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  image: string | null;
}

interface AuthState {
  user: CleanUser | null;
  loading: boolean;
  setUser: (user: FirebaseUser | null) => void;
  clearUser: () => void;
}

// 🔹 Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => {
    if (user) {
      const cleanUser: CleanUser = {
        uid: user.uid,
        name: user.displayName ?? null,
        email: user.email ?? null,
        phone: user.phoneNumber ?? null,
        image: user.photoURL ?? null,
      };

      console.log("✅ User Logged In Details:", {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      });

      console.log("🧾 Display User (cleaned):", cleanUser);

      set({ user: cleanUser, loading: false });
    } else {
      set({ user: null, loading: false });
    }
  },
  clearUser: () => {
    console.log("🚪 User Logged Out");
    set({ user: null, loading: false });
  },
}));

// 🔹 Firebase auth listener
export const initAuthListener = () => {
  onAuthStateChanged(auth, (user) => {
    console.log("🔹 Firebase Auth State Changed:", user);
    if (user) {
      useAuthStore.getState().setUser(user);
    } else {
      useAuthStore.getState().clearUser();
    }
  });
};
