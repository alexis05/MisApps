import React, { Component } from "react";
import MenuBO from "./menu/MenuBO";
import { Link } from "react-router-dom";
import MisTiendasDrop from "./MisTiendas";
import "./styleBO.css";

class HomeBO extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <MisTiendasDrop />
          <input
            className="form-control form-control-dark w-100"
            type="text"
            placeholder="Search"
            aria-label="Search"
          ></input>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <Link className="nav-link" to="#">
                Sign out
              </Link>
            </li>
          </ul>
        </nav>
        <div className="col-auto">
          <div className="row">{this.props.children}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomeBO;
