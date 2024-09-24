import axios from "@/utils/axios";
import { useCallback, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";


const useAxiosFetch = () =>
{
  const [error,setError] = useState("")
  const [message,setMessage] = useState('')
  const [ loading, setLoading ] = useState( false )
  const [responseData,setResponseData] = useState();
  const axiosPrivate = useAxiosPrivate();

  const fetchData = useCallback(async (isPrivate = false,url = "",method ="GET", data = {}, option = {}) =>
  {
    const axiosInstance = isPrivate ? axiosPrivate : axios;
    try {
      setLoading( true );
      setError("")
      setMessage("")
      const res = await axiosInstance( {
        url,
        method: method.toUpperCase(),
        data: method.toUpperCase() !== "GET" ? data : undefined,
        ...option,
      } )
      setMessage(res.data.message)
      setResponseData( res.data);
      return res.data;
    } catch ( error ) {
      if ( !error.response ) {
        setError( "No server Response" );
        throw new Error("No server response")
      } else if ( error.response.data && error.response.data.message ) {
        setError( error.response.data.message );
        throw new Error(error.response.data.message)
      } else {
        setError( "Something went wrong" );
        throw new Error("Something went wrong")
      }
    }
    finally{
      setLoading(false)
    }
  },[axiosPrivate])

  return {fetchData,loading,responseData,error,message}
}

export default useAxiosFetch;