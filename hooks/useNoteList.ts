import useSWR from 'swr';
import { NOTES_URL } from '../constants';
import { NoteProps } from '../utils/types';

const getNotes = async () => {
  const res = await fetch(NOTES_URL, {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
  return res.data;
};

const useNoteList = () => {
  const { data, error } = useSWR<NoteProps[] | null>(NOTES_URL, getNotes);

  return {
    notes: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useNoteList;
