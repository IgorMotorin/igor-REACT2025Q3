'use client';

import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { ThemeContext } from '../store/Context';
import ButtonTheme from './ButtonTheme';
import Logo from './logo';
import { useTranslations } from 'next-intl';
import { Link } from '../i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';

export default function Nav({ params }: { params: 'en' | 'ru' }) {
  const pathname = usePathname();
  const theme = useContext(ThemeContext);
  const t = useTranslations('nav');
  const classActLink =
    'block py-2 pl-3 pr-4 text-white rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white bg-purple-700';
  const classPendLink =
    'block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700';

  return (
    <nav
      className="bg-white border-gray-200 py-2.5 dark:bg-cyan-950 dark:text-white"
      data-theme={theme}
    >
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <Logo href="/" text="Next.js. Server Side Rendering"></Logo>
        <div className="flex items-center lg:order-2"></div>
        <div
          className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row gap-0.5 lg:space-x-8 lg:mt-0">
            <li key={'home'}>
              <Link
                href="/"
                className={
                  pathname === '/' + params ? classActLink : classPendLink
                }
                aria-current="page"
              >
                {t('home')}
              </Link>
            </li>
            <li key={'cards'}>
              <Link
                href="/cards"
                className={
                  pathname === '/' + params + '/cards'
                    ? classActLink
                    : classPendLink
                }
              >
                {t('cards')}
              </Link>
            </li>
            <li key={'about'}>
              <Link
                href="/about"
                className={
                  pathname === '/' + params + '/about'
                    ? classActLink
                    : classPendLink
                }
              >
                {t('about')}
              </Link>
            </li>
            <li key={'btn'}>
              <ButtonTheme theme={theme}></ButtonTheme>
            </li>
            <li key={'locale'}>
              <LocaleSwitcher></LocaleSwitcher>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
