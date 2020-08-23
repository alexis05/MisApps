import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styleBO.css";

class MenuBO extends Component {
  state = {
    menuSeleccionado: "dashboard",
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const ruta = window.location.pathname;
    switch (ruta) {
      case "/Admin":
        this.setState({ menuSeleccionado: "dashboard" });
        break;
      case "/Admin/Ordenes":
        this.setState({ menuSeleccionado: "ordenes" });
        break;
      case "/Admin/Productos":
        this.setState({ menuSeleccionado: "productos" });
        break;
      case "/Admin/Clientes":
        this.setState({ menuSeleccionado: "clientes" });
        break;
      case "/Admin/Reportes":
        this.setState({ menuSeleccionado: "reportes" });
        break;
      case "/Admin/MiTienda":
        this.setState({ menuSeleccionado: "mitienda" });
        break;
    }
  }

  handleClick = (menu) => {
    this.setState({ menuSeleccionado: menu });
  };

  menuActivo = (elemento) => {
    if (elemento === this.state.menuSeleccionado) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-2">
          <nav className="d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li
                  className="nav-item"
                  onClick={() => this.handleClick("dashboard")}
                >
                  <Link
                    className={
                      this.menuActivo("dashboard")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/Admin"
                  >
                    <span data-feather="home"></span>
                    Dashboard <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => this.handleClick("ordenes")}
                >
                  <Link
                    className={
                      this.menuActivo("ordenes")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/Admin/Ordenes"
                  >
                    <span data-feather="file"></span>
                    Ordenes
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => this.handleClick("productos")}
                >
                  <Link
                    className={
                      this.menuActivo("productos")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/Admin/Productos"
                  >
                    <span data-feather="shopping-cart"></span>
                    Productos
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => this.handleClick("clientes")}
                >
                  <Link
                    className={
                      this.menuActivo("clientes")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/Admin/Clientes"
                  >
                    <span data-feather="users"></span>
                    Clientes
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => this.handleClick("reportes")}
                >
                  <Link
                    className={
                      this.menuActivo("reportes")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/Admin/Reportes"
                  >
                    <span data-feather="bar-chart-2"></span>
                    Reportes
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => this.handleClick("mitienda")}
                >
                  <Link
                    className={
                      this.menuActivo("mitienda")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/Admin/MiTienda"
                  >
                    <span data-feather="layers"></span>
                    Mi Tienda
                  </Link>
                </li>
              </ul>

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <Link className="d-flex align-items-center text-muted" to="#">
                  <span data-feather="plus-circle"></span>
                </Link>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <span data-feather="file-text"></span>
                    Current month
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <span data-feather="file-text"></span>
                    Last quarter
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <span data-feather="file-text"></span>
                    Social engagement
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <span data-feather="file-text"></span>
                    Year-end sale
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="offset-xs-0 offset-sm-0 offset-md-2 offset-lg-2 col-xs-12 col-sm-12  col-md-10 col-lg-10 pt-3 px-4">
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default MenuBO;
