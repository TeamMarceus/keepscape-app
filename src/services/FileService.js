import axios from 'axios';

const BASE_URL = '/files/';

const FileService = {
  upload: ({ body }) =>
    axios.post(`${BASE_URL}upload/`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

export default FileService;
