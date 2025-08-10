import { useEffect, useState } from 'react';
import Result from './component/Result';
import ErrorScreen from './component/ErrorScreen';
import { Route, Routes, useSearchParams } from 'react-router';
import Layout from './routes/Layout';
import Home from './routes/Home';
import About from './routes/About';
import Cards from './routes/Cards';
import { ThemeContext } from './Context';
import { useDispatch } from 'react-redux';
import { onPage, onSearch } from './store/checkSlice';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [search] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const searchParam = search.get('search') || '';
    const pageParam = search.get('page') || '1';

    dispatch(onPage(pageParam));
    dispatch(onSearch(searchParam));
  }, [search, dispatch]);

  return (
    <ThemeContext value={theme}>
      <Routes>
        <Route element={<Layout setTheme={setTheme} />}>
          <Route index element={<Home />} />
          <Route path="cards" element={<Cards></Cards>}>
            <Route path="" element={<Result></Result>} />
          </Route>
          <Route path="about" element={<About></About>}></Route>
          <Route
            path="*"
            element={
              <ErrorScreen
                run={true}
                text={'Ошибка 404 - Такой страницы не существует...'}
              ></ErrorScreen>
            }
          />
        </Route>
      </Routes>
    </ThemeContext>
  );
}
