import React, { Component } from "react";
import { connect } from "react-redux";
import { basicImgEffect } from "./Actions/toolActions";

class Lighten extends Component {
  constructor() {
    super();
    this.state = { val: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    let val = event.target.value;
    if (!isNaN(val) && val >= 0 && val <= 500) {
      val = Number(Number(val).toFixed());
      this.setState({ val });
    }
  }

  handleClick() {
    this.props.basicImgEffect("BRIGHT", [this.props.multiplier(this.state.val)]);
  }

  render() {
    let text = this.props.text || "Lighten";
    return (
      <React.Fragment>
        <button onClick={this.handleClick}> {text}</button>
        <input type="text" value={this.state.val} onChange={this.handleChange} style={{ width: "25px" }} />
        <label>%</label>
      </React.Fragment>
    );
  }
}

export default connect(
  () => ({}),
  { basicImgEffect }
)(Lighten);
