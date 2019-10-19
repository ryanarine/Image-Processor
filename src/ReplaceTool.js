import React, { Component } from "react";
import { connect } from "react-redux";
import { switchSample, basicImgEffect, section } from "./Actions/toolActions";
import { updateOption, updateInput } from "./Actions/replaceActions";
import Find from "./Find";
import Replace from "./Replace";
import { colours, columnInitials } from "./Constants";
import Tolerance from "./Tolerance";

class ReplaceTool extends Component {
  constructor() {
    super();
    this.replace = this.replace.bind(this);
    this.section = this.section.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  replace() {
    let state = this.props;
    let comparisons = state.cc;
    let oldVal = state.fc;
    let operators = state.oc;
    let newVal = state.rc;
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === "*" || operators[i] === "/") {
        newVal[i] = newVal[i] / 100 + 1;
      }
    }
    let tolerance = state.tc;
    this.props.basicImgEffect("REPLACE", [comparisons, oldVal, operators, newVal, tolerance]);
  }

  section() {
    let state = this.props;
    let comparisons = state.cc;
    let oldVal = state.fc;
    let operators = state.oc;
    let newVal = state.rc;
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === "*" || operators[i] === "/") {
        newVal[i] = newVal[i] / 100 + 1;
      }
    }
    let tolerance = state.tc;
    this.props.section(comparisons, oldVal, operators, newVal, tolerance);
  }

  // Helps the user navigate the input boxes using arrow keys
  navigate(event) {
    let key = event.which;
    if (key >= 37 && key <= 40) {
      let parent = document.getElementById("replaceGrid");
      let name = event.target.name;
      if (!name) {
        return;
      }
      let row = colours.findIndex(val => val === name[2]);
      let col = columnInitials.findIndex(val => val === name[0]);
      if (key === 37) {
        // Left
        if (event.target.selectionStart !== 0) {
          return;
        }
        col = (col + columnInitials.length - 1) % columnInitials.length;
      } else if (key === 38) {
        // Up
        row = (row + colours.length - 1) % colours.length;
      } else if (key === 39) {
        // Right
        if (event.target.selectionStart !== event.target.value.length) {
          return;
        }
        col = (col + 1) % columnInitials.length;
      } else {
        // Down
        row = (row + 1) % colours.length;
      }
      let newName = columnInitials[col] + "c" + colours[row];
      parent[newName].focus();
      // Set cursor position
      var end = 0;
      if (key === 37 || key === 39) {
        end = key === 37 ? parent[newName].value.length : 0;
      } else {
        end = event.target.selectionStart;
      }
      // Use setTimeout so focus occurs first
      setTimeout(() => parent[newName].setSelectionRange(end, end), 0);
    }
  }

  render() {
    let frt = colours.map((colour, index) => (
      <React.Fragment>
        <Find key={"fc" + colour} index={index} />
        <Replace key={"rc" + colour} index={index} />
        <Tolerance key={"tc" + colour} index={index} />
      </React.Fragment>
    ));
    return (
      <form id="replaceGrid" className="replaceGrid" onKeyDown={this.navigate} autoComplete="off">
        <label></label>
        <span>
          <label>Find</label>
          <button onClick={this.props.switchSample} type="button" title="Click section on canvas" className="infoTool">
            <i id="clickIcon">&nbsp;&nbsp;&nbsp;&nbsp;</i>
          </button>
        </span>
        <label>Replace</label>
        <label>Tolerance</label>
        <label>Red:</label>
        {frt[0]}
        <label>Green:</label>
        {frt[1]}
        <label>Blue:</label>
        {frt[2]}
        <label>Alpha:</label>
        {frt[3]}
        <div id="replaceBtns">
          <button type="button" onClick={this.replace}>
            Replace Colour
          </button>
          <button type="button" onClick={this.section}>
            Replace Section Colour
          </button>
        </div>
      </form>
    );
  }
}

export default connect(
  state => ({ ...state.replace }),
  { switchSample, basicImgEffect, section, updateOption, updateInput }
)(ReplaceTool);
