import type { tData } from '../component/SelectYears.tsx';
import type { tCountry } from '../component/SelectCountry.tsx';

const getAllCountry = (data: tData) => {
  const out: tCountry = {};

  for (const country in data) {
    Object.assign(out, { [country]: true });
  }

  return out;
};

export default getAllCountry;
