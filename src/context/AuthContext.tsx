import { AppwriteException } from "appwrite";
import { ReactNode, createContext, useEffect, useState } from "react";
import { AppwriteAuthContextTypes, User } from "../interface";
import { INITIAL_USER } from "../utils/constants";
import { Appwritelogout, getCurrentUser } from "../lib/appwrite/api";
import { useNavigate } from "react-router-dom";

const AppWriteAuthContext = createContext<AppwriteAuthContextTypes | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appwriteError, setAppwriteError] = useState("");
  const [appwriteLoading, setAppwriteLoading] = useState(false);
  const [isSigningin, setIsSigningin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const isUserAuthenticated = await checkCurrentUser();
      if (!isUserAuthenticated) {
        navigate("/auth/sign-in");
      }
    })();
  }, []);

  const checkCurrentUser = async () => {
    setAppwriteLoading(true);
    try {
      const currentUser: any = await getCurrentUser();
      if (!currentUser || currentUser instanceof AppwriteException) {
        console.log("No user found");
        setUser(INITIAL_USER);
        setIsAuthenticated(false);
        return false;
      } else {
        setUser({
          id: currentUser.$id,
          bio: currentUser.bio,
          email: currentUser.email,
          imageUrl: currentUser.imageUrl,
          name: currentUser.name,
          username: currentUser.name,
        });
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      handleError(error);
    } finally {
      setAppwriteLoading(false);
    }
  };

  const logout = async () => {
    try {
      await Appwritelogout();
      setUser(INITIAL_USER);
      setIsAuthenticated(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    if (error instanceof AppwriteException) {
      setAppwriteError(error.message);
      console.log(error.message);
    }
  };

  return (
    <AppWriteAuthContext.Provider
      value={{
        appwriteError,
        appwriteLoading,
        checkCurrentUser,
        logout,
        isAuthenticated,
        user,
        isSigningin,
        setIsSigningin,
      }}
    >
      {children}
    </AppWriteAuthContext.Provider>
  );
};

export { AppWriteAuthContext, AuthProvider };
