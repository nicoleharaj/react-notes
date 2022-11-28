import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useRouter } from 'next/router';
import NoteForm from '../../components/NoteForm';
import axiosInstance from '../../utils/axiosInstance';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API_URL}/notes`);
  const notes = await res.json();

  const paths = notes.map((note: any) => ({
    params: { id: note.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: Params) {
  const res = await fetch(`${process.env.API_URL}/notes/${params.id}`);
  const note = await res.json();

  return { props: { note } };
}

const Edit = ({ note }: any) => {
  const router = useRouter();

  const onUpdateNote = ({ ...data }) => {
    axiosInstance.put(`/notes/${note.id}`, { ...data }).then((res) => {
      const data = res.data;
      router.replace(`/${data.id}`);
    });
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

export default Edit;