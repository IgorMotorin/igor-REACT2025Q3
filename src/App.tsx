import { useState } from 'react';
import { ThemeContext } from './Context';
import Modal from './component/Modal.tsx';
import UncontrolledForm from './component/UncontrolledForm.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  type CheckState,
  onControlFormChange,
  onUncontrolFormChange,
} from './store/checkSlice.tsx';
import { Card } from './component/Card.tsx';
import { ControlledForm } from './component/ControlledForm.tsx';

export default function App() {
  const [theme] = useState('light');
  const submitData = useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.value
  );
  const controlForm = useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.controlForm
  );
  const uncontrolForm = useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.uncontrolForm
  );
  const dispatch = useDispatch();

  return (
    <ThemeContext value={theme}>
      <div className="flex w-full flex-col">
        <div className="flex m-2 gap-2 w-full justify-center">
          <button
            onClick={() => dispatch(onUncontrolFormChange(!uncontrolForm))}
            className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
          >
            Uncontrolled components
          </button>
          <button
            onClick={() => dispatch(onControlFormChange(!controlForm))}
            className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
          >
            Controlled components
          </button>
          <Modal
            isShowing={uncontrolForm}
            handleClose={() => {
              dispatch(onUncontrolFormChange(false));
            }}
          >
            {<UncontrolledForm></UncontrolledForm>}
          </Modal>
          <Modal
            isShowing={controlForm}
            handleClose={() => dispatch(onControlFormChange(false))}
          >
            {<ControlledForm></ControlledForm>}
          </Modal>
        </div>
      </div>
      <div className={'flex flex-wrap'}>
        {submitData.map((item, i) => {
          return (
            <Card
              key={'f' + i}
              name={item.name}
              age={item.age}
              email={item.email}
              password={item.password}
              passwordConfirm={item['password-confirm']}
              gender={item.gender}
              country={item.country}
              terms={item.terms}
              file={item.file}
              lost={submitData.length === i + 1}
            ></Card>
          );
        })}
      </div>
    </ThemeContext>
  );
}
