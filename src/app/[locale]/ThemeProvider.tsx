'use client';

import { ThemeContext } from '../../store/Context';
import { CheckState } from '../../store/checkSlice';
import { useSelector } from 'react-redux';

export function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = useSelector(
    (state: { checkReducer: CheckState }) => state.checkReducer.theme
  );

  return <ThemeContext value={theme}>{children}</ThemeContext>;
}
