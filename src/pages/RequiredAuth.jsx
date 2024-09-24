import { useLocation, Navigate, Outlet } from "react-router-dom";
import useMainContext from "@/hooks/useMainContext";

const RequiredAuth = () => {
  const location = useLocation();
  const { user } = useMainContext();
  return (
    user?.accessToken ? <Outlet /> :
      <Navigate to="/login" state={{ from : location }} replace/>
  )
}

export default RequiredAuth