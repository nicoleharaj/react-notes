import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Sidebar from '../components/Sidebar';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div className='flex flex-col w-full h-screen xl:flex-row'>

      <div className='border-b bg-stone-100 transition duration-300 ease-in-expo dark:bg-stone-800 dark:border-stone-600 xl:w-80 xl:h-screen xl:border-r' >
        <Sidebar />
      </div>
      <div className='flex flex-1 overflow-y-scroll p-6 text-stone-900 bg-white dark:bg-stone-900 dark:text-white transition duration-300 ease-in-expo after:content-none after:h-6'>
        <Component {...pageProps} />
      </div>

    </div>
  );
}
