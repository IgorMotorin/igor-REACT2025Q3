import { useCallback, useEffect, useState } from 'react';
import Result from './component/Result';
import ErrorScreen from './component/ErrorScreen';
import { useLocalStorage } from './component/hooks';
import { Route, Routes, useSearchParams } from 'react-router';
import Layout from './routes/Layout';
import Home from './routes/Home';

import About from './routes/About';
import Cards from './routes/Cards';
import { BASE_URL } from './routes/URL';
import { ThemeContext } from './component/Context';
import { useDispatch } from 'react-redux';
import { addBooks } from './checkSlice';

export default function App() {
  const [pets, setPets] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('Ошибка в приложении...');
  const [count, setCount] = useState(0);
  const [search, setSearch] = useSearchParams();
  const [key, setKey] = useLocalStorage('appKey', '');
  const tmp = search.get('search') || '';
  const [inputSearch, setInputSearch] = useState(
    tmp.toLowerCase() || String(key)
  );
  const [page, setPage] = useState(1);
  const [theme, setTheme] = useState('light');
  const dispatch = useDispatch();

  const fetchData = useCallback(async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        return res.json();
      }
      const out = await res.json();
      return out;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('Fetch error occurred.');
      }
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setSpinner(true);
      try {
        const pageParam = '?page=' + (search.get('page') || '1');
        const searchGet = search.get('search');
        const searchParam = searchGet ? '&search=' + searchGet : '';
        const url = BASE_URL + pageParam + searchParam;

        const data = await fetchData(url);
        setPets(data.results);

        dispatch(addBooks(data.results));
        setCount(Number(data.count) || 0);
        setPage(Number(search.get('page') || 1));
        setSpinner(false);
      } catch (error) {
        setSpinner(false);
        setError(true);
        console.log(error);
      }
    };

    if (Number(search.get('page')) == page) {
      return;
    }
    if (!Number(search.get('page')) && pets.length !== 0) {
      return;
    }
    load();
  }, [
    fetchData,
    setPets,
    setErrorText,
    setError,
    setSpinner,
    search,
    page,
    pets,
    dispatch,
  ]);

  return (
    <ThemeContext value={theme}>
      <Routes>
        <Route element={<Layout setTheme={setTheme} />}>
          <Route index element={<Home />} />
          <Route
            path="cards"
            element={
              <Cards
                onChange={(e: { target: { value: string } }) => {
                  setInputSearch(e.target.value.toLowerCase());
                }}
                onSearch={(e) => {
                  e.preventDefault();
                  setInputSearch((prev: string) => prev.trim());

                  const input = inputSearch.trim();
                  setKey(input);
                  setSearch(input ? 'search=' + input : '');
                }}
                pagination={count}
                input={inputSearch}
                number={count}
                numPagination={page}
              ></Cards>
            }
          >
            <Route
              path=""
              element={
                <Result
                  cards={pets}
                  page={page}
                  error={error}
                  spinner={spinner}
                  errorText={errorText}
                ></Result>
              }
            />
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
