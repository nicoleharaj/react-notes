import { useRouter } from 'next/router';
import NoteForm from '../components/NoteForm';

const NewNote = () => {
  const router = useRouter();
  const contentType = 'application/json';

  const onCreateNote = async ({ ...data }) => {
    try {
      const note = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({ ...data })
      }).then((res) => {
        return res.json();
      });
      router.push(`/${note._id}`);
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <div className='container text-stone-900 transition ease-in-expo duration-300 dark:text-white'>
      <header className='mb-6'>
        <h1 className='text-2xl font-semibold'>New note</h1>
      </header>

      <NoteForm onSubmit={onCreateNote} />

    </div>
  );
};

export default NewNote;