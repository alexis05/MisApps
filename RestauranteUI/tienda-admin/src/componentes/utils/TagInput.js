import React, { Component } from "react";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";

class TagInput extends Component {
  constructor() {
    super();
    this.state = { tags: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(tags) {
    this.setState({ tags }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  }

  render() {
    const inputProp = {
      className: "react-tagsinput-input",
      placeholder: "Ej: Ropa",
    };

    return (
      <TagsInput
        value={this.state.tags}
        onChange={this.handleChange}
        inputProps={inputProp}
      />
    );
  }
}

export default TagInput;
