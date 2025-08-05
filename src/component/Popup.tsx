import { useDispatch, useSelector } from 'react-redux';
import { on } from '../checkSlice';
import { type CheckState } from '../checkSlice';

export default function Popup() {
  const check = useSelector((state: CheckState) => state.value);
  const books: { id: number; title: string; authors: [{ name: string }] }[] =
    useSelector((state: CheckState) => state.books);
  const arr = Object.entries(check);

  const downloadFile = ({
    data,
    fileName,
    fileType,
  }: {
    data: string;
    fileName: string;
    fileType: string;
  }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };
  const toCSV = () => {
    const csvString = [
      ['id:', 'Title:', 'Authors:'],
      ...books
        .filter((item) =>
          [...new Set(arr.join(',').split(','))].includes(String(item.id))
        )
        .map((item) => [item?.id, item?.title, item?.authors[0]?.name]),
    ]
      .map((row) => row.join(';'))
      .join('\n');

    downloadFile({
      data: csvString,
      fileName: `${arr.length}-books.csv`,
      fileType: 'text/csv',
    });
  };

  const dispatch = useDispatch();
  return (
    <div
      className={`fixed ${arr.length > 0 ? '' : 'invisible'} bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg dark:bg-white bg-gray-800 p-2 drop-shadow-2xl`}
      id="gdpr"
    >
      <div className="flex items-center justify-between gap-6 text-sm">
        <div className="content-left pl-2 dark:text-black text-white">
          <div className="flex justify-center rounded-lg">
            <ul className=" rounded-lg w-auto bg-gray-800 text-white dark:bg-white dark:text-gray-900 ">
              {arr.map((item, idx) => {
                const tmp = books.filter((itm) => itm.id === Number(item[0]));

                return (
                  <li
                    key={'s' + idx}
                    className="px-6 py-2 border-b border-gray-200 w-full items-center flex"
                  >
                    <label
                      className="inline-flex items-center mr-2"
                      htmlFor={'1'}
                    >
                      <input
                        id={'1'}
                        type="checkbox"
                        className="w-4 h-4 accent-blue-600"
                        onChange={() => {
                          dispatch(on({ id: item[0] }));
                        }}
                        checked={check[Number(item[0])]}
                      ></input>
                    </label>
                    <div className="font-bold">id: {item[0]}</div>
                    <div>: {tmp[0]?.authors[0]?.name}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="content-right text-end">
          <button
            disabled={arr.length == 0}
            onClick={() => {
              arr.forEach((item) => dispatch(on({ id: item[0] })));
            }}
            className=" hover:opacity-80 disabled:opacity-30 active:cursor-pointer m-1 rounded-full dark:bg-gray-800 dark:text-white bg-gray-200 px-4 py-2 text-black"
          >
            Unselect all
          </button>
          <button
            onClick={() => {
              toCSV();
            }}
            className="hover:opacity-90  cursor-pointer rounded-full dark:bg-gray-800 dark:text-white bg-gray-200 px-4 py-2 text-black"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
