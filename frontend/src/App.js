import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./protectedRoutes/PrivateRoute";
import Login from "./pages/Login";
import "./App.css";
import Guard from "./protectedRoutes/Guard";
import Task from "./pages/Task";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import AddTask from "./pages/AddTask";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar"; // Ensure Navbar is imported
import { useState } from "react";
import NotFound from "./pages/NotFound";

function App() {
  const [logged, setLogged] = useState(
    localStorage.getItem("token") ? false : true
  );

  const handleLog = () => {
    if (!logged) {
      localStorage.setItem("token", "");
    }
    setLogged((logged) => !logged);
  };

  return (
    <div>
      <ToastContainer />
      <Router>
        <Navbar handleLog={handleLog} />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/" element={<Guard />}>
            <Route path="/profile" element={<Profile />} />
            <Route index element={<Task />} />
            <Route path="/tasks/add" element={<AddTask />} />
            <Route path="/tasks/edit/:id" element={<AddTask />} />
          </Route>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
