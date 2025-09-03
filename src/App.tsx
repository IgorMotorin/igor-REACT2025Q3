import { memo, use, useMemo, useState } from 'react';

import Table from './component/Table.tsx';
import getHeaders from './function/getHeaders.tsx';
import SelectHeaders from './component/SelectHeaders.tsx';
import SelectYears from './component/SelectYears.tsx';
import getAllCountry from './function/getAllCountry.tsx';
import SelectCountry from './component/SelectCountry.tsx';
import Search from './component/Search.tsx';
import Modal from './component/Modal.tsx';
import ModalButton from './component/ModalButton.tsx';
import { fetchData } from './function/fetchData.tsx';
const userResource = fetchData();

const App = () => {
  const data = use(userResource);

  const getHeadersData = useMemo(() => getHeaders(data), [data]);
  const [headers, setHeaders] = useState(getHeadersData);
  const allCountry = useMemo(() => getAllCountry(data), [data]);
  const [country, setCountry] = useState(allCountry);
  const [year, setYear] = useState<number>(2023);
  const [isShowing, setIsShowing] = useState(false);
  const countryData = useMemo(
    () => Object.keys(country).filter((itm) => country[itm]),
    [country]
  );
  const modalButton = useMemo(
    () => <ModalButton setIsShowing={setIsShowing}></ModalButton>,
    [setIsShowing]
  );
  const selectCountry = useMemo(
    () => (
      <SelectCountry country={country} setCountry={setCountry}></SelectCountry>
    ),
    [country, setCountry]
  );
  const table = useMemo(
    () => (
      <Table data={data} headers={headers} year={year} country={countryData} />
    ),
    [data, headers, year, countryData]
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className={'flex items-center'}>
        <h2 className="text-2xl font-bold mb-4">Data on CO2</h2>
        {modalButton}
        {selectCountry}
        <Modal isShowing={isShowing} handleClose={() => setIsShowing(false)}>
          <SelectHeaders
            selects={headers}
            setSelects={setHeaders}
          ></SelectHeaders>
        </Modal>

        <SelectYears data={data} year={year} setYear={setYear} />
        <Search country={allCountry} setCountry={setCountry} />
      </div>

      {table}
    </div>
  );
};

export default memo(App);
