import { useRouter } from 'next/router';
import NoteForm from '../components/NoteForm';
import axiosInstance from '../utils/axiosInstance';

const NewNote = () => {
  const router = useRouter();
  const contentType = 'application/json';

  const onCreateNote = async ({ ...data }) => {
    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({ ...data })
      }).then((res) => {
        router.replace(`/${data._id}`);
        return res.json();
      });
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