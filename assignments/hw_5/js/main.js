/*
	File: main.js
	GUI Assignment: Implementing a Bit of Scrabble with Drag-and-Drop
	Description:  An exercise to gain you additional experience
	working with the jQuery UI and to pull together much of what we’ve
	been doing throughout the semester by implementing a bit of the
	game of Scrabble using drag-and-drop.
	John (Jack) O'Neill, UMass Lowell, John_ONeill@student.uml.edu
	Copyright (c) 2021 by John. All rights reserved. May be freely copied or
	excerpted for educational purposes with credit to the author.
	updated by JO on December 11, 2021 at 5:19 AM
*/

// Initialize globals
var active_letter = "Z";
var active_slot = 1;
var score = 0;
var hi_score = 0;

var slot0_score = 0;
var slot1_score = 0;
var slot2_score = 0;
var slot3_score = 0;
var slot4_score = 0;
var slot5_score = 0;
var slot6_score = 0;

var transient_score = 0;
var letters = [];
var letters_left = [];
var g_count = 0;

const vowel_indices =  [0, 4, 8, 14, 20];

// I decided to hardcode the JSON into my JavaScript file
// I also modified its structure to make it easier to access
const pieces =
	[
	{letter:"A", value:1, amount:9},
	{letter:"B", value:3, amount:2},
	{letter:"C", value:3, amount:2},
	{letter:"D", value:2, amount:4},
	{letter:"E", value:1, amount:12},
	{letter:"F", value:4, amount:2},
	{letter:"G", value:2, amount:3},
	{letter:"H", value:4, amount:2},
	{letter:"I", value:1, amount:9},
	{letter:"J", value:8, amount:1},
	{letter:"K", value:5, amount:1},
	{letter:"L", value:1, amount:4},
	{letter:"M", value:3, amount:2},
	{letter:"N", value:1, amount:5},
	{letter:"O", value:1, amount:8},
	{letter:"P", value:3, amount:2},
	{letter:"Q", value:10, amount:1},
	{letter:"R", value:1, amount:6},
	{letter:"S", value:1, amount:4},
	{letter:"T", value:1, amount:6},
	{letter:"U", value:1, amount:4},
	{letter:"V", value:4, amount:2},
	{letter:"W", value:4, amount:2},
	{letter:"X", value:8, amount:1},
	{letter:"Y", value:4, amount:2},
	{letter:"Z", value:10, amount:1}
	];
	
// These for loops populate lists of letters and their counts
for (index in pieces) {
	letters.push(pieces[index].letter);
}
for (index in pieces) {
	letters_left.push(pieces[index].amount);
}

// We run the code to populate the user's hand
// Populate runs make_droppable() from within
$(document).ready(function() {
	
	populate();
	
});

// This function mainly populates the code
// It does checks to abide by remaining letters
// Also ensures the user has 1 vowel to avoid a softlock
function populate(){
	var blockholders_holder = document.getElementById("blocks");
	var blockholders = blockholders_holder.getElementsByClassName('blockholder');
	// Make sure users get 1 mandatory vowel, english needs vowels.
	var vowel_status = 0;
	for (let i = 0; i < blockholders.length; i++){
		var curent = blockholders[i];
		// The code in this if statement only runs on an empty slot
		if(!(curent.getElementsByClassName('block')[0])){
			var first_rolled = 0;
			var first_vowel_index = 0;
			var vowel_index = 0;
			if(vowel_status == 0){
				first_vowel_index = rand_int(0, 5);
				vowel_index = first_vowel_index;
				first_rolled = vowel_indices[vowel_index];
			}
			else
				var first_rolled = (rand_int(0, 26));
			var index = first_rolled;
			// Code for if the selected letter has no remaining uses
			// Will iterate over letter list until none are left
			// If a vowel is needed, searches vowels first
			while(letters_left[index] == 0){
				//console.log("Iterate until char is found");
				if(vowel_status == 0){
					if(vowel_index >= 4){
						vowel_index = 0;
						index = vowel_indices[vowel_index];
						//console.log("V1");
					}
					else{
						vowel_index += 1;
						index = vowel_indices[vowel_index];
						//console.log("V2");
					}
					if (index == first_rolled){
						vowel_status = -1;
						console.log("No vowels remaining!");
						//console.log("V3");
					}
				}
				if(index >= 25){
					index = 0;
					//console.log("C1");
				}
				else{
					index += 1;
					//console.log("C2");
				}
				if (index == first_rolled){
					console.log("No letters remaining!");
					//console.log("C3");
					// Once last block is placed, make remaining blocks droppable
					make_droppable();
					return;
				}
			}
			// If statement not necessary, just nice to denote the difference
			if (vowel_status != -1)
				vowel_status = 1;
			
			// This section will not be reached if no letters remain
			var chosen_letter = letters[index];
			letters_left[index] -= 1;
			curent.innerHTML = `<div id="${g_count}" class="${chosen_letter} block"><img src="data/tiles/Scrabble_Tile_${chosen_letter}.jpg"></div>`;
			current_block = curent.getElementsByClassName('block')[0];
			g_count += 1;
		}
	}
	// Once hand is filled, make each block droppable
	make_droppable();
	return;
}

