import Head from 'next/head';
import NoteForm from '../components/NoteForm';

const NewNote = () => {
  return (
    <>
      <Head>
        <title>Create a new note - Notes</title>
      </Head>
      <div className='container text-stone-900 transition dark:text-white'>
        <header className='mb-6'>
          <h1 className='text-2xl font-semibold'>New note</h1>
        </header>

        <NoteForm forNewNote tags={[]} />

      </div>
    </>
  );
};

export default NewNote;