import React, { Component } from "react";

class Lighten extends Component {
  constructor() {
    super();
    this.state = { val: 0 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let val = event.target.value;
    if (!isNaN(val) && val >= 0 && val <= 100) {
      val = Number(Number(val).toFixed());
      this.setState({ val });
    }
  }

  render() {
    let text = this.props.text || "Lighten";
    return (
      <React.Fragment>
        <button onClick={() => this.props.lighten(this.state.val)}> {text}</button>
        <input type="text" value={this.state.val} onChange={this.handleChange} style={{ width: "25px" }} />
        <label>%</label>
      </React.Fragment>
    );
  }
}

export default Lighten;
