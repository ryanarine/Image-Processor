import React, { Component } from "react";

const btnStyle = {
  display: "block",
  margin: "10px auto"
};

class Section extends Component {
  constructor() {
    super();
    this.state = {
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
    let pixel = this.props.pixel ? this.props.pixel : [0, 0, 0, 0, 0, 0];
    return (
      <form onSubmit={e => this.props.submit(e, this.state)} className="sectionGrid">
        <label></label>
        <span>
          <label>Find</label>
          <i id="clickIcon" onClick={this.props.click} title="Click section on canvas">
            &nbsp;&nbsp;&nbsp;&nbsp;
          </i>
        </span>
        <label>Replace</label>
        <label>Tolerance</label>
        <label>Red:</label>
        <label>{pixel[0]}</label>
        <input type="text" value={this.state.rcr} onChange={e => this.onChange(e)} name="rcr" />
        <input type="text" value={this.state.tcr} onChange={e => this.onChange(e)} name="tcr" />
        <label>Green:</label>
        <label>{pixel[1]}</label>
        <input type="text" value={this.state.rcg} onChange={e => this.onChange(e)} name="rcg" />
        <input type="text" value={this.state.tcg} onChange={e => this.onChange(e)} name="tcg" />
        <label>Blue:</label>
        <label>{pixel[2]}</label>
        <input type="text" value={this.state.rcb} onChange={e => this.onChange(e)} name="rcb" />
        <input type="text" value={this.state.tcb} onChange={e => this.onChange(e)} name="tcb" />
        <label>Alpha:</label>
        <label>{pixel[3]}</label>
        <input type="text" value={this.state.rca} onChange={e => this.onChange(e)} name="rca" />
        <input type="text" value={this.state.tca} onChange={e => this.onChange(e)} name="tca" />
        <label>X:</label>
        <label>{pixel[4]}</label>
        <label id="sectionBlank"></label>
        <label>Y:</label>
        <label>{pixel[5]}</label>
        <button id="sectionBtn" style={btnStyle} type="submit">
          Replace Section Colour
        </button>
      </form>
    );
  }
}

export default Section;
