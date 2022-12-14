import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Notes</title>
        <meta name='description' content='Generated by create next app' />
      </Head>

      <div className='flex justify-center items-center w-full h-full'>
        <h2 className='w-96 text-4xl select-none text-zinc-300 text-center dark:text-zinc-600' aria-hidden>Please open or create a new note.</h2>
      </div>

    </>
  );
}