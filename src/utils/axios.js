import axios from "axios";

export const dev_url = "https://bundlet-server.vercel.app";
//export const dev_url = "https://9c39rdqg-3500.uks1.devtunnels.ms"
//export const dev_url = "https://bundlet-server.onrender.com";

export default axios.create( {
      baseURL: dev_url,
      withCredentials: true
} );

export const axiosPrivate = axios.create( {
      baseURL: dev_url,
      withCredentials: true
} );
