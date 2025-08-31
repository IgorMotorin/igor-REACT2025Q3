import { useEffect, useState } from 'react';

const TableData = ({
  tmp,
  itm,
}: {
  tmp: { [year: string]: number }[];
  itm: string;
}) => {
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    setIsUpdated(true);
    const timer = setTimeout(() => {
      setIsUpdated(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [itm, tmp]);
  return (
    <td className={`border px-4 py-2 ${isUpdated ? ' bg-blue-100' : ''}`}>
      {tmp.length > 0 ? String(tmp[0][itm]) || 'N/A' : 'N/A'}
    </td>
  );
};

export default TableData;
