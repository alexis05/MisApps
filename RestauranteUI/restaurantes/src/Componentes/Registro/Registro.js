import React from "react";

class Registro extends React.Component {
  constructor(props) {
    super(props);
    console.log("Construstor");
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    console.log("will mount");
  }

  componentDidMount() {
    console.log("didMount");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate");
    console.log({ prevProps: prevProps, prevState: prevState });
    console.log({
      props: this.props,
      state: this.state
    });
  }

  handleChange(event) {
    console.log("change", event.target.value);
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

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
                  placeholder="Nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  className="form-control"
                  type="text"
                  placeholder="Numero de teléfono"
                />
              </div>

              <div className="form-group">
                <label htmlFor="horario">Horario</label>
                <textarea className="form-control" id="horario" rows="2" />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Agregue el correo"
                  value={this.state.value}
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
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Clave"
                />
              </div>
              <div className="form-group">
                <label htmlFor="direccion">Dirección</label>
                <textarea className="form-control" id="direccion" rows="2" />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Registro;
