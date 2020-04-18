import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./mobile.css";

class Mobile extends Component {
  state = {
    loading: true,
    error: null,
    data: [],
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bodyMobile">
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <br></br>
            <div className="fadeIn first">INICIAR SESIÓN</div>
            <br></br>
            <form>
              <input
                type="text"
                id="email"
                className="fadeIn second inputText"
                name="email"
                placeholder="Correo"
              ></input>
              <input
                type="text"
                id="password"
                className="fadeIn third inputText"
                name="login"
                placeholder="Contraseña"
              ></input>
              <input
                type="submit"
                className="fadeIn fourth"
                value="Iniciar"
              ></input>
            </form>

            <div id="formFooter">
              <Link className="underlineHover aLink" to="#">
                ¿Has olvidado la contraseña?
              </Link>
            </div>
          </div>
          <div className="pt-5">Registrarse</div>
        </div>
      </div>
    );
  }
}

export default Mobile;
