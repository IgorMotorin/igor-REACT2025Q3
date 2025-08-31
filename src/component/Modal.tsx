import ReactDOM from 'react-dom';
import { type ReactNode, useEffect, useRef } from 'react';

const Modal = ({
  isShowing,
  children,
  handleClose,
}: {
  isShowing: boolean;
  children: ReactNode;
  handleClose: () => void;
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current === e.target) {
        handleClose();
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [handleClose]);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? handleClose() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isShowing) return null;
  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="modal fixed w-full h-full top-0 left-0 flex items-start justify-end "
    >
      <div
        ref={ref}
        data-testid="modal-overlay"
        className="modal-overlay absolute w-full h-full "
      ></div>
      {children}
    </div>,
    document.body
  );
};

export default Modal;
