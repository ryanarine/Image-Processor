# Image-Processor
This application is an image processing tool that can change the contents of an image in many ways. <br>
You can view this application [here](https://ryanarine.github.io/Image-Processor/).

## Goals
This application is not finished so there are still some things I have yet to implement (this is a growing list): <br>
-Use Redux for state management (The state is currently scattered all over the place) <br>
-Zoomable canvas <br>
-Improved support for replacing colour (Ex: decrease and increase the red and blue values respectively within a section by a specified amount) <br>
-Undo/Redo

## Demos
Below are some demo GIFs showing off certain features (The background colours are deformed since GIFs only support 256 colours)

### Replacing Colour
In this GIF, I am replacing the pure white pixels in an image of Chess pieces with pure yellow pixels
![Loading...](RC.gif)
### Replacing Colour with a Tolerance Range
Some white pixels were left over because they weren't pure white. I fix this by adding a tolerance range. Now any pixel with an RGBA value in the range (245-255, 245-255, 245-255, 245-255) will be replaced with a pure yellow pixel, leaving no white spots
![Loading...](RCT.gif)
### Replacing Colour within a Section
In this GIF, I want to make the white background transparent. I first replace all the white pixels with a transparent pixel (alpha value of 0), but this causes the white pieces to also be transparent. To fix this I use the replace section colour tool by first clicking on the background in the canvas. The application will then search the pixels surrounding the pixel I clicked on to identify what pixels belong to the section I selected. I then also select a section within the Queen piece to show this doesn't only work on the background.
![Loading...](RCS.gif)
### Other Tools
In this GIF, I show off the Grayscale, Negative, Lighten and Darken tool. The latter two tools can be applied repeatedly.
![Loading...](OT.gif)
