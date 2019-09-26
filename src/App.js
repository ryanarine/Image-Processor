import React, { Component } from "react";
import "./App.css";
import Tools from "./Tools";
import { changeImgData } from "./ToolFunctions";

class App extends Component {
  constructor() {
    super();
    this.state = { imgData: null, newData: null, x1: 0, x2: 0, y1: 0, y2: 0 };
    this.imageChange = this.imageChange.bind(this);
    this.download = this.download.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.swapImage = this.swapImage.bind(this);
    this.replace = this.replace.bind(this);
    this.recentre = this.recentre.bind(this);
  }

  imageChange(event) {
    const file = event.target.files[0];
    if (file) {
      let img = new Image();
      const reader = new FileReader();
      reader.onload = read => {
        img.onload = imgEvent => {
          var canvas = document.createElement("canvas");
          let img = imgEvent.target;
          let width = img.width;
          let height = img.height;
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(img, 0, 0, width, height);
          let imgData = canvas.getContext("2d").getImageData(0, 0, width, height);
          this.setState({ imgData }, this.loadImage);
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
    event.target.value = "";
  }

  loadImage() {
    var canvas = document.getElementById("canvas");
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    const ctx = canvas.getContext("2d");
    canvas = document.getElementById("newCanvas");
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    ctx.putImageData(this.state.imgData, 0, 0);
    // copy image data into other canvas
    this.swapImage(false);
  }

  swapImage(copyNew) {
    if (this.state.imgData) {
      let [canvasName, imgFile] = copyNew ? ["canvas", this.state.newData] : ["newCanvas", this.state.imgData];
      const ctx = document.getElementById(canvasName).getContext("2d");
      ctx.putImageData(imgFile, 0, 0);
      let data = new Uint8ClampedArray(imgFile.data);
      let copy = new ImageData(data, imgFile.width, imgFile.height);
      copyNew ? this.setState({ imgData: copy, x1: 0, y1: 0 }) : this.setState({ newData: copy, x2: 0, y2: 0 });
    }
  }

  replace(file, oldVal, newVal, tolerance) {
    if (file) {
      changeImgData(this.state.imgData, file, oldVal, newVal, tolerance);
      var canvas2 = document.getElementById("newCanvas").getContext("2d");
      canvas2.putImageData(file, 0, 0);
    }
  }

  // Download new image
  download() {
    const link = document.getElementById("download");
    if (this.state.imgData) {
      var canvas = document.createElement("canvas");
      canvas.width = this.state.imgData.width;
      canvas.height = this.state.imgData.height;
      var ctx = canvas.getContext("2d");
      ctx.putImageData(this.state.newData, 0, 0);
      link.setAttribute("href", canvas.toDataURL());
      link.click();
    }
  }

  recentre(event) {
    let canvas = event.target;
    if (this.state.imgData && (this.state.imgData.width > canvas.width || this.state.imgData.height > canvas.height)) {
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let x = canvas.id === "canvas" ? this.state.x1 : this.state.x2;
      let y = canvas.id === "canvas" ? this.state.y1 : this.state.y2;
      let imgData = canvas.id === "canvas" ? this.state.imgData : this.state.newData;
      let half = canvas.width / 2;
      let point = [x + event.clientX - canvas.offsetLeft - half, y + event.clientY - canvas.offsetTop - half];
      point[0] = point[0] < 0 ? 0 : point[0];
      point[0] = point[0] > imgData.width - canvas.width ? imgData.width - canvas.width : point[0];
      point[0] = imgData.width < canvas.width ? 0 : point[0];
      point[1] = point[1] < 0 ? 0 : point[1];
      point[1] = point[1] > imgData.height - canvas.height ? imgData.height - canvas.height : point[1];
      point[1] = imgData.width < canvas.width ? 0 : point[1];
      canvas.id === "canvas" ? this.setState({ x1: point[0], y1: point[1] }) : this.setState({ x2: point[0], y2: point[1] });
      let [width1, height1] = [imgData.width, imgData.height];
      let [width2, height2] = [width1 - point[0], height1 - point[1]];
      let data = new Uint8ClampedArray(width2 * height2 * 4);
      for (let row = 0; row < height2; row++) {
        for (let col = 0; col < width2; col++) {
          for (let val = 0; val < 4; val++) {
            data[row * width2 * 4 + col * 4 + val] =
              imgData.data[(point[1] + row) * width1 * 4 + (point[0] + col) * 4 + val];
          }
        }
      }
      imgData = new ImageData(data, width2, height2);
      ctx.putImageData(imgData, 0, 0);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="grid">
          <label>Old Preview</label>
          <label>New Preview</label>
          <div className="transparent">
            <canvas id="canvas" onClick={this.recentre}></canvas>
          </div>
          <div className="transparent">
            <canvas id="newCanvas" onClick={this.recentre}></canvas>
          </div>
          <input id="upload" type="file" onChange={this.imageChange} hidden />
          <button onClick={() => document.getElementById("upload").click()}>Upload Image</button>
          <button onClick={this.download}>Download</button>
          <button onClick={() => this.swapImage(true)}>Copy new into old</button>
          <button onClick={() => this.swapImage(false)}>Copy old into new</button>
        </div>
        <a id="download" href="/" style={{ display: "none" }} download="converted">
          Download
        </a>
        <Tools replace={this.replace} file={this.state.newData} />
      </div>
    );
  }
}

export default App;
