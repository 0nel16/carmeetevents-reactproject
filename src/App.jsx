import { BrowserRouter, Route, Routes } from "react-router";
import { TodoList } from "./features/Todos/TodoList";
import { Login } from "./features/Auth/Login";
import { Register } from "./features/Auth/Register";
import { Nav } from "./components/Nav/Nav";
import { ToastContainer } from "react-toastify";

import './App.css';
import { AuthContextProvider } from "./features/Auth/AuthContext";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Homepage</h1>} />
          <Route path="todos" element={<TodoList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>

        <ToastContainer />
      </AuthContextProvider>
    </BrowserRouter>
  )
}
