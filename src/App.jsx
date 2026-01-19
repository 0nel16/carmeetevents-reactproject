import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Login } from "./features/Auth/Login";
import { Register } from "./features/Auth/Register";
import { Nav } from "./components/Nav/Nav";
import { AuthContextProvider } from "./features/Auth/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import EventsList from "./features/Events/EventsList";
import EventDetails from "./features/Events/EventDetails";
import CreateEvent from "./features/Events/CreateEvent";
import EditEvent from "./features/Events/EditEvent";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Nav />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<EventsList />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/add" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>}></Route>
          <Route path="/events/:id/edit" element={<ProtectedRoute><EditEvent /></ProtectedRoute>}></Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