// The rand_int function is a modified version of Mozilla's implementation
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Thank you, Mozilla!
function rand_int(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
}

// A function you can run to see remaining letter counts
// You can run it from your browser's console to get a live count!
function debug_letter_amount(){
	for (index in letters) {
		console.log(`${letters[index]}: ${letters_left[index]}`)
	}
}

// Function goes over each slot and checks their respective values
// The score is properly tallied accounting for double tiles
// Then tile validity is checked through check_validity()
function checkscore(){
	// There is likely a prettier, more functional way to do this
	// I manually check each slot, but would prefer a for loop
	// However, this implementation works, so I won't fix it
	// Maybe something to improve on for next time!
	var doubles_count = 0;
	var is_doubled = 1;
	var index = -1;
	var current = document.getElementById("slot-0");
	slot0_score = 0;
	if (current.getElementsByClassName('block')[0]){
		confirmblock(current);
		var filteredRes = pieces.find(function(item, i){
			if(item.letter == active_letter){
				index = i;
				return i;
			}
		});
		if (index == -1)
			slot0_score = 0;
		else {
			slot0_score = (pieces[index].value);
			if (active_slot == 2)
				doubles_count += 1;
		}
	}
	
	index = -1;
	current = document.getElementById("slot-1");
	slot1_score = 0;
	if (current.getElementsByClassName('block')[0]){
		confirmblock(current);
		var filteredRes = pieces.find(function(item, i){
			if(item.letter == active_letter){
				index = i;
				return i;
			}
		});
		if (index == -1)
			slot1_score = 0;
		else {
			slot1_score = (pieces[index].value);
			if (active_slot == 2)
				doubles_count += 1;
		}
	}
	
	index = -1;
	current = document.getElementById("slot-2");
	slot2_score = 0;
	if (current.getElementsByClassName('block')[0]){
		confirmblock(current);
		var filteredRes = pieces.find(function(item, i){
			if(item.letter == active_letter){
				index = i;
				return i;
			}
		});
		if (index == -1)
			slot2_score = 0;
		else {
			slot2_score = (pieces[index].value);
			if (active_slot == 2)
				doubles_count += 1;
		}
	}
	
	index = -1;
	current = document.getElementById("slot-3");
	slot3_score = 0;
	if (current.getElementsByClassName('block')[0]){
		confirmblock(current);
		var filteredRes = pieces.find(function(item, i){
			if(item.letter == active_letter){
				index = i;
				return i;
			}
		});
		if (index == -1)
			slot3_score = 0;
		else {
			slot3_score = (pieces[index].value);
			if (active_slot == 2)
				doubles_count += 1;
		}
	}
	
	index = -1;
	current = document.getElementById("slot-4");
	slot4_score = 0;
	if (current.getElementsByClassName('block')[0]){
		confirmblock(current);
		var filteredRes = pieces.find(function(item, i){
			if(item.letter == active_letter){
				index = i;
				return i;
			}
		});
		if (index == -1)
			slot4_score = 0;
		else {
			slot4_score = (pieces[index].value);
			if (active_slot == 2)
				doubles_count += 1;
		}
	}
	
	index = -1;
	current = document.getElementById("slot-5");
	slot5_score = 0;
	if (current.getElementsByClassName('block')[0]){
		confirmblock(current);
		var filteredRes = pieces.find(function(item, i){
			if(item.letter == active_letter){
				index = i;
				return i;
			}
		});
		if (index == -1)
			slot5_score = 0;
		else {
			slot5_score = (pieces[index].value);
			if (active_slot == 2)
				doubles_count += 1;
		}
	}
	
	index = -1;
	current = document.getElementById("slot-6");
	slot6_score = 0;
	if (current.getElementsByClassName('block')[0]){
		confirmblock(current);
		var filteredRes = pieces.find(function(item, i){
			if(item.letter == active_letter){
				index = i;
				return i;
			}
		});
		if (index == -1)
			slot6_score = 0;
		else {
			slot6_score = (pieces[index].value);
			if (active_slot == 2)
				doubles_count += 1;
		}
	}
	
	// Now having validated the status of all board slots, tally the score and display it
	// Distinctions are made between empty boards, invalid layouts, and valid layouts
	// check_validity() returns 0 for false and 1 for true, which modifies transient_score
	var word_validity = check_validity();
	transient_score = (slot0_score + slot1_score + slot2_score + slot3_score + slot4_score + slot5_score + slot6_score) * Math.pow(2, doubles_count);
	if(transient_score != 0){
		transient_score = transient_score * word_validity;
		document.getElementById("stat1").innerHTML = `Score: ${score} + ${transient_score}`;
	}
	else if(transient_score == 0){
		transient_score = transient_score * word_validity;
		document.getElementById("stat1").innerHTML = `Score: ${score}`;
	}
	make_droppable();
	return;
}

