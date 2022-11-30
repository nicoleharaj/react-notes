import { BadgeProps } from '../utils/types';
import { AiFillTag } from 'react-icons/ai';

const Badge = ({
  badgeKey,
  children
}: BadgeProps) => {
  return (
    <div key={badgeKey} className='flex gap-1 items-center text-xs rounded bg-slate-500 w-fit text-white py-0.5 px-1'>
      <AiFillTag />
      {children}</div>);
};

export default Badge;