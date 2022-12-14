import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Head from 'next/head';
import NoteForm from '../../components/NoteForm';
import dbConnect from '../../lib/dbConnect';
import { Note } from '../../models/Models';

const Edit = ({ note }: any) => {
  return (
    <>
      <Head>
        <title>Edit - {note.title} - Notes</title>
      </Head>
      <div className='container mx-auto w-full'>
        <header className='mb-6'>
          <h1 className='text-2xl font-semibold'>Edit note</h1>
        </header>

        <NoteForm title={note.title} markdown={note.markdown} tags={note.tags} forNewNote={false} />
      </div>
    </>
  );
};

export async function getServerSideProps({ params }: Params) {
  await dbConnect();
  const note = await Note.findById(params.id).populate('tags').lean();
  return {
    props: {
      note: JSON.parse(JSON.stringify(note)),
    }
  };
};

export default Edit;