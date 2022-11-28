import { ModalProps } from '../utils/types';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

const Modal = ({
  children,
  transitionIn,
  timeout = 300,
  classNames,
  className,
  onExit,
  ...props
}: ModalProps) => {
  const modalRef = useRef(null);

  return (
    <CSSTransition nodeRef={modalRef} in={transitionIn} timeout={timeout} classNames={classNames} unmountOnExit>
      <div ref={modalRef} className='left-0 top-0 flex justify-center items-center fixed w-full h-full z-40' {...props}>
        <div className={`m-auto flex-col gap-4 bg-white rounded-md shadow-lg p-10 z-50 dark:bg-zinc-700` + ' ' + className}>
          {children}
        </div>

        <div className='fixed w-full h-full bg-zinc-200/90 dark:bg-zinc-600/90' onClick={onExit}></div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
