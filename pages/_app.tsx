import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Sidebar from '../components/Sidebar';

// Twemoji graphics made by Twitter and other contributors, licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div className='flex flex-col w-full h-screen xl:flex-row'>

      <nav className='border-b bg-stone-100 transition dark:bg-stone-800 dark:border-stone-600 xl:w-80 xl:h-screen xl:border-r' >
        <Sidebar />
      </nav>
      <main className='flex flex-1 p-6 text-stone-900 bg-white dark:bg-stone-900 dark:text-white transition xl:overflow-y-scroll'>
        <Component {...pageProps} />
      </main>

    </div>
  );
}
