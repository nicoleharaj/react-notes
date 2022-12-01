import useSWR from 'swr';
import { TAGS_URL } from '../constants';
import { TagProps } from '../utils/types';

const getTags = async () => {
  const res = await fetch(TAGS_URL, {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
  return res;
};

const useTagList = () => {
  const { data, error } = useSWR<TagProps[] | null>(TAGS_URL, getTags);

  return {
    allTags: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useTagList;
