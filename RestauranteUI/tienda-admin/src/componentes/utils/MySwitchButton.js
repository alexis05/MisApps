import React, { Component } from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

class MySwitchButton extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    console.log(this.props.checked);
    if (this.props.checked) {
      this.state = { checked: true };
    } else {
      this.state = { checked: false };
    }
  }

  handleChange(checked) {
    this.setState({ checked }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  }

  handleClick(checked) {
    this.setState({ checked }, () => {
      if (this.props.onClick) {
        this.props.onClick(this.state);
      }
    });
  }

  render() {
    return (
      <BootstrapSwitchButton
        onstyle="outline-primary"
        offstyle="outline-secondary"
        size="sm"
        checked={this.state.checked}
        onlabel="Si"
        offlabel="No"
        onClick={this.handleClick}
        onChange={this.handleChange}
      />
    );
  }
}

export default MySwitchButton;
