import NoteForm from '../components/NoteForm';

const NewNote = () => {
  return (
    <div className='container text-stone-900 transition dark:text-white'>
      <header className='mb-6'>
        <h1 className='text-2xl font-semibold'>New note</h1>
      </header>

      <NoteForm forNewNote />

    </div>
  );
};

export default NewNote;