
<h2>Demo Instructions:</h2>

All the scripts are linked in the demo.html file. They're all commented out by default, except for the Snake. See demo.html for 
instructions on which scripts to uncomment in order to test the different demos. 

<h3>A-Star:</h3>

A* is a pathfinding algorithm that's guaranteed to find the shortest possible path between two points.

Click a square to place your start node. 
Then press the '2' key and click another square to place your end node.
To add obstacles, press the '3' key and then draw on the board by holding down the left mouse button
When you're ready, press the 'G' key and the computer will find the shortest path between the start and end nodes. 

<h3>Game of Life:</h3> 

  The game of life is a cellular automoton invented by mathemitican Jon Conway.

  Click squares on the board to light them up. Then press G and see what happens. You can press H to pause the game
  and G to start it going again. You can also press the J key to move ahead one step. 

<h3>Snake:</h3> 

What's there to say? It's snake. Use the WASD keys to move around, and don't hit the sides. 

<h2>Using the Grid Graph</h2>

This section will be expanded soon. Right now the gridgraph paints divs to the screen for every cell, which is obviously inefficient and 
suits very few use cases. Before I write out the usage instructions, I want to make it so that it just creates the grid as a data structure,
leaving it up to the user how it's actually drawn. 
