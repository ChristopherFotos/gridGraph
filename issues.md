# particle reflection SOLVED

## description: 
when drawing on the screen, particles of a different type directly below the cursor may adopt the color of the cursor. They do not adopt the particle type, just the color. When drawing stone above particles, the newly drawn stone will adopt the color (and only the color) of particles. these changes persist. 

* drawing stone above stone will draw new stone on the stone below. the new stone does not persist

* drawing particles above particles will make some of the lower particles empty. the emptiness does not persist. 

* drawing stone above particle may turn the particle stone-colored. the change persists. 

* If a particle has been reflected, it will be reflected again. i.e., if a stone particle has had its color changed to red and you wave the eraser over it, it will always reflect the eraser. 

* if you draw particles under stone, the top layer of the stone may be reflected.

* the changes happen immediately, regardless of how far apart the cells are


## happens when (exhaustive):
* drawing particles and walls
* erasing



## DOES NOT happen when:
* random selection is not used to select colors from an array

## hypotheses:


# particle loss

## description: 
when particles are piled up in a u-shaped container and the bottom of the container is cut, 
there will be far fewer particles after the container has emptied. 

Also happens outside of u-shaped containers, it's just most noticeable in that context. It happens
any time you're erasing. if you lower the frame rate, click on some particles with the eraser, and 
then console log the amount of particles on screen every frame while the pile is falling, you'll 
see that it doesn't just erase the initial particles that were under the mouse click, it takes away
extra particles on every frame. 

## notes

* at some point a cell's state is being flipped from particle to false when it soundn't be. 
