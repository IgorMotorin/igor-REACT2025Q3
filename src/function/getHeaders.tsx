import type { tData } from '../component/SelectYears.tsx';

const getHeaders = (data: tData): { [p: string]: boolean } => {
  const out: { [key: string]: boolean } = {};
  for (const country in data) {
    data[country]['data'].forEach((itm) => {
      Object.assign(out, itm);
    });
  }
  for (const key in out) {
    out[key] = false;
  }

  return {
    ...out,
    co2: true,
    co2_per_capita: true,
    year: true,
    population: true,
  };
};
export default getHeaders;
