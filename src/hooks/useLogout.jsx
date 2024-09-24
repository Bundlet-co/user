import { useNavigate } from "react-router-dom";
import useMainContext from "./useMainContext";
import useAxiosFetch from "./useAxiosFetch";


const useLogout = () => {
  const { setUser, openToast, closeToast } = useMainContext()
  const {fetchData} = useAxiosFetch()
  const navigate = useNavigate()
  
  const logout = async () =>
  {
    try {
      await fetchData(true,"/logout");
      setUser( {} );
      openToast( 'Logged out successfully', "success" );
      navigate('/')
    } catch (error) {
      if ( !error?.response ) return openToast( 'No server error', "error" );
      openToast( 'Internal server error', "error" );
    }finally {
      setTimeout( () =>
      {
        closeToast()
      },3000)
    }
  }

  return logout
}

export default useLogout