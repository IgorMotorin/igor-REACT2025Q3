import ReactDOM from 'react-dom';
import React from 'react';
import { useEffect } from 'react';

const Modal = ({
  isShowing,
  children,
  handleClose,
}: {
  isShowing: boolean;
  children: HTMLElement;
  handleClose: () => (value: React.SetStateAction<boolean>) => void;
}) => {
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === 'Escape' ? handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isShowing) return null;
  return ReactDOM.createPortal(
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Modal Title</p>
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
          <p>
            Modal content goes here. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nullam at purus urna. Vestibulum nec erat in diam
            rutrum posuere. Fusce gravida orci nec mi volutpat euismod. Proin
            aliquet, lacus sit amet egestas rhoncus, turpis nulla laoreet urna,
            nec ultricies nibh urna eu sapien.{' '}
          </p>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleClose}
              className="modal-close px-4 bg-gray-100 p-3 rounded-lg text-black hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
