import React, { Component } from "react";
import { connect } from "react-redux";
import { colours, columnInitials } from "constants.js";
import { store } from "index";
import { switchSample, basicImgEffect, section } from "Actions/toolActions";
import { updateOption, updateInput, sampleColour } from "Actions/replaceActions";
import { Find, Replace, Tolerance } from "Components/Inputs";

class ReplaceTool extends Component {
  constructor() {
    super();
    this.replace = this.replace.bind(this);
    this.section = this.section.bind(this);
    this.navigate = this.navigate.bind(this);
    this.copy = this.copy.bind(this);
  }

  getStateValues = () => {
    const state = this.props;
    const { cc: comparisons, fc: oldVal, fp: percentages, oc: operators, rc, tc: tolerance } = state;
    const newVal = rc.map((value, index) =>
      operators[index] === "*" || operators[index] === "/" ? value / 100 + 1 : value
    );
    return { comparisons, oldVal, percentages, operators, newVal, tolerance };
  };

  replace() {
    const { comparisons, oldVal, percentages, operators, newVal, tolerance } = this.getStateValues();
    this.props.basicImgEffect("REPLACE", [comparisons, oldVal, percentages, operators, newVal, tolerance]);
  }

  section() {
    const { comparisons, oldVal, percentages, operators, newVal, tolerance } = this.getStateValues();
    this.props.section(comparisons, oldVal, percentages, operators, newVal, tolerance);
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

  copy() {
    const pixel = store.getState().image.pixel;
    if (pixel) {
      this.props.sampleColour(pixel[0], pixel[1], pixel[2], pixel[3]);
    } else {
      alert("You must specify a pixel first. Click on the cursor icon and then click on a pixel on the canvas to do so");
    }
  }

  render() {
    const frt = colours.map((colour, index) => (
      <React.Fragment>
        <Find key={"fc" + colour} index={index} isAlpha={index === colours.length - 1} />
        <Replace key={"rc" + colour} index={index} />
        <Tolerance key={"tc" + colour} index={index} />
      </React.Fragment>
    ));
    return (
      <form id="replaceGrid" className="replaceGrid" onKeyDown={this.navigate} autoComplete="off">
        <label></label>
        <span>
          <label>Find</label>
          <button
            onClick={() => this.props.switchSample("PIXEL")}
            type="button"
            title="Specify a section on the canvas by clicking on a pixel within that section"
            className="infoTool"
          >
            <i id="clickIcon">&nbsp;&nbsp;&nbsp;&nbsp;</i>
          </button>
          <button
            onClick={() => this.props.switchSample("COLOUR")}
            type="button"
            title="Sample a pixel's colour off one of the canvases"
            className="infoTool"
          >
            <i id="dropperIcon">&nbsp;&nbsp;&nbsp;&nbsp;</i>
          </button>
          <button
            type="button"
            onClick={this.copy}
            title="Copy the selected pixel's colour to the inputs"
            className="infoTool"
          >
            <i id="mouseDropperIcon">&nbsp;&nbsp;&nbsp;&nbsp;</i>
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

export default connect(state => ({ ...state.replace }), {
  switchSample,
  basicImgEffect,
  section,
  updateOption,
  updateInput,
  sampleColour
})(ReplaceTool);
