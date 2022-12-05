import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { mutate } from 'swr';
import dbConnect from '../../lib/dbConnect';
import { Note } from '../../models/Models';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import useNoteList from '../../hooks/useNoteList';
import { NOTES_URL } from '../../constants';
import atelierCaveLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-cave-light';
import atelierCaveDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-cave-dark';
import useThemeStore from '../../hooks/useThemeStore';
import Head from 'next/head';

const customStyle = {
  borderRadius: '0.5rem',
  padding: '1.5rem',
  backgroundColor: 'transparent'
};

const NotePage = ({ note }: any) => {

  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { notes } = useNoteList();
  const theme = useThemeStore().theme;

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
      <Head>
        <title>{note.title} - Notes</title>
      </Head>
      <Modal transitionIn={showModal} timeout={300} classNames='modal' onExit={() => setShowModal(!showModal)}>
        <h2 className='font-bold text-4xl text-center'>Delete note</h2>
        <p className='text-center'>Are you sure you want to delete this note?</p>
        <div className='flex mt-4 gap-2 justify-center'>
          <Button variant='danger' onClick={onDeleteNote} role='button' aria-label='Delete note'>Delete</Button>
          <Button variant='secondary' role='button' onClick={() => {
            setShowModal(!showModal);
          }}>Cancel</Button>
        </div>
      </Modal>

      <div className='container mx-auto'>
        <header className='flex flex-col'>
          <div className='flex justify-between mb-1 gap-1'>
            <h1 className='text-2xl font-semibold text-zinc-900 dark:text-white'>{note.title}</h1>
            <div className='flex gap-1'>
              <Link
                href={'/[id]/edit'}
                as={`/${note._id}/edit`}>
                <Button
                  variant='outline-primary'
                  aria-label='Edit note'>
                  <span className='sr-only'>Edit note</span>
                  <BsFillPencilFill aria-hidden />
                </Button>
              </Link>
              <Button
                variant='outline-danger'
                onClick={() => setShowModal(!showModal)}
                aria-label='Delete note'>
                <span className='sr-only'>Delete note</span>
                <BsFillTrashFill aria-hidden />
              </Button>
            </div>
          </div>
        </header>

        <article
          className='
            mt-2 
            mx-auto 
            prose
            prose-pre:bg-stone-100 
            prose-pre:border 
            prose-pre:rounded-lg 
            prose-headings:mt-5 
            prose-headings:mb-3 
            md:prose-lg 
            dark:prose-invert 
            dark:prose-pre:bg-stone-800 
            dark:prose-pre:border-stone-600'
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            code({ node, inline, className, style, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  style={theme === 'dark' ? atelierCaveDark : atelierCaveLight}
                  customStyle={customStyle}
                  wrapLongLines={true}
                  PreTag='div'
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <SyntaxHighlighter
                  useInlineStyles={false}
                  style={theme === 'dark' ? atelierCaveDark : atelierCaveLight}
                  customStyle={customStyle}
                  wrapLongLines={true}
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
  const note = await Note.findById(params.id).populate('tags').lean();

  return {
    props: {
      note: JSON.parse(JSON.stringify(note)),
    }
  };
};

export default NotePage;