import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import NoteForm from '../../components/NoteForm';
import dbConnect from '../../lib/dbConnect';
import Note from '../../models/Note';

const Edit = ({ note }: any) => {
  return (
    <div className='w-full'>
      <header className='mb-6'>
        <h1 className='text-2xl font-semibold'>Edit note</h1>
      </header>

      <NoteForm title={note.title} markdown={note.markdown} forNewNote={false} />
    </div>
  );
};

export async function getServerSideProps({ params }: Params) {
  await dbConnect();
  const note = await Note.findById(params.id).lean();
  return {
    props: {
      note: JSON.parse(JSON.stringify(note)),
    }
  };
};

export default Edit;