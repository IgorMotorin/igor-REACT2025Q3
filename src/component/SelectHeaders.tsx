import * as React from 'react';
export type tSelects = { [selects: string]: boolean };

const SelectHeaders = ({
  selects,
  setSelects,
}: {
  selects: tSelects;
  setSelects: React.Dispatch<React.SetStateAction<{ [p: string]: boolean }>>;
}) => {
  const arr = Object.keys(selects).sort();
  // const [see, setSee] = useState(false);

  return (
    <ul
      className={` z-[1000] float-left m-0 p-2 overflow-y-scroll h-120 min-w-max list-none rounded-lg border-none bg-gray-200 bg-clip-padding text-base shadow-lg dark:bg-surface-dark`}
      aria-labelledby="dropdownMenuButton1"
    >
      {arr.map((select) => (
        <li key={select}>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              id={select}
              checked={selects[select]}
              type="checkbox"
              onChange={() => {
                const obj = { ...selects };
                obj[select] = !obj[select];
                setSelects(obj);
              }}
              className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-black ">{select}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default SelectHeaders;
