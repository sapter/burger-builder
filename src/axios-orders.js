import axios from "axios";
const instance = axios.create({
  baseURL: "https://react-my-burger-ef0d3.firebaseio.com/",
});

export default instance;
