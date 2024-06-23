import { Link, useNavigate } from "react-router-dom";
import { signinFormInputs } from "../../utils/constants";
import { ChangeEvent, FormEvent, useState } from "react";
import { signInAccount } from "../../lib/appwrite/api";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../common/Loader";
import { AppwriteException } from "appwrite";

const SigninForm = () => {
  const initialUserData = {
    email: "",
    password: "",
  };
  const { checkCurrentUser, isSigningin, setIsSigningin, appwriteLoading } =
    useAuthContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(initialUserData);
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(userData).some((value) => value === "")) return;
    try {
      setIsSigningin(true);
      const session = await signInAccount({
        email: userData.email,
        password: userData.password,
      });
      if (session instanceof AppwriteException) {
        setError(session.message);
        return;
      }
      const isLoggedIn = await checkCurrentUser();
      if (isLoggedIn) {
        setUserData(initialUserData);
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AppwriteException) {
        setError(error.message);
      }
      console.log(error);
    } finally {
      setIsSigningin(false);
    }
  };
  if (appwriteLoading) {
    return (
      <div className="page-loader">
        <Loader height="45px" width="45px" />
      </div>
    );
  }
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3>Login to your account now!</h3>
      <p>Welcome back!</p>
      {error && <h5 className="error">{error}</h5>}
      <div className="inputs-wrapper">
        {signinFormInputs.map(({ id, label, name, type }) => (
          <div key={id} className="input-wrapper">
            <label htmlFor={id}>{label}</label>
            <input
              type={type}
              id={id}
              name={name}
              value={userData[name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className={`${
          isSigningin || Object.values(userData).some((value) => value === "")
            ? "disabled"
            : ""
        }`}
        disabled={
          isSigningin || Object.values(userData).some((value) => value === "")
        }
      >
        {isSigningin ? <Loader width="20px" height="20px" /> : "Signin"}
      </button>
      <div className="pathToSignin">
        Don't have an account?
        <Link to="/auth/sign-up">signup</Link>
      </div>
    </form>
  );
};

export default SigninForm;
