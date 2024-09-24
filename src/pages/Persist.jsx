import { useEffect, useState } from "react";
import useMainContext from "@/hooks/useMainContext";
import useRefresh from "@/hooks/useRefresh";
import { Outlet } from "react-router-dom";
import { Spinner } from "@nextui-org/react";


const Persit = () =>
{
  const { persist, user } = useMainContext();
  const refresh = useRefresh();
  const [ loading, setLoading ] = useState( true );

  useEffect( () =>
  {
    const verifyRefreshToken = async () =>
    {
      try {
        await refresh();
      } catch ( err ) {
        console.error( err );
      } finally {
        setLoading( false );
      }
    };
    
    !user?.accessToken && persist ? verifyRefreshToken() : setLoading( false );
  }, [ user, refresh, persist ] );
  
  return (
    <>
      {!persist ?
        <Outlet /> :
        loading ? 
          <div className="flex justify-center items-center h-full w-full">
            <Spinner size="lg" color="primary"/>
          </div>
          :
          <Outlet/>
      }
    </>
  )
}

export default Persit