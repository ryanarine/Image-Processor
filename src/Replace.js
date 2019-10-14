import React, { Component } from "react";
import { connect } from "react-redux";
import { switchSample, basicImgEffect, section } from "./Actions/toolActions";

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
    this.replace = this.replace.bind(this);
    this.section = this.section.bind(this);
    this.click = this.click.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  onChange(event) {
    let value = Number(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 255) {
      value = Number(value.toFixed());
      let state = { [event.target.name]: value };
      this.setState(state);
    }
  }

  static getDerivedStateFromProps(props, prevState) {
    if (props.pixel) {
      let pixel = props.pixel;
      if (prevState.pixel && prevState.pixel[4] === pixel[4] && prevState.pixel[5] === pixel[5]) {
        return null;
      }
      return { fcr: pixel[0], fcg: pixel[1], fcb: pixel[2], fca: pixel[3], pixel };
    }
    return null;
  }

  replace(event) {
    event.preventDefault();
    let state = this.state;
    let oldVal = [state.fcr, state.fcg, state.fcb, state.fca];
    let newVal = [state.rcr, state.rcg, state.rcb, state.rca];
    let tolerance = [state.tcr, state.tcg, state.tcb, state.tca];
    this.props.basicImgEffect("REPLACE", [oldVal, newVal, tolerance]);
  }

  click(event) {
    event.preventDefault();
    this.props.switchSample();
  }

  section(event) {
    event.preventDefault();
    let pixel = this.props.pixel;
    let state = this.state;
    if (pixel && pixel[0] === state.fcr && pixel[1] === state.fcg && pixel[2] === state.fcb && pixel[3] === state.fca) {
      let newVal = [state.rcr, state.rcg, state.rcb, state.rca];
      let tolerance = [state.tcr, state.tcg, state.tcb, state.tca];
      this.props.section(newVal, tolerance);
    } else {
      alert("You must first specify a section to paint. Click the cursor icon and then click on an area of the canvas.");
    }
  }

  // Helps the user navigate the input boxes using arrow keys
  navigate(event) {
    let key = event.which;
    if (key >= 37 && key <= 40) {
      let parent = event.target.parentElement;
      if (parent.id !== "replaceGrid") {
        return;
      }
      let name = event.target.name;
      let start = name[0];
      let end = name[2];
      let num = start === "f" ? 1 : start === "r" ? 2 : 3;
      num += end === "r" ? 0 : end === "g" ? 3 : end === "b" ? 6 : 9;
      if (key === 37) {
        // Left
        num -= event.target.selectionStart === 0 ? 1 : num;
      } else if (key === 38) {
        // Up
        num -= 3;
      } else if (key === 39) {
        // Right
        num += event.target.selectionStart === event.target.value.length ? 1 : 12;
      } else {
        // Down
        num += 3;
      }
      if (num >= 1 && num <= 12) {
        parent[num].focus();
      }
    }
  }

  render() {
    return (
      <form id="replaceGrid" className="replaceGrid" onKeyDown={this.navigate}>
        <label></label>
        <span>
          <label>Find</label>
          <button onClick={this.click} title="Click section on canvas" className="infoTool">
            <i id="clickIcon">&nbsp;&nbsp;&nbsp;&nbsp;</i>
          </button>
        </span>
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
        <div id="replaceBtns">
          <button onClick={this.replace}>Replace Colour</button>
          <button onClick={this.section}>Replace Section Colour</button>
        </div>
      </form>
    );
  }
}

export default connect(
  state => ({
    pixel: state.pixel
  }),
  { switchSample, basicImgEffect, section }
)(Replace);
