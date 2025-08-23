import ReactDOM from 'react-dom';
import React from 'react';
import { useEffect, useRef } from 'react';

const Modal = ({
  isShowing,
  children = null,
  handleClose,
}: {
  isShowing: boolean;
  children: HTMLElement;
  handleClose: () => (value: React.SetStateAction<boolean>) => void;
}) => {
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
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
    const closeOnEscapeKey = (e) => (e.key === 'Escape' ? handleClose() : null);
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
      className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center overflow-scroll"
    >
      <div
        ref={ref}
        className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
      ></div>

      <div className="modal-container bg-white  mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-2 text-left px-4 ">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Create an account</p>
            <button
              onClick={handleClose}
              className="modal-close cursor-pointer z-50 text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M17.414 16L24 9.414L22.586 8L16 14.586L9.414 8L8 9.414L14.586 16L8 22.586L9.414 24L16 17.414L22.586 24L24 22.586z"
                />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
