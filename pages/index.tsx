import Head from 'next/head';
import dbConnect from '../lib/dbConnect';
import Note from '../models/Note';

export default function Home({ notes }: any) {
  return (
    <>
      <Head>
        <title>Hi</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div className='flex justify-center items-center w-full h-full'>
        <h2 className='w-96 text-4xl select-none text-zinc-300 text-center dark:text-zinc-600'>Please open or create a new note.</h2>
      </div>

    </>
  );
}


export async function getServerSideProps() {
  await dbConnect();
  
  const res = await Note.find({});
  const notes = res.map((doc) => {
    const note = doc.toObject();
    note._id = note._id.toString();
    return note;
  });

  return { props: { notes: notes } };
}