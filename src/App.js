import React, { Component } from "react";
import "./App.css";
import Tools from "./Tools";

class App extends Component {
  constructor() {
    super();
    this.state = { imgData: null, newData: null };
    this.imageChange = this.imageChange.bind(this);
    this.download = this.download.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.swapImage = this.swapImage.bind(this);
    this.changeImgData = this.changeImgData.bind(this);
    this.replace = this.replace.bind(this);
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
      copyNew ? this.setState({ imgData: copy }) : this.setState({ newData: copy });
    }
  }

  /*
  -file1 and file2 are both ImageData objects
  -oldVal and newVal are pixels (rgba values in an array)
  -tolerance is an rgba range
  searches the pixels in file1 looking for a match with oldVal within the given tolerance range.
  corresponding pixels in file2 that were matched are changed to newVal
  corresponding pixels in file2 that were unmatched are changed to the unmatched pixel
  */
  changeImgData(file1, file2, oldVal, newVal, tolerance) {
    let match = false;
    let imgData1 = file1.data;
    let imgData2 = file2.data;
    for (let i = 0; i < imgData1.length; i += 4) {
      match = true;
      for (let offset = 0; offset < 4; offset++) {
        match = match && Math.abs(imgData1[i + offset] - oldVal[offset]) <= tolerance[offset];
      }
      if (match) {
        for (let offset = 0; offset < 4; offset++) {
          imgData2[i + offset] = newVal[offset];
        }
      } else {
        for (let offset = 0; offset < 4; offset++) {
          imgData2[i + offset] = imgData1[i + offset];
        }
      }
    }
  }

  replace(file, oldVal, newVal, tolerance) {
    if (file) {
      this.changeImgData(this.state.imgData, file, oldVal, newVal, tolerance);
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

  render() {
    return (
      <div className="container">
        <div className="grid">
          <label>Old Preview</label>
          <label>New Preview</label>
          <div className="transparent" style={{ width: "400px", height: "400px" }}>
            <canvas id="canvas" style={{ width: "400px", height: "400px" }}></canvas>
          </div>
          <div className="transparent" style={{ width: "400px", height: "400px" }}>
            <canvas id="newCanvas" style={{ width: "400px", height: "400px" }}></canvas>
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
