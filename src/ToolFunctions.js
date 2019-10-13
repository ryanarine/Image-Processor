/*
  -data is an array of pixels
  -oldVal and newVal are pixels (rgba values in an array)
  -tolerance is an rgba range
  searches the pixels in data looking for a match with oldVal within the given tolerance range.
  matched pixels get changed to newVal
  */
export function changeImgData(data, oldVal, newVal, tolerance) {
  let match = false;
  for (let i = 0; i < data.length; i += 4) {
    match = isMatch([data[i], data[i + 1], data[i + 2], data[i + 3]], oldVal, tolerance);
    if (match) {
      for (let offset = 0; offset < 4; offset++) {
        data[i + offset] = newVal[offset];
      }
    }
  }
}

/*
  -Image is an ImageData objects
  -pixel ([r,g,b,a,x,y]) is a pixel in Image containing its x and y coordinate
  -tolerance is an rgba range
  -Returns an array of pixel indices that corresponds to a section in Image originating at pixel with the given tolerance range
*/
export function getSection(Image, pixel, tolerance) {
  let [width, height, data] = [Image.width, Image.height, Image.data];
  // Adjacent offsets of pixels (Up, Right, Down, Left)
  let adjacent = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  // visited[i] indicates whether pixel i has been added to the frontier before
  let visited = new Array(width * height);
  // The array of pixels to return
  let section = [];
  let oldColour = [pixel[0], pixel[1], pixel[2], pixel[3]];
  let [x, y] = [pixel[4], pixel[5]];
  // The array of pixels that need to be checked if they belong to the section
  let frontier = [[x, y]];
  visited[y * width + x] = true;
  while (frontier.length !== 0) {
    [x, y] = frontier.pop();
    // Check if pixel has valid coordinates
    if (x < 0 || x > width || y < 0 || y > height) {
      continue;
    }
    // Get the colour of the pixel
    let colour = [];
    for (let offset = 0; offset < 4; offset++) {
      colour.push(data[y * width * 4 + x * 4 + offset]);
    }
    // Check that the pixel colour is a match
    if (isMatch(colour, oldColour, tolerance)) {
      // Add pixel to section
      section.push(y * width * 4 + x * 4);
      // Add adjacent pixels to frontier
      // eslint-disable-next-line
      adjacent.forEach(adj => {
        // If they have not been added before
        if (!visited[(y + adj[1]) * width + x + adj[0]]) {
          visited[(y + adj[1]) * width + x + adj[0]] = true;
          frontier.push([x + adj[0], y + adj[1]]);
        }
      });
    }
  }
  return section;
}

// Grayscales the image data
export function grayscale(data) {
  let avg = 0;
  for (let i = 0; i < data.length; i += 4) {
    avg = Math.round((data[i] + data[i + 1] + data[i + 2]) / 3);
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
}

// Negates the image data
export function negative(data) {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
}

// Change the light intensity of the data by the given multiplier
export function lighten(data, mult) {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i] * mult > 255 ? 255 : data[i] * mult;
    data[i + 1] = data[i + 1] * mult > 255 ? 255 : data[i + 1] * mult;
    data[i + 2] = data[i + 2] * mult > 255 ? 255 : data[i + 2] * mult;
  }
}

// returns true if the two pixels are similar enough according to the tolerance range
export function isMatch(pixel1, pixel2, tolerance) {
  let match = true;
  for (let offset = 0; offset < 4; offset++) {
    match = match && Math.abs(pixel1[offset] - pixel2[offset]) <= tolerance[offset];
  }
  return match;
}
