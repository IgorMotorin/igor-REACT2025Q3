'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ButtonError() {
  const [buttonError, setButtonError] = useState(false);
  const t = useTranslations('home');

  if (buttonError) {
    throw new Error('I crashed!');
  }
  return (
    <button
      className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      onClick={() => {
        setButtonError(true);
      }}
    >
      {t('button')}
    </button>
  );
}
