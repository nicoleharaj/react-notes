import useSWR from 'swr';
import { TagProps } from '../utils/types';

const getTags = async () => {
  const res = await fetch('/api/tags', {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
  return res;
};

const useTagsList = () => {
  const { data, error } = useSWR<TagProps[] | null>(`/api/tags`, getTags);

  return {
    availableTags: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useTagsList;
