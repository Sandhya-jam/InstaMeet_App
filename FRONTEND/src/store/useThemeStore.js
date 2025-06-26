import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("instMeet-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("instMeet-theme", theme);
    set({ theme });
  },
}));