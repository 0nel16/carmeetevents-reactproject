import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Login } from "./features/Auth/Login";
import { Register } from "./features/Auth/Register";
import { Nav } from "./components/Nav/Nav";
import { AuthContextProvider } from "./features/Auth/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Home from "./features/Home/Home";
import EventsList from "./features/Events/EventsList";
import EventDetails from "./features/Events/EventDetails";
import CreateEvent from "./features/Events/CreateEvent";
import EditEvent from "./features/Events/EditEvent";
import MyEvents from "./features/Events/MyEvents";
import Profile from "./features/Auth/Profile";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Nav />
        <ToastContainer />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<EventsList />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/add" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>}></Route>
          <Route path="/events/:id/edit" element={<ProtectedRoute><EditEvent /></ProtectedRoute>}></Route>
          <Route path="/my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>}></Route>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
