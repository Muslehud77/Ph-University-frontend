import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/reduxHooks";
import { logout, selectAuthToken, selectAuthUser } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
  role:string|undefined
};

const ProtectedRoute = ({ children ,role}: ProtectedRouteProps) => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectAuthToken);
  const user = useAppSelector(selectAuthUser)

  if(user?.role !== role && role !== undefined){
    dispatch(logout())
    return <Navigate to="/login" />;
  }


  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
