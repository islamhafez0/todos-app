import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import AuthLayout from "./components/_auth/AuthLayout";
import SigninForm from "./components/_auth/SigninForm";
import RegisterForm from "./components/_auth/RegisterForm";
import { useAuthContext } from "./hooks/useAuthContext";
export default function App() {
  const { isAuthenticated } = useAuthContext();
  return (
    <>
      <Header />
      <div className="app">
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/sign-in" element={<SigninForm />} />
            <Route path="/auth/sign-up" element={<RegisterForm />} />
          </Route>
          <Route path="/" element={<Home />} />
          {isAuthenticated && <Route path="/" element={<Home />} />}
        </Routes>
        {!isAuthenticated && (
          <Navigate
            to={
              location.pathname.includes("/sign-up")
                ? "/auth/sign-up"
                : "/auth/sign-in"
            }
          />
        )}
      </div>
      <p className="copyright">
        &copy; Islam Hafez {new Date().getFullYear()} &#10084;
      </p>
    </>
  );
}
