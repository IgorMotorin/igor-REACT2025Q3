'use client';

import { useContext } from 'react';
import ButtonError from '../../component/ButtonError';
import { ThemeContext } from '../../store/Context';
import { useTranslations } from 'next-intl';

export default function Home() {
  const theme = useContext(ThemeContext);
  const t = useTranslations('home');

  return (
    <main className="dark:bg-cyan-950 dark:text-white h-lvh" data-theme={theme}>
      <div className=" dark:bg-cyan-950 dark:text-white" data-theme={theme}>
        <h1 className="pt-5 self-center text-xl font-semibold whitespace-nowrap dark:bg-cyan-950 dark:text-white">
          {t('technical')}
        </h1>

        <p className="p-3">{t('technical_text')}</p>
        <h2 className="mt-5 "> {t('application')}</h2>
        <ul className="p-3">
          <li>{t('application_text')}</li>
        </ul>
        <ButtonError></ButtonError>
      </div>
    </main>
  );
}
