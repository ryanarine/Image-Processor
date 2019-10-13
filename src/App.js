import React, { Component } from "react";
import { connect } from "react-redux";
import { setImgData, refresh, updatePoint, updatePixel, basicImgEffect, swap } from "./Actions/toolActions";
import Tools from "./Tools";
import SimpleTools from "./SimpleTools";
import "./Styles/App.css";
import Upload from "./Upload";
import Download from "./Download";

class App extends Component {
  constructor() {
    super();
    this.imageChange = this.imageChange.bind(this);
    this.download = this.download.bind(this);
    this.recentre = this.recenter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // Fires when a new image is uploaded
  imageChange(event) {
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
        } else {
          alert("That file type is not supported");
        }
      };
      reader.readAsDataURL(file);
    }
    // Prevent file name from appearing
    //let name = event.target.value.substr(event.target.value.lastIndexOf("\\") + 1);
    event.target.value = "";
  }

  // Download new image
  download() {
    const link = document.getElementById("download");
    if (this.props.imgData) {
      var canvas = document.createElement("canvas");
      canvas.width = this.props.imgData.width;
      canvas.height = this.props.imgData.height;
      var ctx = canvas.getContext("2d");
      ctx.putImageData(this.props.newData, 0, 0);
      link.setAttribute("href", canvas.toDataURL());
      link.click();
    }
  }

  // Center the image on canvas to the clicked point
  recenter(event) {
    let canvas = event.target;
    if (this.props.imgData && (this.props.imgData.width > canvas.width || this.props.imgData.height > canvas.height)) {
      let ctx = canvas.getContext("2d");
      let [x, y, imgData] =
        canvas.id === "canvas"
          ? [this.props.x1, this.props.y1, this.props.imgData]
          : [this.props.x2, this.props.y2, this.props.newData];
      let half = canvas.width / 2;

      // x/y + pageX/pageY + offsetLeft/offsetTop = x/y coordinate of clicked point
      // Subtract by half to get the top left coordinate if clicked point was the center
      let point = [x + event.pageX - canvas.offsetLeft - half, y + event.pageY - canvas.offsetTop - half];
      // Compensate for boundaries
      if (imgData.width < canvas.width || point[0] < 0) {
        point[0] = 0;
      } else {
        point[0] = point[0] > imgData.width - canvas.width ? imgData.width - canvas.width : point[0];
      }
      if (imgData.height < canvas.height || point[1] < 0) {
        point[1] = 0;
      } else {
        point[1] = point[1] > imgData.height - canvas.height ? imgData.height - canvas.height : point[1];
      }

      // Recenter image if the center point has changed
      if (point[0] !== x || point[1] !== y) {
        // Update state
        this.props.updatePoint(canvas.id === "newCanvas", point[0], point[1]);
        // Construct the recentered image data
        let [width1, height1] = [imgData.width, imgData.height];
        let [width2, height2] = [width1 - point[0], height1 - point[1]];
        // Construct only the parts we need
        width2 = Math.min(canvas.width, width2);
        height2 = Math.min(canvas.height, height2);
        let data = new Uint8ClampedArray(width2 * height2 * 4);
        // Copy the image data
        for (let row = 0; row < height2; row++) {
          for (let col = 0; col < width2; col++) {
            for (let val = 0; val < 4; val++) {
              data[row * width2 * 4 + col * 4 + val] =
                imgData.data[(point[1] + row) * width1 * 4 + (point[0] + col) * 4 + val];
            }
          }
        }
        // Draw image
        imgData = new ImageData(data, width2, height2);
        ctx.putImageData(imgData, 0, 0);
      }
    }
  }

  handleClick(event) {
    if (this.props.imgData && this.props.sample && event.target.id === "canvas") {
      let canvas = event.target;
      let point = [event.pageX - canvas.offsetLeft + this.props.x1, event.pageY - canvas.offsetTop + this.props.y1];
      if (point[0] >= 0 && point[0] <= this.props.imgData.width && point[1] >= 0 && point[1] <= this.props.imgData.height) {
        let r = this.props.imgData.data[point[1] * this.props.imgData.width * 4 + point[0] * 4];
        let g = this.props.imgData.data[point[1] * this.props.imgData.width * 4 + point[0] * 4 + 1];
        let b = this.props.imgData.data[point[1] * this.props.imgData.width * 4 + point[0] * 4 + 2];
        let a = this.props.imgData.data[point[1] * this.props.imgData.width * 4 + point[0] * 4 + 3];
        let pixel = [r, g, b, a, point[0], point[1]];
        this.props.updatePixel(pixel);
      }
    } else if (this.props.sample) {
      this.props.updatePixel();
    } else {
      this.recenter(event);
    }
  }

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

export default connect(
  state => ({ ...state }),
  { setImgData, refresh, updatePoint, updatePixel, basicImgEffect, swap }
)(App);
