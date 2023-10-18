import { isLocal } from '../utils/destinations';

let apiUrl = 'https://keepscape-api20231018021452.azurewebsites.net';

if (isLocal) {
  apiUrl = 'https://localhost:7104';
}

const config = {
  API_URL: apiUrl,
};

export default config;

