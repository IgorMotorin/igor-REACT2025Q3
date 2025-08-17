'use client';

import { useContext } from 'react';
import { ThemeContext } from '../../../store/Context';
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');
  const theme = useContext(ThemeContext);

  return (
    <div
      className="h-screen dark:bg-cyan-950 dark:text-white p-5"
      data-theme={theme}
    >
      <h1 className="mt-5 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        {t('about')}
      </h1>

      <h2 className="text-xl m-6">{t('name')}</h2>
      <h2 className="m-1 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        RS School. React.
      </h2>

      <p className="font-semibold mt-3">{t('text')}</p>

      <a
        href="https://github.com/rolling-scopes-school/tasks/blob/master/react/README.md"
        className="text-blue-800 m-3 mt-4"
      >
        Link:
        https://github.com/rolling-scopes-school/tasks/blob/master/react/README.md
      </a>
    </div>
  );
}
