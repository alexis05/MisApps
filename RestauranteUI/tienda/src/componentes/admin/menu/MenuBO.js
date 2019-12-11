import React from "react";
import { Link } from "react-router-dom";
import "./styleBO.css";
const MenuBO = props => (
  <div>
    <div className="nav-side-menu">
      <div className="brand">Brand Logo</div>
      <i
        className="fa fa-bars fa-2x toggle-btn"
        data-toggle="collapse"
        data-target="#menu-content"
      ></i>

      <div className="menu-list">
        <ul id="menu-content" className="menu-content collapse out">
          <li>
            <Link to="#">
              <i className="fas fa-tachometer-alt fa-lg"></i> Dashboard
            </Link>
          </li>

          <li
            data-toggle="collapse"
            data-target="#products"
            className="collapsed active"
          >
            <Link to="#">
              <i className="fab fa-studiovinari fa-lg"></i> UI Elements{" "}
              <span className="arrow"></span>
            </Link>
          </li>
          <ul className="sub-menu collapse" id="products">
            <li className="active">
              <Link to="#">CSS3 Animation</Link>
            </li>
            <li>
              <Link to="#">General</Link>
            </li>
            <li>
              <Link to="#">Buttons</Link>
            </li>
            <li>
              <Link to="#">Tabs & Accordions</Link>
            </li>
            <li>
              <Link to="#">Typography</Link>
            </li>
            <li>
              <Link to="#">FontAwesome</Link>
            </li>
            <li>
              <Link to="#">Slider</Link>
            </li>
            <li>
              <Link to="#">Panels</Link>
            </li>
            <li>
              <Link to="#">Widgets</Link>
            </li>
            <li>
              <Link to="#">Bootstrap Model</Link>
            </li>
          </ul>

          <li
            data-toggle="collapse"
            data-target="#service"
            className="collapsed"
          >
            <Link to="#">
              <i className="fab fa-fort-awesome-alt fa-lg"></i> Services{" "}
              <span className="arrow"></span>
            </Link>
          </li>
          <ul className="sub-menu collapse" id="service">
            <li>New Service 1</li>
            <li>New Service 2</li>
            <li>New Service 3</li>
          </ul>

          <li data-toggle="collapse" data-target="#new" className="collapsed">
            <Link to="#">
              <i className="fab fa-pagelines fa-lg"></i> New{" "}
              <span className="arrow"></span>
            </Link>
          </li>
          <ul className="sub-menu collapse" id="new">
            <li>New New 1</li>
            <li>New New 2</li>
            <li>New New 3</li>
          </ul>

          <li>
            <Link to="#">
              <i className="fas fa-user-tie fa-lg"></i> Profile
            </Link>
          </li>

          <li>
            <Link to="#">
              <i className="fa fa-users fa-lg"></i> Users
            </Link>
          </li>
        </ul>
      </div>
    </div>
    {props.children}
  </div>
);
export default MenuBO;
