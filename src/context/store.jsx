import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const store = create(
  persist(
    (set, get) => ({
      authenticated: false,
      loginSuccess: (user) => {
        set({ authenticated: true, user: user });
      },
      logout: () => {
        set({ authenticated: false, user: null });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      },
    }),
    { name: "task", storage: createJSONStorage(() => localStorage) }
  )
);

export default store;
