import React, { Component } from "react";
import "./App.css";
import Tools from "./Tools";

class App extends Component {
  constructor() {
    super();
    this.state = { img: null, imgData: null };
    this.imageChange = this.imageChange.bind(this);
    this.download = this.download.bind(this);
    this.loadImage = this.loadImage.bind(this);
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
          this.setState({ img, imgData }, this.loadImage);
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
    const canvas = document.getElementById("canvas");
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    const ctx = canvas.getContext("2d");
    const canvas2 = document.getElementById("newCanvas");
    canvas2.width = canvas2.scrollWidth;
    canvas2.height = canvas2.scrollHeight;
    const ctx2 = canvas2.getContext("2d");
    ctx.drawImage(this.state.img, 0, 0, this.state.imgData.width, this.state.imgData.height);
    ctx2.drawImage(this.state.img, 0, 0, this.state.imgData.width, this.state.imgData.height);
  }

  changeImgData(file, oldVal, newVal, tolerance) {
    let equal = false;
    let imgData = file.data;
    for (let i = 0; i < imgData.length; i += 4) {
      equal = true;
      for (let offset = 0; offset < 4; offset++) {
        equal = equal && Math.abs(imgData[i + offset] - oldVal[offset]) <= tolerance[offset];
      }
      if (equal) {
        for (let offset = 0; offset < 4; offset++) {
          imgData[i + offset] = newVal[offset];
        }
      }
    }
  }

  replace(file, oldVal, newVal, tolerance) {
    if (file) {
      this.changeImgData(file, oldVal, newVal, tolerance);
      var canvas2 = document.getElementById("newCanvas").getContext("2d");
      canvas2.putImageData(file, 0, 0);
    }
  }

  download() {
    const link = document.getElementById("download");
    if (this.state.img) {
      var canvas = document.createElement("canvas");
      canvas.width = this.state.imgData.width;
      canvas.height = this.state.imgData.height;
      var ctx = canvas.getContext("2d");
      ctx.putImageData(this.state.imgData, 0, 0);
      link.setAttribute("href", canvas.toDataURL());
      link.click();
    }
  }

  render() {
    return (
      <div>
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
        </div>
        <a id="download" href="#" style={{ display: "none" }} download="converted"></a>
        <Tools replace={this.replace} file={this.state.imgData} />
      </div>
    );
  }
}

export default App;
