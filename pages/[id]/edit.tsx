import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useRouter } from 'next/router';
import NoteForm from '../../components/NoteForm';
import dbConnect from '../../lib/dbConnect';
import Note from '../../models/Note';

const Edit = ({ note }: any) => {
  const router = useRouter();
  const contentType = 'application/json';

  const onUpdateNote = async ({ ...data }) => {
    try {
      await fetch(`/api/notes/${note._id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({ ...data })
      }).then((res) => {
        router.push(`/${note._id}`);
        return res.json();
      });
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <div className='w-full'>
      <header className='mb-6'>
        <h1 className='text-2xl font-semibold'>Edit note</h1>
      </header>

      <NoteForm title={note.title} markdown={note.markdown} onSubmit={onUpdateNote} />
    </div>
  );
};

export async function getServerSideProps({ params }: Params) {
  await dbConnect();
  const note = await Note.findById(params.id).lean();
  note._id = note._id.toString();
  return { props: { note } };
};

export default Edit;