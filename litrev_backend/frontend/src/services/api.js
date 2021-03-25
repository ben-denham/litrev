import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/';

const api = {

  async getSession(sessionId) {
    if (sessionId === null) {
      return null;
    }
    const result = await axios.get(API_BASE_URL + 'api/session/' + sessionId);
    return result.data;
  },

  async createSession() {
    const url = API_BASE_URL + 'api/session/';
    const result = await axios.post(url);
    return result.data.created;
  },

};

export default api;
