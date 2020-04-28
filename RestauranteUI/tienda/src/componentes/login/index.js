import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import LoginMobile from "./mobile";
import Cookies from "universal-cookie";
import API from "../../API";
import { Redirect } from "react-router-dom";
import Spinner from "../../styleGlobal/Spinner";

class Login extends Component {
  state = {
    loading: false,
    error: null,
    data: [],
    logRegCheckbox: false,
    logLoginCheckbox: false,
    loginInfoBoxFade: false, // emular los fadein fadeout
    registerInfoBoxFade: false, // emular los fadein fadeout
    showWhitePanel: false,
    showRegisterPanel: false,
    showLoginPanel: false,
    email: "",
    clave: "",
    mensajeLogin: null,
    redirect: false,
  };

  constructor(props) {
    super(props);
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerChangeReg = this.handlerChangeReg.bind(this);
    this.handlerChangeLog = this.handlerChangeLog.bind(this);
    this.onHandlerClick = this.onHandlerClick.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
  }

  handlerChangeReg() {
    this.setState({
      logLoginCheckbox: false,
      logRegCheckbox: true,
      loginInfoBoxFade: false,
      registerInfoBoxFade: true,
    });
    this.handlerChange();
  }

  isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  loginFetch = async (email, clave) => {
    this.setState({ loading: true, error: null });
    let body = { email, clave };
    try {
      await API.post(`Controller/auth`, body).then((res) => {
        const cookies = new Cookies();
        if (res.data.mensaje === "NO_LOGIN") {
          this.setState({
            ...this.state,
            mensajeLogin: "Debe ingresar un correo o clave valida.",
            loading: false,
          });
        }
        if (res.data.token) {
          cookies.set("sidtk", res.data.token, { path: "/" });
          this.setState({ loading: false, data: res.data, redirect: true });
        }
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  validateLogin() {
    if (this.state.email && this.state.clave) {
      let emailValid = false,
        claveValid = false;
      if (this.isValidEmail(this.state.email)) {
        emailValid = true;
      } else {
        this.setState({
          ...this.state,
          mensajeLogin: "Debe ingresar un correo valido",
        });
      }
      if (this.state.clave.length > 7) {
        claveValid = true;
      }

      if (emailValid && claveValid) {
        this.loginFetch(this.state.email, this.state.clave);
      }
    } else if (!this.state.email.length && !this.state.clave.length) {
      this.setState({
        ...this.state,
        mensajeLogin: "Debe ingresar un correo y clave.",
      });
      return;
    } else if (!this.state.email.length) {
      this.setState({
        ...this.state,
        mensajeLogin: "Debe ingresar un correo",
      });
      return;
    } else if (!this.state.clave.length) {
      this.setState({
        ...this.state,
        mensajeLogin: "Debe ingresar una clave",
      });
      return;
    }
  }

  onChangeLogin(e) {
    if (e.target.name === "email") {
      if (e.target.value) {
        const email = e.target.value;
        if (this.isValidEmail(email)) {
          this.setState({ ...this.state, email: email, mensajeLogin: "" });
        } else {
          this.setState({
            ...this.state,
            mensajeLogin: "Debe ingresar un correo valido",
          });
        }
      }
    } else if (e.target.name === "clave") {
      if (e.target.value.length > 7) {
        const clave = e.target.value;
        this.setState({ ...this.state, clave: clave, mensajeLogin: "" });
      } else {
        this.setState({
          ...this.state,
          mensajeLogin: "Debe una clave con mas de 8 caracteres.",
        });
      }
    }
  }

  onHandlerClick() {
    this.validateLogin();
  }

  handlerChangeLog() {
    this.setState({
      logLoginCheckbox: true,
      logRegCheckbox: false,
      loginInfoBoxFade: true,
      registerInfoBoxFade: false,
    });
    this.handlerChange();
  }
  handlerChange() {
    if (this.state.logLoginCheckbox) {
      this.setState({
        registerInfoBoxFade: false,
        showWhitePanel: true,
        showRegisterPanel: true,
        showLoginPanel: false,
      });
    } else if (this.state.logRegCheckbox) {
      this.setState({
        registerInfoBoxFade: true,
        showWhitePanel: false,
        showLoginPanel: true,
        showRegisterPanel: false,
      });
    }
  }
  componentDidMount() {
    this.setState({
      loginInfoBoxFade: true,
      registerInfoBoxFade: false,

      logRegCheckbox: false,
      logLoginCheckbox: true,

      showLoginPanel: true,
      showRegisterPanel: false,
      showWhitePanel: false,
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/Home" />;
    }
    return (
      <div className="bodyDiv">
        <div className="d-block d-xs-none d-sm-none">
          <LoginMobile />
        </div>
        <div className="login-reg-panel d-none d-md-block d-lg-block d-xl-block">
          <div
            className={
              this.state.registerInfoBoxFade
                ? "fadeOut login-info-box"
                : "fadeIn login-info-box"
            }
          >
            <h2>¿Tienes una cuenta?</h2>
            <p className="text-center"></p>
            <label id="label-register" htmlFor="log-reg-show">
              Iniciar
            </label>
            <input
              type="radio"
              name="active-log-panel"
              id="log-reg-show"
              defaultChecked={this.state.logRegCheckbox}
              onChange={this.handlerChangeLog}
            ></input>
          </div>

          <div
            className={
              this.state.loginInfoBoxFade
                ? "fadeIn register-info-box"
                : "fadeOut register-info-box"
            }
          >
            <h2>No tienes una cuenta?</h2>
            <p className="text-center"></p>
            <label id="label-login" htmlFor="log-login-show">
              Registrate!
            </label>
            <input
              type="radio"
              name="active-log-panel"
              id="log-login-show"
              defaultChecked={this.state.logLoginCheckbox}
              onChange={this.handlerChangeReg}
            ></input>
          </div>

          <div
            className={
              this.state.showWhitePanel
                ? "white-panel right-log"
                : "white-panel"
            }
          >
            <div
              className={
                this.state.showLoginPanel
                  ? "show-log-panel login-show"
                  : "login-show"
              }
            >
              <h2>INICIAR SESIÓN</h2>
              <input
                type="text"
                name="email"
                placeholder="Correo"
                onChange={this.onChangeLogin}
              ></input>
              <input
                type="password"
                name="clave"
                placeholder="Contraseña"
                onChange={this.onChangeLogin}
              ></input>
              <span className="text-center">{this.state.mensajeLogin}</span>
              {this.state.loading ? (
                <div className="row d-flex text-center justify-content-center">
                  <Spinner />
                </div>
              ) : (
                <span></span>
              )}
              <input
                type="button"
                value="Iniciar"
                onClick={this.onHandlerClick}
              ></input>
              <Link className="aLink" to="">
                ¿Has olvidado la contraseña?
              </Link>
            </div>
            <div
              className={
                this.state.showLoginPanel
                  ? "register-show"
                  : "show-log-panel register-show"
              }
            >
              <h2>REGISTRATE</h2>
              <input type="text" placeholder="Correo"></input>
              <input type="password" placeholder="Contraseña"></input>
              <input
                type="password"
                placeholder="Confirma tu contraseña"
              ></input>
              <input type="button" value="Registrarme"></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
