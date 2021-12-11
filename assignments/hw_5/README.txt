This README.txt document will serve as the "complete write-up" which was mentioned in the assignment PDF.


Contact Info:
John (Jack) O'Neill
John_ONeill@student.uml.edu


Included are:
css: Folder for style sheets
	style.css: Primary stylesheet for the document
data: Folder with all assets found in graphics_data.zip
js: Folder for JavaScripts
	main.js: Primary JavaScript for the document
index.html: The html document for this assignment
README.txt: Contains all pertinent info related to this assignment. You're reading it right now!


Implemented features:
Letter tiles in the player’s “hand” are selected randomly from a data structure with the proper distribution of the letters.

Letter tiles can be dragged-and-dropped onto target Scrabble squares.

My program identifies which letter tile is dropped onto which Scrabble square.

The board includes at two bonus squares.

The game's score is tallied correctly, including consideration of bonus square multipliers.

Any number of words can be played until the player wishes to quit or depletes all tiles.

The board is cleared after each round so that a new word can be played.

After playing a word, only the number of letter tiles needed to bring the player’s hand back to 7 tiles are selected.

Score is kept for multiple words until the user restart a new game (implement next vs. restart).

Tiles can only be dragged from the “rack” to Scrabble board. If the user drops them anywhere else, they will be bounced back to the “rack”.

Once the tile is placed on the Scrabble board, it can be moved back to the “rack”.

Except for the first letter, all sub-subsequent letters must be placed directly next another letter with no space. At least two letters must be placed on the board. Invalid layouts do not cause letters to bounce back to the rack. Instead, the layout is deemed invalid and the word cannot be submitted. This method of error handling is the only difference between my code and the PDF's rubric, although it serves the same function.

The user can always restart the game.


Extra credit:
I did not complete any of the extra credit items, not for lack of wanting to but simply for lack of time (I do have other final projects).

The assignment was fun though, and I'm glad I did it!
