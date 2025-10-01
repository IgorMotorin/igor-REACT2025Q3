import { useEffect, useState } from 'react';
import { BASE_URL } from '../routes/URL.tsx';
import { useSearchParams } from 'react-router';

export function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

type typeBooks = {
  id: number;
  authors: [{ name: string }];
  title: string;
  summaries: string;
};

export function useData() {
  const [search] = useSearchParams();
  const searchTerm = search.get('details') || '';
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<typeBooks | null>(null);

  useEffect(() => {
    let isCurrent = true;

    const fetchData = async () => {
      try {
        if (!searchTerm) {
          setBooks(null);
          return;
        }
        setSpinner(true);
        const url = BASE_URL + searchTerm + '/';
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const result = await response.json();
        if (isCurrent) {
          setBooks(result);
          setSpinner(false);
        }
      } catch (err) {
        if (err instanceof Error && isCurrent) {
          setError(err.message);
          setSpinner(false);
        }
      }
    };

    fetchData().then((r) => r);

    return () => {
      isCurrent = false;
    };
  }, [searchTerm]);

  return { books, spinner, error };
}
