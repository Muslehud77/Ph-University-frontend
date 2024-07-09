import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks/reduxHooks";
import { selectAuthToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useAppSelector(selectAuthToken);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
