import React from "react";
import API from "../../API";

class CrearRestaurante extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
  };

  componentWillMount() {
    //console.log("will mount");
  }

  componentDidMount() {
    //console.log("didMount");
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log("didUpdate");
    //console.log({ prevProps: prevProps, prevState: prevState });
    /*console.log({
      props: this.props,
      state: this.state
    });
    */
  }

  handleChange = (e) => {
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.crearTienda(this.state.value);
  };

  crearTienda = async (tienda) => {
    this.setState({ loading: true, error: null });

    try {
      await API.post(`api/restaurante`, tienda).then((res) => {
        this.setState({ loading: false, data: res.data });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    return (
      <div>
        <div className="d-flex justify-content-center align-items-center container ">
          <div className="row">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre de la tienda</label>
                <input
                  className="form-control"
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  className="form-control"
                  name="telefono"
                  type="text"
                  placeholder="Numero de teléfono"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="eslogan">Eslogan</label>
                <input
                  id="eslogan"
                  className="form-control"
                  name="eslogan"
                  type="text"
                  placeholder="Eslogan"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="horario">Horario</label>
                <textarea
                  className="form-control"
                  id="horario"
                  rows="2"
                  name="horario"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="ejemplo@tienda.com"
                  onChange={this.handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  Nunca compartiremos su correo electrónico con nadie más.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Clave</label>
                <input
                  type="password"
                  name="clave"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Clave"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="direccion">Dirección</label>
                <textarea
                  className="form-control"
                  id="direccion"
                  rows="2"
                  name="direccion"
                  onChange={this.handleChange}
                />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CrearRestaurante;
