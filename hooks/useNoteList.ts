import { useEffect, useState } from 'react';
import { NoteProps } from '../utils/types';

const useNoteList = () => {
  const contentType = 'application/json';

  const [noteList, setNoteList] = useState<Array<NoteProps>>([]);

  useEffect(() => {
    const getNotes = async () => {
      const res = await fetch('/api/notes', {
        method: 'GET',
        headers: {
          'Accept': contentType,
          'Content-Type': contentType,
        },
      }).then((res) => {
        return res.json();
      });
      setNoteList(res);
    };
    getNotes();
  }, []);

  return noteList;
};

export default useNoteList;