// This function checks board validity across two factors:
// Words must be at least two characters in length
// Words can start on any slot but must not be separated by a space
// If these two axioms are valid, it returns 1, else 0
// If validity is assured, the next button is enabled, else disabled
function check_validity(){
	var valid = true;
	var block_count = 0;
	var list = [slot0_score, slot1_score, slot2_score, slot3_score, slot4_score, slot5_score, slot6_score];
	var tripped = false;
	var spaced = false;
	var temp_score = 0;
	
	// This for loop iterates over all slots and updates variables
	// Will ensure more two or more letters with no spaces
	for (let i = 0; i <= 6; i++){
		if (list[i] != 0)
			block_count += 1;
		temp_score = list[i];
		if(tripped == false && temp_score == 0){
			tripped == false;
		}
		else if(tripped == false && temp_score != 0){
			tripped = true;
		}
		else if(tripped == true && temp_score == 0){
			spaced = true;
		}
		else if(spaced == true && temp_score != 0){
			valid = false;
		}
	}
	
	if(block_count < 2)
		valid = false;
	
	if(valid){
		document.getElementById("next").disabled = false;
		return 1;
	}
	else{
		document.getElementById("next").disabled = true;
		return 0;
	}
}

// Will validate current slot's value and double status
function confirmblock(parent){
	if (parent.classList.contains('double')){
		active_slot = 2;
	}
	else{
		active_slot = 1;
	}
	
	block = parent.querySelector('.block')
	
	for (letter in letters) {
		if (block.classList.contains(letters[letter])){
			active_letter = letters[letter];
			return;
		}
	}
}

