import React, { Component } from "react";
import "./Replace.css";

const btnStyle = {
  display: "block",
  margin: "10px auto"
};

class Replace extends Component {
  constructor() {
    super();
    this.state = {
      fcr: 255,
      fcg: 255,
      fcb: 255,
      fca: 255,
      rcr: 255,
      rcg: 255,
      rcb: 255,
      rca: 255,
      tcr: 10,
      tcg: 10,
      tcb: 10,
      tca: 10
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    let value = Number(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 255) {
      let state = { [event.target.name]: value };
      this.setState(state);
    }
  }

  render() {
    return (
      <form onSubmit={e => this.props.submit(this.state, e)}>
        <div className="replaceGrid">
          <label></label>
          <label>Find</label>
          <label>Replace</label>
          <label>Tolerance</label>
          <label>Red:</label>
          <input type="text" value={this.state.fcr} onChange={e => this.onChange(e)} name="fcr" />
          <input type="text" value={this.state.rcr} onChange={e => this.onChange(e)} name="rcr" />
          <input type="text" value={this.state.tcr} onChange={e => this.onChange(e)} name="tcr" />
          <label>Green:</label>
          <input type="text" value={this.state.fcg} onChange={e => this.onChange(e)} name="fcg" />
          <input type="text" value={this.state.rcg} onChange={e => this.onChange(e)} name="rcg" />
          <input type="text" value={this.state.tcg} onChange={e => this.onChange(e)} name="tcg" />
          <label>Blue:</label>
          <input type="text" value={this.state.fcb} onChange={e => this.onChange(e)} name="fcb" />
          <input type="text" value={this.state.rcb} onChange={e => this.onChange(e)} name="rcb" />
          <input type="text" value={this.state.tcb} onChange={e => this.onChange(e)} name="tcb" />
          <label>Alpha:</label>
          <input type="text" value={this.state.fca} onChange={e => this.onChange(e)} name="fca" />
          <input type="text" value={this.state.rca} onChange={e => this.onChange(e)} name="rca" />
          <input type="text" value={this.state.tca} onChange={e => this.onChange(e)} name="tca" />
        </div>
        <button style={btnStyle} type="submit">
          Replace Colour
        </button>
      </form>
    );
  }
}

export default Replace;
