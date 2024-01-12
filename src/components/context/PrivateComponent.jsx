import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateComponent = ({ children }) => {
  const data = useSelector(state => state.login.LoginData);

  if (!data) {
    return <Navigate to={"/login"} replace={false} />;
  }

  return children;
};
