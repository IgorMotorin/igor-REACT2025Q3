import { useEffect, useState } from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState<string>(() => {
    const item = localStorage.getItem(key) || '';
    return item ? JSON.parse(item) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
