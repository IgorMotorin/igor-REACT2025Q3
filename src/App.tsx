import { useCallback, useEffect, useState } from 'react';
import Search from './component/Search';
import Result from './component/Result';
import Spinner from './component/Spinner';
import ErrorScreen from './component/ErrorScreen';
import ButtonErr from './component/ButtonErr';
import { useLocalStorage } from './component/hooks';
import { Outlet, Route, Routes, useLocation } from 'react-router';
import Layout from './routes/Layout';
import Home from './routes/Home';
import Pagination from './component/Pagination';
import About from './routes/About';

export default function App() {
  const [pets, setPets] = useState([]);
  const [key, setKey] = useLocalStorage('appkey', '');
  const [inputSearch, setInputSearch] = useState(key);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('Ошибка в приложении...');
  const [buttonError, setButtonError] = useState(false);
  const [numPagination, setNumPagination] = useState(1);
  const limit = 10;
  const location = useLocation();
  const [details, setDetails] = useState(0);

  const onUpdateData = useCallback(
    (regex: RegExp) => {
      const url = 'https://catfact.ninja/facts?max_length=100&limit=100';
      setSpinner(true);
      fetch(url)
        .then((req) => {
          if (req.ok) {
            setSpinner(false);
            return req.json();
          } else {
            setSpinner(false);
            setError(true);
            setErrorText(`Ошибка связи !!! Статус: ${req.status}`);

            return [];
          }
        })
        .then((req) => {
          setPets(
            req.data.filter((item: { fact: string }) => {
              if (regex.test(item.fact?.toLowerCase())) {
                return true;
              } else {
                return false;
              }
            })
          );
        })
        .catch((err) => {
          setSpinner(false);
          setError(true);
          setErrorText(`Ошибка связи !`);

          console.log(err);
        });
    },
    [setSpinner, setError, setErrorText, setPets]
  );

  useEffect(() => {
    onUpdateData(new RegExp(inputSearch));
  }, [inputSearch, onUpdateData]);

  useEffect(() => {
    const url = new URLSearchParams(location.search);
    const page = url.get('page');
    const details = url.get('details');
    if (page !== null) {
      setNumPagination(parseInt(page));
    } else {
      setNumPagination(1);
    }
    if (details !== null) {
      setDetails(parseInt(details));
    } else {
      setDetails(0);
    }
  }, [location]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="cards"
          element={
            <>
              <ErrorScreen run={error} text={errorText}></ErrorScreen>
              <Spinner run={spinner}></Spinner>
              <Search
                onChange={(e) => setInputSearch(e.target.value)}
                onSearch={(e) => {
                  e.preventDefault();
                  setInputSearch((prev: string) => prev.trim());

                  const input = inputSearch.trim();
                  setKey(input);
                  onUpdateData(new RegExp(input));
                }}
                value={inputSearch}
                buttonError={buttonError}
                number={pets.length}
              ></Search>
              <Pagination
                length={pets.length}
                numPagination={numPagination}
              ></Pagination>
              <Outlet></Outlet>
              <ButtonErr onError={() => setButtonError(true)}></ButtonErr>
            </>
          }
        >
          <Route
            path=""
            element={
              <Result
                cards={pets.slice(
                  limit * numPagination - 10,
                  limit * numPagination
                )}
                page={numPagination}
                details={details}
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
  );
}
