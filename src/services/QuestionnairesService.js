import axios from 'axios';

import config from './config';

const BASE_URL = `${config.API_URL}/api/Questionnaires`;

const QuestionnairesService = {
  create: (name) => axios.post(`${BASE_URL}`, null, {
    params: {
      name,
    },
  }),
  list: () => axios.get(`${BASE_URL}`),
  retrieve: (id) => axios.get(`${BASE_URL}/${id}/Details`),
  updateQuestions: (id, body) => axios.put(`${BASE_URL}/${id}/Questions`, body),
  updateSuggestions: (id, body) => axios.put(`${BASE_URL}/${id}/Suggestions`, body),
  generate: (body) => axios.post(`${BASE_URL}/Suggest/Questions`, body),
  suggest: (body) => axios.post(`${BASE_URL}/Suggest/Products`, body),
};

export default QuestionnairesService;