// Handles the process of moving to the next word
// It first adds your temporary score to your total score and displays it
// Next it removes all blocks from the slots
// Then it applies a new high score if applicable
// Finally it repopulates the player's hand and disables the next button
function apply_score(){
	score += transient_score;
	transient_score = 0;
	document.getElementById("stat1").innerHTML = `Score: ${score}`;
	remove_blocks(document.getElementById("slot-0"));
	remove_blocks(document.getElementById("slot-1"));
	remove_blocks(document.getElementById("slot-2"));
	remove_blocks(document.getElementById("slot-3"));
	remove_blocks(document.getElementById("slot-4"));
	remove_blocks(document.getElementById("slot-5"));
	remove_blocks(document.getElementById("slot-6"));
	if(score > hi_score){
		hi_score = score;
		document.getElementById("stat2").innerHTML = `High Score: ${hi_score}`
	}
	populate();
	document.getElementById("next").disabled = true;
	return;
}

// Given an element, it will remove the first block childElementCount
// Since any element should have only one block child, this clears its block
function remove_blocks(current){
	//console.log(current);
	var block = current.getElementsByClassName('block');
	if(block[0])
		block[0].remove()
	return;
}

// Code to apply the drag functionality to blocks
// Allows blocks to be dropped into slots or the player's hand
function make_droppable(){
	
	$('.block').draggable({
		helper: "clone",
		containment: "document",
		revert: "true",
		drag: function(event, ui){
			return;
		}
	});
	
	// For the two droppable properties I needed setInterval() to wait for elements
	// I learned of this method using Mozilla's MDN Web Docs as well
	// See: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
	// Thanks again, Mozilla!
	$('.slot').droppable({

		accept: ".block",
		drop: function(event, ui){
			if((this.getElementsByClassName('block')[0])){
				return;
			}
			var block = $(ui.draggable);
			var holder = $(this).append(block);
			holder.append(block);
			// JavaScript often operates asynchronously, meaning it gets ahead of itself
			// waitForBlock waits until a block is placed before checking the slots' values
			var waitForBlock = setInterval(function() {
				if ($(this).length) {
					checkscore();
					// This stops the check after it's verified
					timer_kill_self(waitForBlock);
				}
			}, 100);
			return;
		}
		
	});
	
	$('.blockholder').droppable({

		accept: ".block",
		drop: function(event, ui){
			if((this.getElementsByClassName('block')[0])){
				return;
			}
			var block = $(ui.draggable);
			var holder = $(this).append(block);
			holder.append(block);
			var waitForBlock = setInterval(function() {
				if ($(this).length) {
					checkscore();
					timer_kill_self(waitForBlock);
				}
			}, 100);
			return;
		}
		
	});

}

// Some functions wait for elements to be written to the page
// When the elements are written, checks should not be necessary
// This function kills a given interval function, removing the timer
function timer_kill_self(timer){
	clearInterval(timer);
}

// This function aims to refresh every known element of the game
// This is called whenever the "New Game" button is pressed
function restart(){
	slot0_score = 0;
	slot1_score = 0;
	slot2_score = 0;
	slot3_score = 0;
	slot4_score = 0;
	slot5_score = 0;
	slot6_score = 0;
	
	transient_score = 0;
	score = 0;
	
	active_letter = "Z";
	active_slot = 1;
	
	transient_score = 0;
	letters_left = [];
	for (index in pieces) {
		letters_left.push(pieces[index].amount);
	}
	g_count = 0;
	
	remove_blocks(document.getElementById("slot-0"));
	remove_blocks(document.getElementById("slot-1"));
	remove_blocks(document.getElementById("slot-2"));
	remove_blocks(document.getElementById("slot-3"));
	remove_blocks(document.getElementById("slot-4"));
	remove_blocks(document.getElementById("slot-5"));
	remove_blocks(document.getElementById("slot-6"));
	remove_blocks(document.getElementById("blockholder-0"));
	remove_blocks(document.getElementById("blockholder-1"));
	remove_blocks(document.getElementById("blockholder-2"));
	remove_blocks(document.getElementById("blockholder-3"));
	remove_blocks(document.getElementById("blockholder-4"));
	remove_blocks(document.getElementById("blockholder-5"));
	remove_blocks(document.getElementById("blockholder-6"));
	
	document.getElementById("stat1").innerHTML = `Score: ${score}`;

	populate();
	document.getElementById("next").disabled = true;
	return;
}
