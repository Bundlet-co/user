import axios from "axios";

export const dev_url = "http://localhost:3500";
//export const dev_url = "https://9c39rdqg-3500.uks1.devtunnels.ms"

export default axios.create( {
      baseURL: dev_url,
      withCredentials: true
} );

export const axiosPrivate = axios.create( {
      baseURL: dev_url,
      withCredentials: true
} );