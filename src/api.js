import axios from "axios";

const instance = axios.create({
  baseURL: "https://bloogroup-2635b-default-rtdb.firebaseio.com/",
});

export default instance;
