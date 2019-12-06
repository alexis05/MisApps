import React from "react";
import { Link } from "react-router-dom";

const MenuBO = props => (
  <div>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link className="nav-link active" to="#">
          Active
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#">
          Link
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#">
          Link
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link disabled" to="#">
          Disabled
        </Link>
      </li>
    </ul>
    {props.children}
  </div>
);
export default MenuBO;
