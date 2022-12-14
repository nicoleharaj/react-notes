import Link from 'next/link';
import Button from './Button';
import { HiPencilAlt, HiMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { BsFillTagsFill, BsFillTrashFill } from 'react-icons/bs';
import removeMd from 'remove-markdown';
import ThemeToggler from './ThemeToggler';
import { useEffect, useMemo, useRef, useState } from 'react';
import { NoteProps } from '../utils/types';
import useNoteList from '../hooks/useNoteList';
import { CgSearch } from 'react-icons/cg';
import Modal from './Modal';
import { mutate } from 'swr';
import { CONTENT_TYPE, TAGS_URL } from '../constants';
import useTagList from '../hooks/useTagList';
import Badge from './Badge';
import moment from 'moment';

const NoteCard = ({ _id, title, markdown, tags, updatedAt }: NoteProps) => {
  const plainBody: string = removeMd(markdown);
  const formattedUpdateTime = moment.utc(updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).local().format('MMMM D, YYYY [at] hh:mm A');

  return (
    <Link href={`/${_id}`} className='flex flex-col justify-center gap-1 p-3'>
      <h2 className='text-lg truncate'>{title}</h2>
      <p className='text-xs text-zinc-500 dark:text-zinc-400'>{formattedUpdateTime}</p>
      <div className='my-1 flex flex-row gap-2 justify-start'>
        {tags?.map((tag) => (
          <Badge key={tag._id}>{tag.label}</Badge>
        ))}
      </div>
      <p className='h-4 overflow-hidden whitespace-nowrap text-ellipsis text-sm text-zinc-500 dark:text-zinc-200'>{plainBody}</p>
    </Link>
  );
};

const Sidebar = () => {
  const [title, setTitle] = useState('');
  const windowSize = useRef<Number>();
  const [expandMenu, setExpandMenu] = useState(false);
  const { notes, isLoading, isError } = useNoteList();
  const [showModal, setShowModal] = useState(false);
  const { allTags } = useTagList();

  const onUpdateTag = async ({ ...data }) => {
    const tag = await fetch(`${TAGS_URL}/${data._id}`, {
      method: 'PUT',
      headers: {
        'Accept': CONTENT_TYPE,
        'Content-Type': CONTENT_TYPE,
      },
      body: JSON.stringify({ ...data }),
    }).then((res) => {
      return res.json();
    });

    mutate(TAGS_URL, allTags);
    return tag;
  };

  const onDeleteTag = async (id: string) => {
    const res = await fetch(`${TAGS_URL}/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      return res.json();
    });

    mutate(TAGS_URL, allTags);
    return res;
  };

  const filteredNotes = useMemo(() => {
    return notes?.filter((note) => {
      return title == '' || note.title.toLowerCase().includes(title.toLowerCase());
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
    <>
      <Modal
        transitionIn={showModal}
        onExit={() => setShowModal(!showModal)}
        classNames='modal'
        className='max-h-90 overflow-y-auto'
        id='tags-modal'>
        <div className='flex justify-between items-center font-bold text-2xl'>
          <h2>Edit tags</h2>
          <Button variant='outline-secondary' onClick={() => setShowModal(!showModal)}>
            <span className='sr-only'>Edit tags</span>
            <RiCloseLine aria-hidden />
          </Button>
        </div>

        <form className='mt-2 flex flex-col items-center'>
          {allTags?.map((tag) => (
            <div key={tag._id} className='flex justify-between items-center gap-5 p-1'>
              <input
                type='text'
                value={tag.label}
                onChange={(e) => onUpdateTag({ _id: tag._id, label: e.target.value })}
                className='
                  transition-colors 
                border-gray-300 
                  rounded 
                focus:border-indigo-600 
                focus:ring-indigo-600 
                hover:border-indigo-600'
              />
              <Button variant='danger' onClick={() => onDeleteTag(tag._id)} type='button'>
                <span className='sr-only'>Delete tag</span>
                <BsFillTrashFill aria-hidden />
              </Button>
            </div>
          ))}
        </form>
      </Modal>
      <div className='p-6 pb-0 h-full flex flex-col text-zinc-900 dark:text-white'>
        <header className=' flex justify-between'>
          <h1 className='text-2xl font-semibold ease-in-expo'>Notes</h1>
          <div className='flex gap-1 items-center'>
            <Link href='/new'>
              <Button variant='primary' className='flex items-center' aria-label='Create note'>
                <span className='sr-only'>Create a new note</span>
                <HiPencilAlt />
              </Button>
            </Link>
            <Button variant='outline-secondary' onClick={() => setShowModal(!showModal)}>
              <span className='sr-only'>Modify tags</span>
              <BsFillTagsFill aria-hidden />
            </Button>
            <Button
              variant='outline-secondary'
              className='xl:invisible xl:hidden'
              onClick={() => setExpandMenu(!expandMenu)}
              role='button'
              aria-controls='primary-navigation'
              aria-expanded={expandMenu}
            >
              <span className='sr-only'>Menu</span>
              <HiMenu aria-hidden />
            </Button>
          </div>
        </header>

        <div
          onBlur={() => clickResize()}
          className={'flex flex-col h-full mb-6' + (expandMenu ? ' h-100 opacity-100 visible' : ' h-0 opacity-0 invisible')}>
          <form className='flex flex-col'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2 flex-grow'>
                <label htmlFor='title' className='relative flex flex-col justify-center'>
                  <span className='sr-only'>Search for a note</span>
                  <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    placeholder='Search'
                    className='
                      pl-8 
                      border-0 
                      border-b 
                      border-zinc-300 
                      bg-transparent 
                      text-sm 
                      focus:border-indigo-600 
                      focus:ring-0 
                      hover:border-indigo-600 
                      dark:border-zinc-600'
                  />
                  <CgSearch className='absolute bottom-0 left-0 transform translate-x-1/2 -translate-y-2.5 text-zinc-500' aria-hidden />
                </label>
              </div>
            </div>
          </form>
          <ul className='mt-6 flex flex-col-reverse justify-end gap-2 grow' id='primary-navigation'>
            {isError ? (
              <div> An error has occurred while fetching notes </div>
            ) : isLoading ? (
              <div>Loading... </div>
            ) : filteredNotes ? (
              filteredNotes.map((note) => (
                <li
                  key={note._id}
                  className='
                        bg-white 
                        cursor-pointer 
                        rounded 
                        border 
                        border-zinc-300 
                        transition 
                        hover:bg-zinc-100 
                        hover:shadow-inner 
                        dark:bg-zinc-700 
                        dark:border-zinc-600 
                        dark:hover:bg-zinc-600'
                >
                  <NoteCard _id={note._id} title={note.title} markdown={note.markdown} tags={note.tags} updatedAt={note.updatedAt} />
                </li>
              ))
            ) : null}
          </ul>
          <div className='border-t border-zinc-300 mt-5 pt-5 text-2xl dark:border-zinc-600 xl:mt-0'>
            <ThemeToggler />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
