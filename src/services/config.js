import { isLocal } from '../utils/destinations';

let apiUrl = 'https://keepscape-api20231108194606.azurewebsites.net/';

if (isLocal) {
  apiUrl = 'https://keepscape-api20231108194606.azurewebsites.net/';
}

const config = {
  API_URL: apiUrl,
};

export default config;

