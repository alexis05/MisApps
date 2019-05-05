import React, { Component } from 'react';
import './MenuInferior.css';
import { Link } from 'react-router-dom';

class MenuInferior extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }

   render() {
      return (

        <div className="brParaElFooter">
          <div className="navbar footer fixed-bottom footer-light footer-shadow content container-fluid">
            <div className="w-100">

                <Link to="/crearCita" >
                  <button type="button" className="btn btn-dark float-right" >
                    Solicitar cita
                  </button>
                </Link>

            </div>
          </div>
        </div>

      );
   }
}
export default MenuInferior;
