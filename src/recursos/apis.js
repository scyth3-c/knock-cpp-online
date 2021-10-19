import axios from 'axios'

const api = axios.create({
  baseURL: 'https://knocknotes-api.herokuapp.com',
  headers: {
      'Content-Type': 'aplication/json' 
  }
});

export default api;