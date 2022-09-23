import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});
// https://client-archive-caio.herokuapp.com/

export default api;
