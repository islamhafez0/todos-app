import { Link, useNavigate } from "react-router-dom";
import { registerAccountInputs } from "../../utils/constants";
import { ChangeEvent, FormEvent, useState } from "react";
import { registerUser, signInAccount } from "../../lib/appwrite/api";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AppwriteException } from "appwrite";
import Loader from "../common/Loader";
const RegisterForm = () => {
  const { checkCurrentUser, isSigningin, setIsSigningin, appwriteLoading } =
    useAuthContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const initialUserData = {
    name: "",
    username: "",
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialUserData);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      Object.values(userData).some(
        (value) => value === "" || value.trim() === ""
      )
    )
      return;
    try {
      setIsSigningin(true);
      const newUser = await registerUser(userData);
      if (!newUser) {
        console.log("Register User Failed");
        return;
      }
      const session = await signInAccount({
        email: userData.email,
        password: userData.password,
      });
      if (session instanceof AppwriteException) {
        console.log("Failed to create user session");
        setError(session.message);
        return;
      }
      const isUserLoggedIn = await checkCurrentUser();
      if (isUserLoggedIn) {
        navigate("/");
        setUserData(initialUserData);
      }
      navigate("/");
    } catch (e) {
      if (e instanceof AppwriteException) {
        setError(e.message);
      }
      console.log(e);
    } finally {
      setIsSigningin(false);
    }
  };
  if (appwriteLoading) {
    return <Loader height="45px" width="45px" />;
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h3>Create New Account</h3>
      <p>Please enter your details to access the home</p>
      {error && <h5 className="error">{error}</h5>}
      <div className="inputs-wrapper">
        {registerAccountInputs.map(({ id, label, name, type }) => (
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
        {isSigningin ? <Loader height="20px" width="20px" /> : "Register"}
      </button>
      <div className="pathToSignin">
        Already have an account?
        <Link to="/auth/sign-in">Signin</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
