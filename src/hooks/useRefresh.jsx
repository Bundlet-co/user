import { useCallback } from "react";
import useMainContext from "./useMainContext";
import axios from "@/utils/axios";


const useRefresh = () =>
{
  const { setUser } = useMainContext();
  const refresh = useCallback( async () =>
  {
    try {
      const response = await axios.get( '/refresh' );
      const accessToken = response.data.accessToken
      setUser( response.data );
      return accessToken;
    } catch (error) {
      console.error(error);
    }
  },[setUser])
  return refresh;
}

export default useRefresh