import Link from 'next/link';
import Button from './Button';
import { HiPencilAlt, HiMenu } from 'react-icons/hi';
import { BsFillTagsFill } from 'react-icons/bs';
import removeMd from 'remove-markdown';
import ThemeToggler from './ThemeToggler';
import { useEffect, useMemo, useRef, useState } from 'react';
import { NoteProps } from '../utils/types';
import useNoteList from '../hooks/useNoteList';
import { CgSearch } from 'react-icons/cg';

const NoteCard = ({ _id, title, markdown }: NoteProps) => {
  const plain: string = removeMd(markdown);

  return <Link href={`/${_id}`} className='flex flex-col justify-center gap-1 p-3'>
    <h2 className='text-lg truncate'>{title}</h2>
    <p className='line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400'>{plain}</p>
  </Link>;
};

const Sidebar = () => {
  const [title, setTitle] = useState('');
  const windowSize = useRef<Number>();
  const notes = useNoteList();
  const [expandMenu, setExpandMenu] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (title == '' || note.title.toLowerCase().includes(title.toLowerCase()));
    });
  }, [title, notes]);

  useEffect(() => {
    window.innerWidth >= 1280 ? setExpandMenu(true) : setExpandMenu(false);
    windowSize.current = window.innerWidth;

    window.addEventListener('resize', () => {
      window.innerWidth >= 1280 ? setExpandMenu(true) : setExpandMenu(false);
      windowSize.current = window.innerWidth;
    });
  }, []);

  const clickResize = () => {
    if (windowSize.current! >= 1280) {
      return;
    }
    setExpandMenu(false);
  };

  return (
    <div className='p-6 pb-0 h-full flex flex-col text-zinc-900 dark:text-white'>
      <header className=' flex justify-between'>
        <h1 className='text-2xl font-semibold transition-colors duration-300 ease-in-expo'>Notes</h1>
        <div className='flex gap-1 items-center'>
          <Link href='/new'><Button variant='primary' className='flex items-center' onClick={clickResize}><HiPencilAlt /></Button></Link>
          <Button variant='outline-secondary'><BsFillTagsFill /></Button>
          <Button variant='outline-secondary' className='xl:invisible xl:hidden' onClick={() => setExpandMenu(!expandMenu)}> <HiMenu />
          </Button>
        </div>
      </header>

      <div className={'flex flex-col h-full mb-6' + (expandMenu ? ' h-100 opacity-100 visible' : ' h-0 opacity-0 invisible')}>
        <form className='flex flex-col'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2 flex-grow'>
              <label htmlFor='title' className='relative flex flex-col justify-center'>
                <input type='text' id='title' value={title} onChange={e => setTitle(e.target.value)} placeholder='Search' className='pl-8 transition-colors border-0 border-b border-zinc-300 bg-transparent text-sm focus:border-indigo-600 focus:ring-0 hover:border-indigo-600 dark:border-zinc-600' />
                <CgSearch className='absolute bottom-0 left-0 transform translate-x-1/2 -translate-y-2.5 text-zinc-500' />
              </label>
            </div>
          </div>
        </form>
        <div className='mt-6 flex flex-col gap-2 grow'>
          {filteredNotes.reverse().map(note => (
            <div key={note._id} className='bg-white cursor-pointer rounded border border-zinc-300 transition duration-300 ease-in-expo hover:bg-zinc-100 hover:shadow-inner dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-600' onClick={clickResize}>
              <NoteCard _id={note._id} title={note.title} markdown={note.markdown} />
            </div>
          ))}
        </div>
        <div className='border-t border-zinc-300 mt-5 pt-5 text-2xl dark:border-zinc-600 xl:mt-0'>
          <ThemeToggler />
        </div>
      </div>
    </div>

  );
};

export default Sidebar;