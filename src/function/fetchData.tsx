import Axios from 'axios';

export async function fetchData() {
  const response = await Axios({
    url: 'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json',
    method: 'GET',
  });
  return response.data;
}
