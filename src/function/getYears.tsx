const getYears = (data: {
  [country: string]: { data: { year: number }[] };
}) => {
  const out: { [year: number]: boolean } = {};
  for (const country in data) {
    data[country]['data'].forEach((itm) => {
      out[itm.year] = false;
    });
  }

  return Object.keys(out).sort().reverse();
};
export default getYears;
