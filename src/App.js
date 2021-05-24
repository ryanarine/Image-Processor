import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setImgData,
  setFileName,
  refresh,
  center,
  updatePixel,
  basicImgEffect,
  swap,
  switchSample
} from "Actions/toolActions";
import { sampleColour } from "Actions/replaceActions";
import Tools, { SimpleTools } from "Components/Tools";
import "./Styles/App.css";
import Canvas from "Components/Canvas";
import { Download, Upload } from "Components/PreviewButtons";

class App extends Component {
  // Fires when a new image is uploaded
  imageChange = event => {
    const file = event.target.files[0];
    if (file) {
      let img = new Image();
      const reader = new FileReader();
      reader.onload = read => {
        img.onload = imgEvent => {
          // Get image data
          var canvas = document.createElement("canvas");
          let img = imgEvent.target;
          let width = img.width;
          let height = img.height;
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(img, 0, 0, width, height);
          let imgData = canvas.getContext("2d").getImageData(0, 0, width, height);

          // Draw image onto canvases
          canvas = document.getElementById("canvas");
          canvas.width = canvas.scrollWidth;
          canvas.height = canvas.scrollHeight;
          const ctx = canvas.getContext("2d");
          canvas = document.getElementById("newCanvas");
          canvas.width = canvas.scrollWidth;
          canvas.height = canvas.scrollHeight;
          this.props.setImgData(false, imgData).then(() => {
            ctx.putImageData(this.props.imgData, 0, 0, 0, 0, canvas.scrollWidth, canvas.scrollHeight);
            // copy image data into other canvas
            this.props.swap(true);
          });

          // refresh state
          this.props.refresh();
        };

        let filedata = read.target.result;
        if (filedata.startsWith("data:image")) {
          img.src = filedata;
          this.props.setFileName(file.name.substring(0, file.name.lastIndexOf(".")));
        } else {
          alert("That file type is not supported");
        }
      };
      reader.readAsDataURL(file);
    }
    // Prevent file name from appearing
    //let name = event.target.value.substr(event.target.value.lastIndexOf("\\") + 1);
    event.target.value = "";
  };

  // Download new image
  download = type => {
    if (this.props.imgData) {
      const link = document.createElement("a");
      const canvas = document.createElement("canvas");
      canvas.width = this.props.imgData.width;
      canvas.height = this.props.imgData.height;
      const ctx = canvas.getContext("2d");
      ctx.putImageData(this.props.newData, 0, 0);
      link.setAttribute("href", canvas.toDataURL(`image/${type}`));
      link.setAttribute("download", `${this.props.fileName}-converted`);
      link.click();
      link.remove();
      canvas.remove();
    }
  };

  render() {
    return (
      <div className="container" id={"container"}>
        <div className="grid">
          <label>Old Preview</label>
          <label>New Preview</label>

          <Canvas canvasId="canvas" />
          <Canvas canvasId="newCanvas" />

          <Upload change={this.imageChange} />
          <Download download={this.download} />
        </div>

        <Tools />
        <SimpleTools />
      </div>
    );
  }

  // No need to rerender since the canvas rerenders on its own
  shouldComponentUpdate() {
    return false;
  }
}

export default connect(state => ({ ...state.image }), {
  setImgData,
  setFileName,
  refresh,
  center,
  updatePixel,
  basicImgEffect,
  swap,
  switchSample,
  sampleColour
})(App);
