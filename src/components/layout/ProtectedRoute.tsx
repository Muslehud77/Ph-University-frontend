import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/reduxHooks";
import { logout, selectAuthToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types";

type ProtectedRouteProps = {
  children: ReactNode;
  role:string|undefined
};

const ProtectedRoute = ({ children ,role}: ProtectedRouteProps) => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectAuthToken);
  
  let user;
  if(token){
    user = verifyToken(token) as TUser
  }

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
