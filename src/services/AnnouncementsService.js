import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/announcements`;

const AnnouncementsService = {
  add: (body) => axios.post(`${BASE_URL}`, body),
  list: () => axios.get(`${BASE_URL}`),
  retrieve: (announcementId) => axios.get(`${BASE_URL}/${announcementId}`),
  delete: (announcementId) => axios.delete(`${BASE_URL}/${announcementId}`),
};

export default AnnouncementsService;
