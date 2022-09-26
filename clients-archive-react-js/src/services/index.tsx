import axios from "axios";

const api = axios.create({
  baseURL: "https://client-archive-caio.herokuapp.com/",
});
// https://client-archive-caio.herokuapp.com/
// http://localhost:3000/

export default api;
