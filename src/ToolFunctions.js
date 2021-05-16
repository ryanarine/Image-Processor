/**
 * Change the data of an image
 * @param {Uint8ClampedArray} data - Image data
 * @param {Array} comparisons - Comparison operators, each one is one of [=,>,>=,<,<=]
 * @param {Array} oldVal - A pixel or percentage to be matched against according to comparisons
 * @param {Array} percentages - Boolean array indicating whether to search for absolute or relative values
 * @param {Array} operators  - Mathematical operators, each one is one of [=,+,-,*,/]
 * @param {Array} newVal  - A pixel to be operated against according to operators
 * @param {Array} tolerance  - An rgba range
 */
export function changeImgData(data, comparisons, oldVal, percentages, operators, newVal, tolerance) {
  for (let i = 0; i < data.length; i += 4) {
    if (isMatch(comparisons, data.slice(i, i + 4), oldVal, percentages, tolerance)) {
      operate(operators, data, newVal, i);
    }
  }
}

/*
  -Image is an ImageData objects
  -pixel ([r,g,b,a,x,y]) is a pixel in Image containing its x and y coordinate
  -comparisons specify a comparison operator [=,>,>=,<,<=]
  -percentages is a boolean array indicating whether to search for absolute or relative values
  -tolerance is an rgba range (only used when the comparison operator is equality)
  -Returns an array of pixel indices that corresponds to a section in Image originating at pixel with the given tolerance range
*/
export function getSection(Image, pixel, comparisons, oldColour, percentages, tolerance) {
  let [width, height, data] = [Image.width, Image.height, Image.data];
  // Adjacent offsets of pixels (Up, Right, Down, Left)
  let adjacent = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
  ];
  // visited[i] indicates whether pixel i has been added to the frontier before
  let visited = new Array(width * height);
  // The array of pixels to return
  let section = [];
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
    if (isMatch(comparisons, colour, oldColour, percentages, tolerance)) {
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
    data[i] = data[i] * mult;
    data[i + 2] = data[i + 2] * mult;
    data[i + 1] = data[i + 1] * mult;
  }
}

// returns true if the pixel matches the search values according to the comparison option and the tolerance range
function isMatch(comparisons, pixel, search, percentages, tolerance) {
  let match = true;
  let compare;
  const totalValue = pixel.slice(0, 3).reduce((sum, val) => sum + val);
  const values = pixel.map((val, index) => (percentages[index] ? (val / totalValue) * 100 : val));
  for (let offset = 0; offset < 4; offset++) {
    compare = comparisons[offset];
    switch (compare) {
      case "=":
        match = match && Math.abs(values[offset] - search[offset]) <= tolerance[offset];
        break;
      case ">":
        match = match && values[offset] > search[offset];
        break;
      case ">=":
        match = match && values[offset] >= search[offset];

        break;
      case "<":
        match = match && values[offset] < search[offset];
        break;
      case "<=":
        match = match && values[offset] <= search[offset];
        break;
      default:
        alert("Something went terribly wrong. Please refresh the page and try again");
        return;
    }
  }
  return match;
}

// Change the pixel in data specified by index by applying the arithmetic operator on it and pixel2's values
export function operate(operators, data, pixel, index) {
  let operator = operators;
  for (let offset = 0; offset < 4; offset++) {
    operator = operators[offset];
    switch (operator) {
      case "=":
        data[index + offset] = pixel[offset];
        break;
      case "+":
        data[index + offset] += pixel[offset];
        break;
      case "-":
        data[index + offset] -= pixel[offset];
        break;
      case "*":
        data[index + offset] *= pixel[offset];
        break;
      case "/":
        data[index + offset] /= pixel[offset];
        break;
      default:
        alert("Something went terribly wrong. Please refresh the page and try again");
        return;
    }
  }
}
