import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { mutate } from 'swr';
import useNoteList from '../hooks/useNoteList';
import { NoteFormProps, NoteProps, TagProps } from '../utils/types';
import Button from './Button';
import { NOTES_URL, TAGS_URL, CONTENT_TYPE } from '../constants';
import CreatableReactSelect from 'react-select/creatable';
import useTagList from '../hooks/useTagList';

const NoteForm = ({ title = '', markdown = '', forNewNote = true, tags = [] }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { notes } = useNoteList();
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TagProps[]>(tags);
  const { allTags } = useTagList();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const onCreateNote = async (data: any) => {
    try {
      const note = await fetch(NOTES_URL, {
        method: 'POST',
        headers: {
          Accept: CONTENT_TYPE,
          'Content-Type': CONTENT_TYPE,
        },
        body: JSON.stringify({ ...data })
      }).then((res) => {
        return res.json();
      });
      router.push(`/${note.data._id}`);
      return note;
    } catch (e: any) {
      console.error(e);
    }
  };

  const onUpdateNote = async (data: any) => {
    const { id } = router.query;

    try {
      const note = await fetch(`${NOTES_URL}/${id}`, {
        method: 'PUT',
        headers: {
          Accept: CONTENT_TYPE,
          'Content-Type': CONTENT_TYPE,
        },
        body: JSON.stringify({ ...data })
      }).then((res) => {
        return res.json();
      });

      mutate(`api/notes/${id}`, note, false);
      router.push(`/${id}`);
      return note;
    } catch (e: any) {
      console.error(e);
    }
  };

  const onCreateTag = async (data: any) => {
    try {
      const tag = await fetch(TAGS_URL, {
        method: 'POST',
        headers: {
          Accept: CONTENT_TYPE,
          'Content-Type': CONTENT_TYPE,
        },
        body: JSON.stringify(data)
      }).then((res) => {
        return res.json();
      });
      setSelectedTags(prev => [...prev, tag.data]);
      return tag;
    } catch (e: any) {
      console.error(e);
    }
  };

  const onUpdateTagNotes = async (tag: TagProps, currentNote: NoteProps) => {
    const id = tag._id;

    const currentNotes: string[] = await fetch(`${TAGS_URL}/${id}`, {
      method: 'GET',
    }).then((res) => {
      return res.json();
    }).then((res) => res.data.notes);

    if (currentNotes.includes(currentNote._id)) return;

    currentNotes.push(currentNote._id);

    try {
      const updatedTag = await fetch(`${TAGS_URL}/${id}`, {
        method: 'PUT',
        headers: {
          Accept: CONTENT_TYPE,
          'Content-Type': CONTENT_TYPE,
        },
        body: JSON.stringify({ notes: currentNotes })
      }).then((res) => {
        return res.json();
      });
      mutate(`api/tags/${id}`, allTags, false);
      return updatedTag;
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    };

    const note = forNewNote ? await onCreateNote(data) : await onUpdateNote(data);

    data.tags.forEach(tag => {
      onUpdateTagNotes(tag, note.data);
    });

    const notesOptions = { optimisticData: notes, rollbackOnError: true };
    mutate(NOTES_URL, notes, notesOptions);

    const tagsOptions = { optimisticData: allTags, rollbackOnError: true };
    mutate(TAGS_URL, allTags, tagsOptions);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 h-full'>
      <div className='flex justify-between gap-2 '>
        <div className='grid gap-2 flex-grow'>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' ref={titleRef} defaultValue={title} required className='border-stone-300 rounded bg-white dark:bg-stone-700 dark:border-stone-700 focus:border-indigo-600 focus:ring-indigo-600 hover:border-indigo-600' />
        </div>
        <div className='grid gap-2 flex-grow'>
          <label htmlFor='tags'>Tags</label>
          <CreatableReactSelect
            value={selectedTags.map(tag => { return { label: tag.label, value: tag._id }; })}
            onChange={tags => setSelectedTags(
              tags.map(tag => {
                return { label: tag.label, _id: tag.value };
              })
            )}
            onCreateOption={label => onCreateTag({ label: label })}
            options={allTags?.map(tag => {
              return { label: tag.label, value: tag._id };
            })}
            isMulti
          />
        </div>
      </div>

      <div className='grid gap-2'>
        <label htmlFor='markdown'>Body</label>
        <textarea name='markdown' id='markdown' rows={35} ref={markdownRef} defaultValue={markdown} required className='border-stone-300 rounded bg-white dark:bg-stone-700 dark:border-stone-700 focus:border-indigo-600 focus:ring-indigo-600 hover:border-indigo-600'></textarea>
      </div>

      <div className='flex gap-2 justify-end'>
        <Button type='button' variant='outline-danger' onClick={() => router.back()}>Cancel</Button>
        <Button type='submit' variant='primary'>Save</Button>
      </div>
    </form>
  );
};

export default NoteForm;