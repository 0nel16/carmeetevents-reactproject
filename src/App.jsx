import { BrowserRouter, Route, Routes } from "react-router";
import { TodoList } from "./features/Todos/TodoList";
import { Nav } from "./components/Nav/Nav";

import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>} />
        <Route path="todos" element={<TodoList />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
