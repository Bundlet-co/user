import { useEffect } from "react";
import useRefresh from "./useRefresh"
import { axiosPrivate } from "@/utils/axios";
import useMainContext from "./useMainContext";

const useAxiosPrivate = () => {
  const refresh = useRefresh();
  const { user } = useMainContext();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) { 
          config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
        }
        return config;
      }, (e) => Promise.reject(e)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config; 
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
        return Promise.reject(error);
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }

  }, [user, refresh])
  
  return axiosPrivate;
}

export default useAxiosPrivate