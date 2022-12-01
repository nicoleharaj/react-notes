import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { mutate } from 'swr';
import dbConnect from '../../lib/dbConnect';
import { Note } from '../../models/Models';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import useNoteList from '../../hooks/useNoteList';
import { NOTES_URL } from '../../constants';

const NotePage = ({ note }: any) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { notes } = useNoteList();

  const onDeleteNote = async () => {
    try {
      await fetch(`${NOTES_URL}/${note._id}`, {
        method: 'DELETE',
      });
      router.push('/');
    } catch (e: any) {
      console.error(e);
    }
    const options = { optimisticData: notes, rollbackOnError: true };
    mutate(NOTES_URL, notes, options);
  };
  return (
    <>
      <Modal transitionIn={showModal} timeout={300} classNames='modal' onExit={() => setShowModal(!showModal)}>
        <h2 className='font-bold text-4xl text-center'>Delete note</h2>
        <p className='text-center'>Are you sure you want to delete this note?</p>
        <div className="flex mt-4 gap-2 justify-center">
          <Button variant="danger" onClick={onDeleteNote}>Delete</Button>
          <Button variant='secondary' onClick={() => {
            setShowModal(!showModal);
          }}>Cancel</Button>
        </div>
      </Modal>

      <div className='container'>
        <header className='flex justify-between mb-1'>
          <h1 className='text-2xl font-semibold text-zinc-900 dark:text-white'>{note.title}</h1>
          <div className='flex gap-1'>
            <Link href={'/[id]/edit'} as={`/${note._id}/edit`}><Button variant='outline-primary'><BsFillPencilFill /></Button></Link>
            <Button variant='outline-danger' onClick={() => setShowModal(!showModal)}><BsFillTrashFill /></Button>
          </div>
        </header>

        <article className="mt-6 mx-auto prose prose-pre:w-70 prose-headings:mt-5 prose-headings:mb-3 md:prose-lg dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            code({ node, inline, className, style, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={materialDark}
                  language={match[1]}
                  wrapLongLines={true}
                  PreTag='div'
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <SyntaxHighlighter
                  useInlineStyles={true}
                  wrapLongLines={true}
                  style={materialDark}
                  PreTag='div'
                  {...props}
                >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
              );
            }
          }}>{note.markdown}</ReactMarkdown>
        </article>
      </div>
    </>
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

export default NotePage;