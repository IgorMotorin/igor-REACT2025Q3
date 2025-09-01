import axios from 'axios';

async function fetchData() {
  const response = await axios({
    url: 'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json',
    method: 'GET',
  });
  console.log(response);
  return response.data;
}

export default fetchData;
