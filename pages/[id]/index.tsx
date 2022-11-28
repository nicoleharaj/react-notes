import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Link from 'next/link';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { materialLight, materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import axiosInstance from '../../utils/axiosInstance';
import { useRouter } from 'next/router';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import dbConnect from '../../lib/dbConnect';
import Note from '../../models/Note';

const NotePage = ({ note }: any) => {

  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const onDeleteNote = () => {
    axiosInstance.delete(`/notes/${note.id}`);
    router.back();
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
            <Link href={`/${note.id}/edit`}><Button variant='outline-primary'><BsFillPencilFill /></Button></Link>
            <Button variant='outline-danger' onClick={() => setShowModal(!showModal)}><BsFillTrashFill /></Button>
          </div>
        </header>
        {/* {
          note.tags.length > 0 && (
            <div className="flex gap-2 justify-start">
              {note.tags.map(tag => (
                <Tag key={tag.id}>{tag.label}</Tag>
              ))}
            </div>)
        } */}

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
  note._id = note._id.toString();
  return { props: { note } };
};

export default NotePage;