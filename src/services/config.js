import { isLocal } from '../utils/destinations';

// Url of the API in Azure
let apiUrl = null;

if (isLocal) {
  apiUrl = 'https://localhost:7175';
}

const config = {
  API_URL: apiUrl,
};

export default config;

