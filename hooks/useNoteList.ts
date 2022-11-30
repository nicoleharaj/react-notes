import useSWR from 'swr';
import { NoteProps } from '../utils/types';

const getNotes = async () => {
  const res = await fetch('/api/notes', {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
  return res;
};

const useNoteList = () => {
  const { data, error } = useSWR<NoteProps[] | null>(`/api/notes`, getNotes);

  return {
    notes: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useNoteList;
