import { FiSun, FiMoon } from 'react-icons/fi';
import useThemeStore from '../hooks/useThemeStore';
import { useTheme } from '../hooks/useTheme';



const ThemeToggler = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore().theme;
  useTheme();

  return (
    <label
      htmlFor='dark-toggler'
      className='relative flex items-center justify-start cursor-pointer gap-2 w-fit text-md transition ease-in-expo'
      aria-controls='dark-toggler'>
      <FiSun className='text-zinc-900 dark:text-zinc-500' aria-hidden />
      <span className='sr-only'>Toggle theme</span>
      <input
        type='checkbox'
        id='dark-toggler'
        className='sr-only'
        onClick={toggleTheme}
        defaultChecked={theme === 'dark'}
        aria-label='Theme toggle'
      />
      <div className='toggle-bg bg-zinc-300 h-4 w-9 rounded-full transition-colors'></div>
      <FiMoon className='text-zinc-300 dark:text-white' aria-hidden />
    </label>
  );

};


export default ThemeToggler;