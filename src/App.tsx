import { useCallback, useEffect, useState } from 'react';
import Search from './component/Search';
import Result from './component/Result';
import Spinner from './component/Spinner';
import ErrorScreen from './component/ErrorScreen';
import ButtonErr from './component/ButtonErr';
import { useLocalStorage } from './component/hooks';
import { Route, Routes } from 'react-router';
import Layout from './routes/Layout';
import Home from './routes/Home';

export default function App() {
  const url = 'https://catfact.ninja/facts?max_length=100&limit=20&page=1';
  const [pets, setPets] = useState([]);
  const [key, setKey] = useLocalStorage('appkey', '');
  const [inputSearch, setInputSearch] = useState(key);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('Ошибка в приложении...');
  const [buttonError, setButtonError] = useState(false);

  const onUpdateData = useCallback(
    (regex: RegExp) => {
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

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home></Home>} />
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
              <Result cards={pets}></Result>
              <ButtonErr onError={() => setButtonError(true)}></ButtonErr>
            </>
          }
        >
          <Route path=":cardId" element={<div>Обо мне</div>} />
        </Route>
        <Route path="about" element={<div>Обо мне</div>}></Route>
        <Route
          path="*"
          element={<ErrorScreen run={true} text={errorText}></ErrorScreen>}
        />
      </Route>
    </Routes>
  );
}
