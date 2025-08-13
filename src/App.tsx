import { StrictMode, useState } from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import Result from './component/Result';
import ErrorScreen from './component/ErrorScreen';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './routes/Layout';
import Home from './routes/Home';
import About from './routes/About';
import Cards from './routes/Cards';
import { ThemeContext } from './Context';
import ErrorBoundary from './component/ErrorBoundary';

export default function App() {
  const [theme, setTheme] = useState('light');

  return (
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Provider store={store}>
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
          </Provider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}
