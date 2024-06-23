import ReactDOM from "react-dom/client";
import App from "./App";
import { TodosProvider } from "./context/TodosContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <TodosProvider>
        <App />
      </TodosProvider>
    </AuthProvider>
  </BrowserRouter>
);
