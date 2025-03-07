import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

interface PrivateRouteProps extends React.PropsWithChildren {
  role: string;
}

const PrivateRoute = ({ children, role} : PrivateRouteProps) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.role?.name && currentUser.role?.name !== role) {
      return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default PrivateRoute;