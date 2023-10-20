import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/dashboards`;

const AnalyticsService = {
  retrieve: (userType) => axios.get(`${BASE_URL}/${userType}`),
};

export default AnalyticsService;
