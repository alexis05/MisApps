import React, { Component } from "react";
import HomeBO from "./HomeBO";
import Dasboard from "./Dashboard";
import Productos from "./Productos";

class Home extends Component {
  state = {
    menu: "dashboard",
  };

  constructor(props) {
    super(props);
    this.onChangeMenu = this.onChangeMenu.bind(this);
  }

  onChangeMenu(e) {
    console.log(e);
  }

  render() {
    if (this.state.menu === "dashboard")
      return (
        <React.Fragment>
          <HomeBO onChangeMenu={this.onChangeMenu}>{() => <Dasboard />}</HomeBO>
        </React.Fragment>
      );

    if (this.state.menu === "productos")
      return (
        <React.Fragment>
          <HomeBO onChangeMenu={this.onChangeMenu}>
            {() => <Productos />}
          </HomeBO>
        </React.Fragment>
      );

    return <div></div>;
  }
}

export default Home;
