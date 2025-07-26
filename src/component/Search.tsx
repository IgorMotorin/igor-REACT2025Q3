import { type MouseEventHandler } from 'react';

export default function Search({
  onChange,
  onSearch,
  value,
  buttonError,
  number,
}: Readonly<{
  onChange: (e: { target: { value: string } }) => void;
  onSearch: MouseEventHandler<HTMLButtonElement>;
  value: string;
  buttonError: boolean;
  number: number;
}>) {
  if (buttonError) {
    throw new Error('I crashed!');
  }
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <form className="mt-5 sm:flex sm:items-center">
          <input
            id="q"
            name="q"
            className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="Введите слово для поиска"
            type="search"
            autoFocus={false}
            onChange={onChange}
            value={value}
          ></input>

          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onSearch}
          >
            Поиск
          </button>

          <div className="relative right-4 bottom-5 -mr-6 inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-gray-400 text-white">
            {number}
          </div>
        </form>
      </div>
    </div>
  );
}
