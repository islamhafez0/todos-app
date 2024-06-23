import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Popup from "../common/Popup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import { useTodos } from "../../hooks/useTodos";

const Header = () => {
  const { user, logout, isAuthenticated, appwriteLoading } = useAuthContext();
  const { setTodos } = useTodos();
  const { imageUrl, name, username, bio, email } = user;
  const [popUp, setPopup] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  useEffect(() => {
    pathname !== "/" && setPopup(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      setTodos([]);
      navigate("/auth/sign-in");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header>
      <Link to="/" className="logo">
        <img src="/assets/logo.png" alt="Logo" />
      </Link>
      {appwriteLoading ? (
        <Loader height="30px" width="30px" />
      ) : isAuthenticated ? (
        <img
          src={imageUrl}
          alt={name}
          className="user-name"
          onClick={() => setPopup((prev) => !prev)}
        />
      ) : (
        <Link className="button" to="/auth/sign-in" type="button">
          Signin
        </Link>
      )}

      {isAuthenticated && (
        <Popup
          popup={popUp}
          imageUrl={imageUrl}
          name={name}
          username={username}
          bio={bio ? bio : "no bio"}
          email={email}
          onLogout={handleLogout}
          isLoadingLogout={isLoggingOut}
        />
      )}
    </header>
  );
};

export default Header;
