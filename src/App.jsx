import { BrowserRouter, Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { TodoList } from './features/Todos/TodoList';
import { Login } from './features/Auth/Login';
import { Register } from './features/Auth/Register';
import { Nav } from './components/Nav/Nav';
import { AuthContextProvider } from './features/Auth/AuthContext';
import { BoardgameList } from './features/Boardgames/BoardgameList';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { BoardgameDetails } from './features/Boardgames/BoardgameDetails';
import { BoardgameAdd } from './features/Boardgames/BoardgameAdd';
import { BoardgameEdit } from './features/Boardgames/BoardgameEdit';

import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Homepage</h1>} />
          <Route
            path="todos"
            element={
              <ProtectedRoute>
                <TodoList />
              </ProtectedRoute>
            }
          />
          <Route path="boardgames" element={<BoardgameList />} />
          <Route
            path="boardgames/add"
            element={
              <ProtectedRoute>
                <BoardgameAdd />
              </ProtectedRoute>
            }
          />
          <Route
            path="boardgames/:id/edit"
            element={
              <ProtectedRoute>
                <BoardgameEdit />
              </ProtectedRoute>
            }
          />
          <Route path="boardgames/:id/details" element={<BoardgameDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>

        <ToastContainer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
