import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function getUserPost(token, id, timesFetched, qtd) {
  const config = createConfig(token, id);

  const promise = axios.get(`${BASE_URL}/user/${id}?page=${timesFetched}&qtd=${qtd}`, config);

  return promise;
}

function searchUserByName(username) {
  const promise = axios.get(`${process.env.REACT_APP_API_URL}/search-users?query=${username}`);

  return promise;
}

const api = { getUserPost, searchUserByName };

export default api;
