import { useEffect } from 'react';
import useThemeStore from './useThemeStore';
import { applyThemePreference } from '../utils/themeUtils';

const selector = (state: any) => state.theme;

export const useTheme = () => {
  const theme = useThemeStore(selector);
  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);
};
