'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';

import { ChangeEvent, ReactNode, useTransition } from 'react';
import { usePathname, useRouter } from '../i18n/navigation';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Readonly<Props>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label
      htmlFor="language-select"
      className={clsx(
        'relative text-gray-400',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent pl-2 pr-2"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
        name="language"
        id="language-select"
      >
        {children}
      </select>
    </label>
  );
}
