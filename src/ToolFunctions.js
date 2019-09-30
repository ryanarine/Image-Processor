/*
  -file1 and file2 are both ImageData objects
  -oldVal and newVal are pixels (rgba values in an array)
  -tolerance is an rgba range
  searches the pixels in file1 looking for a match with oldVal within the given tolerance range.
  corresponding pixels in file2 that were matched are changed to newVal
  corresponding pixels in file2 that were unmatched are changed to the unmatched pixel
  */
export function changeImgData(file1, file2, oldVal, newVal, tolerance) {
  let match = false;
  let imgData1 = file1.data;
  let imgData2 = file2.data;
  for (let i = 0; i < imgData1.length; i += 4) {
    match = isMatch([imgData1[i], imgData1[i + 1], imgData1[i + 2], imgData1[i + 3]], oldVal, tolerance);
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
/*
  -Image is an ImageData objects
  -pixel ([r,g,b,a,x,y]) is a pixel in Image containing its x and y coordinate
  -tolerance is an rgba range
  -Returns an array of pixel indices that corresponds to a section in Image originating at pixel with the given tolerance range
*/
export function getSection(Image, pixel, tolerance) {
  let [width, height, data] = [Image.width, Image.height, Image.data];
  // Adjacent offsets of pixels starting from 0 deg bearing going clockwise
  let adjacent = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
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

// returns true if the two pixels are similar enough according to the tolerance range
export function isMatch(pixel1, pixel2, tolerance) {
  let match = true;
  for (let offset = 0; offset < 4; offset++) {
    match = match && Math.abs(pixel1[offset] - pixel2[offset]) <= tolerance[offset];
  }
  return match;
}
