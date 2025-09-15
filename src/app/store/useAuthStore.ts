import { create } from "zustand";
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void; // 🔹 ADD THIS
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  clearUser: () => set({ user: null, loading: false }), // 🔹 IMPLEMENTATION
}));

// 🔹 Firebase auth listener
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/utils/firebase";

export const initAuthListener = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      useAuthStore.getState().setUser(user);
    } else {
      useAuthStore.getState().clearUser(); // ✅ ab yeh available hai
    }
  });
};
