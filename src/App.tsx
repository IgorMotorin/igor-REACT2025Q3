import { useState } from 'react';
import { ThemeContext } from './Context';
// import { useDispatch } from 'react-redux';
// import { onPage, onSearch } from './store/checkSlice';

export default function App() {
  const [theme] = useState('light');

  // const dispatch = useDispatch();

  return (
    <ThemeContext value={theme}>
      <div className="flex w-full flex-col">
        <div className="flex m-2 gap-2 w-full justify-center">
          <button className="btn btn-primary">Uncontrolled components</button>
          <button className="btn btn-secondary">Controlled components</button>
        </div>
      </div>
    </ThemeContext>
  );
}
