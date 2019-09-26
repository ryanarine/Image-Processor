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
