import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
const AuthLayout = () => {
  const { isAuthenticated } = useAuthContext();
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="auth-layout">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default AuthLayout;
