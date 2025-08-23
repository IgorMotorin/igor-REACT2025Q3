import { useState } from 'react';
import { ThemeContext } from './Context';
import Modal from './component/Modal.tsx';

// import { useDispatch } from 'react-redux';
// import { onPage, onSearch } from './store/checkSlice';

export default function App() {
  const [theme] = useState('light');
  const [isOpenUncontrolled, setIsOpenUncontrolled] = useState(false);
  const [isOpenControlled, setIsOpenControlled] = useState(false);

  // const dispatch = useDispatch();

  return (
    <ThemeContext value={theme}>
      <div className="flex w-full flex-col">
        <div className="flex m-2 gap-2 w-full justify-center">
          <button
            onClick={() => setIsOpenUncontrolled(!isOpenUncontrolled)}
            className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
          >
            Uncontrolled components
          </button>
          <button
            onClick={() => setIsOpenControlled(!isOpenControlled)}
            className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
          >
            Controlled components
          </button>
          <Modal
            isShowing={isOpenUncontrolled}
            handleClose={() => setIsOpenUncontrolled(false)}
          >
            {<div>test1</div>}
          </Modal>
          <Modal
            isShowing={isOpenControlled}
            handleClose={() => setIsOpenControlled(false)}
          >
            {<div>test2</div>}
          </Modal>
          {/*<Portal>*/}
          {/*  <div>test</div>*/}
          {/*</Portal>*/}
        </div>
      </div>
    </ThemeContext>
  );
}
