import "./App.css";
import { useEffect } from "react";
import Landing from "./pages/landing/Landing";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Alert from "./components/Alert";
import { loadUser } from "./actions/auth";
import { connect } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import Developers from "./pages/developers/Developers";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ProfileSetup from "./pages/dashboard/ProfileSetup";
import NewEducation from "./pages/dashboard/NewEducation";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="App">
      <Alert />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/devs" element={<Developers />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<ProfileSetup />} />
          <Route path="/dashboard/education" element={<NewEducation />} />
        </Route>
      </Routes>
    </div>
  );
};

export default connect(null, { loadUser })(App);
