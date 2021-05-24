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
} from "./Actions/toolActions";
import { sampleColour } from "./Actions/replaceActions";
import Tools, { SimpleTools } from "Components/Tools";
import "./Styles/App.css";
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

  // Center the image on canvas to the clicked point
  recenter = event => {
    let canvas = event.target;
    if (this.props.imgData && (this.props.imgData.width > canvas.width || this.props.imgData.height > canvas.height)) {
      this.props.center(canvas, event.pageX, event.pageY);
    }
  };

  handleClick = event => {
    if (this.props.imgData && (this.props.pixelSample || this.props.colourSample)) {
      let canvas = event.target;
      let [ratioX, ratioY] = [canvas.width / canvas.scrollWidth, canvas.height / canvas.scrollHeight];
      let point = [
        Math.round((event.pageX - canvas.offsetLeft) * ratioX + this.props.x1),
        Math.round((event.pageY - canvas.offsetTop) * ratioY + this.props.y1)
      ];
      if (point[0] >= 0 && point[0] <= this.props.imgData.width && point[1] >= 0 && point[1] <= this.props.imgData.height) {
        let r = this.props.imgData.data[point[1] * this.props.imgData.width * 4 + point[0] * 4];
        let g = this.props.imgData.data[point[1] * this.props.imgData.width * 4 + point[0] * 4 + 1];
        let b = this.props.imgData.data[point[1] * this.props.imgData.width * 4 + point[0] * 4 + 2];
        let a = this.props.imgData.data[point[1] * this.props.imgData.width * 4 + point[0] * 4 + 3];
        if (this.props.pixelSample) {
          let pixel = [r, g, b, a, point[0], point[1]];
          this.props.updatePixel(pixel);
        } else {
          this.props.sampleColour(r, g, b, a);
        }
      }
    } else if (this.props.pixelSample) {
      this.props.switchSample("PIXEL");
      alert("You must upload an image first. Click the upload button to upload an image.");
    } else {
      this.recenter(event);
    }
  };

  render() {
    return (
      <div className="container" id={"container"}>
        <div className="grid">
          <label>Old Preview</label>
          <label>New Preview</label>

          <div className="transparent">
            <canvas id="canvas" onClick={this.handleClick}></canvas>
          </div>
          <div className="transparent">
            <canvas id="newCanvas" onClick={this.handleClick}></canvas>
          </div>

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
