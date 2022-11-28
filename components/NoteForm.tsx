import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';
import { NoteFormProps } from '../utils/types';
import Button from './Button';

const NoteForm = ({ onSubmit, title = '', markdown = '' }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value
    });

    router.replace('/');
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 h-full'>
      <div className='flex justify-between gap-2 '>
        <div className='grid gap-2 flex-grow'>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' ref={titleRef} defaultValue={title} required className='transition-colors border-stone-300 rounded bg-white dark:bg-stone-700 dark:border-stone-700 focus:border-indigo-600 focus:ring-indigo-600 hover:border-indigo-600' />
        </div>
        <div className='grid gap-2 flex-grow'>
          <label htmlFor='tags'>Tags</label>

        </div>
      </div>

      <div className='grid gap-2'>
        <label htmlFor='markdown'>Body</label>
        <textarea name='markdown' id='markdown' rows={35} ref={markdownRef} defaultValue={markdown} required className='transition-colors border-stone-300 rounded bg-white dark:bg-stone-700 dark:border-stone-700 focus:border-indigo-600 focus:ring-indigo-600 hover:border-indigo-600'></textarea>
      </div>

      <div className='flex gap-2 justify-end'>
        <Button type='button' variant='outline-danger' onClick={() => router.back()}>Cancel</Button>
        <Button type='submit' variant='primary'>Save</Button>
      </div>
    </form>
  );
};

export default NoteForm;