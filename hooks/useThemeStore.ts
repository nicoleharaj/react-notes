import create from 'zustand';
import { persist } from 'zustand/middleware';
import { THEME_TYPES } from '../utils/themeUtils';

const { THEME_LIGHT, THEME_DARK } = THEME_TYPES;

interface ThemeState {
  theme: string;
  toggleTheme: () => void;
}

const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      theme: THEME_LIGHT,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT,
        })),
    }),
    {
      name: 'THEME',
    }
  )
);
export default useThemeStore;
