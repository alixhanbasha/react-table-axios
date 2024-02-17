import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import UserView from "./components/UserView";
import UserList from "./components/UserList";


const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Hello World!
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/users"} className="nav-link">
              List of Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/users/:id"} className="nav-link">
              User Profile
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<UserList/>} />
          <Route path="/users" element={<UserList/>} />
          <Route path="/users/:id" element={<UserView/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;