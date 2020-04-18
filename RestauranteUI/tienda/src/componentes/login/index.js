import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import LoginMobile from "./mobile";

class Login extends Component {
  state = {
    loading: true,
    error: null,
    data: [],
    logRegCheckbox: false,
    logLoginCheckbox: false,
    loginInfoBoxFade: false, // emular los fadein fadeout
    registerInfoBoxFade: false, // emular los fadein fadeout
    showWhitePanel: false,
    showRegisterPanel: false,
    showLoginPanel: false,
  };

  constructor(props) {
    super(props);
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerChangeReg = this.handlerChangeReg.bind(this);
    this.handlerChangeLog = this.handlerChangeLog.bind(this);
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
            <p className="text-center">
              <span role="img" aria-label="cool">
                😎
              </span>
            </p>
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
            <p className="text-center">
              <span role="img" aria-label="thing">
                🤔
              </span>
            </p>
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
              <input type="text" placeholder="Correo"></input>
              <input type="password" placeholder="Contraseña"></input>
              <input type="button" value="Iniciar"></input>
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
