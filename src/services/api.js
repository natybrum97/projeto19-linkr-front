import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function getUserPost(token, id) {
  const config = createConfig(token, id);

  const promise = axios.get(`${BASE_URL}/user/${id}`, config);

  return promise;
}

const api = { getUserPost };

export default api;
