import React from "react";
import MenuBO from "./menu/MenuBO";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";
import "./styleBO.css";

const HomeBO = () => {
  return (
    <React.Fragment>
      <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <Link class="navbar-brand col-sm-3 col-md-2 mr-0" to="#">
          Company name
        </Link>
        <input
          class="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        ></input>
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <Link class="nav-link" to="#">
              Sign out
            </Link>
          </li>
        </ul>
      </nav>
      <div className="col-12">
        <div className="row">
          <MenuBO />
          <Dashboard />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeBO;
