/*
	File: main.js
	GUI Assignment: Using the jQuery Plugin/UI with Your Dynamic Table
	Description: Use JQuery validation and assosiated UI library
	to verify the veracity of values inputted into the form, and
	dynamically create the table while 
	John (Jack) O'Neill, UMass Lowell, John_ONeill@student.uml.edu
	Copyright (c) 2021 by John. All rights reserved. May be freely copied or
	excerpted for educational purposes with credit to the author.
	updated by JO on November 21, 2021 at 1:02 AM
*/

var tabcount = 0;
var table = document.getElementById("table_mult");
var lrow = Math.floor(document.getElementsByName("lrow")[0].value);
var hrow = Math.floor(document.getElementsByName("hrow")[0].value);
var lcol = Math.floor(document.getElementsByName("lcol")[0].value);
var hcol = Math.floor(document.getElementsByName("hcol")[0].value);

//initializes sliders
//slide function will refresh the table on slide change
$("#lrow_slider").slider({
	min: -12,
	max: 12,
	slide: function(e, ui) {
		$("#lrow").val(ui.value);
		makeTable();
	}
});

$("#hrow_slider").slider({
	min: -12,
	max: 12,
	slide: function(e, ui) {
		$("#hrow").val(ui.value);
		makeTable();
	}
});

$("#lcol_slider").slider({
	min: -12,
	max: 12,
	slide: function(e, ui) {
		$("#lcol").val(ui.value);
		makeTable();
	}
});

$("#hcol_slider").slider({
	min: -12,
	max: 12,
	slide: function(e, ui) {
		$("#hcol").val(ui.value);
		makeTable();
	}
});

//initializes tabs
$("#tabs").tabs();

makeTable();

newTab();

//when a new tab is created, jquery arbitrarily stores data inside of it for later use
function newTab() {
	tabcount = tabcount + 1;
	var new_tab = "<li class='ui-state-default ui-corner-top ui-state-active' id='tab-" + tabcount + "'><a>(" + lrow + "," + hrow + ")x(" + lcol + "," + hcol + ")</a><span class='ui-icon ui-icon-close'</span></li>";
	$("#tabs ul").append(new_tab);
	$('#tab-' + tabcount + '').data("lrow", lrow);
	$('#tab-' + tabcount + '').data("hrow", hrow);
	$('#tab-' + tabcount + '').data("lcol", lcol);
	$('#tab-' + tabcount + '').data("hcol", hcol);
	makeClickable();
}

//called every time a new tab is created, makes a tab click set input values and rebuild the table
function makeClickable(){
	$("#tabs ul li").on("click", function() {
		document.getElementsByName("lrow")[0].value = $(this).data("lrow");
		document.getElementsByName("hrow")[0].value = $(this).data("hrow");
		document.getElementsByName("lcol")[0].value = $(this).data("lcol");
		document.getElementsByName("hcol")[0].value = $(this).data("hcol");
		syncSlider()
		makeTable();
	});
	//allows the user to individually close all tabs
	$(".ui-icon-close").on("click", function() {
		$(this).closest("li").remove();
    });
}

//a button that clears multiple tabs, or to be more precise, all at once
function clearTabs(){
	$("#tabs ul li").remove();
}

//synchronizes the slider position with the input value
function syncSlider(){
		$("#lrow_slider").slider("value", document.getElementsByName("lrow")[0].value);
		$("#hrow_slider").slider("value", document.getElementsByName("hrow")[0].value);
		$("#lcol_slider").slider("value", document.getElementsByName("lcol")[0].value);
		$("#hcol_slider").slider("value", document.getElementsByName("hcol")[0].value);
}

//creates the table based on input values
function makeTable() {
	
	validate();
	
	if (!($("#mform").valid())){
		
		return;
		
	}
	
	//converts any possible float input to a comparable integer value
	lrow = Math.floor(document.getElementsByName("lrow")[0].value);
	hrow = Math.floor(document.getElementsByName("hrow")[0].value);
	lcol = Math.floor(document.getElementsByName("lcol")[0].value);
	hcol = Math.floor(document.getElementsByName("hcol")[0].value);
	
	//new code allows for high end to be less than low end (by way of swapping their values)
	if (lrow > hrow){
		let temp = lrow;
		lrow = hrow;
		hrow = temp;
	}
	if (lcol > hcol){
		let temp = lcol;
		lcol = hcol;
		hcol = temp;
	}
	
	//populate row&column range debug output
	document.getElementById("debug1").innerHTML = "R(" + lrow + ", ";
	document.getElementById("debug2").innerHTML = hrow + "),";
	document.getElementById("debug3").innerHTML = "C(" + lcol + ", ";
	document.getElementById("debug4").innerHTML = hcol + ")";
	document.getElementById("debug5").innerHTML = "Valid table.";
	
	//ensure previous table is wiped before new one is populated
	var row_count = table.rows.length;
	if (row_count != 0){
		var r;
		for (r = 0; r < row_count; r++){
			table.deleteRow(0);
		}
	}
	
	//make the top row first since it is formatted differently
	createRow(hrow, lrow, NaN);
	var p;
	for (p = 0; p <= (hcol - lcol); p++){
		createRow(hrow, lrow, p + (Math.sign(lcol) * Math.abs(lcol)));
	}
}

//code for creating rows of the table
function createRow(hrow, lrow, mult){
		var row = table.insertRow();
	var i;
	for (i = 0; i < hrow-lrow + 2; i++){
		if (i == 0){
			var head = document.createElement("th");
			head.innerHTML = (isNaN(mult) ? " " : mult);
			row.appendChild(head);
		}
		else{
			var head = document.createElement(isNaN(mult) ? "th" : "td");
			head.innerHTML = (((i - 1) + (Math.sign(lrow) * Math.abs(lrow))) * (isNaN(mult) ? 1 : mult));
			row.appendChild(head);
		}
		
	}
}

//makes sure that the form is valid
function validate(){

	$("#mform").validate({
		
		rules: {
			
			lrow: {
				number: true,
				min: -12,
				max: 12,
				required: true,
			},
			
			hrow: {
				number: true,
				min: -12,
				max: 12,
				required: true
			},
			
			lcol: {
				number: true,
				min: -12,
				max: 12,
				required: true,
			},
			
			hcol: {
				number: true,
				min: -12,
				max: 12,
				required: true
			}
		},
		
		messages:{
			lrow: {
				number: "Type error: Number value required.",
				min: "Min value error: Lowest value is -12.",
				max: "Max value error: Highest value is 12.",
				required: "Field required.",
			},
			hrow: {
				number: "Type error: Number value required.",
				min: "Min value error: Lowest value is -12.",
				max: "Max value error: Highest value is 12.",
				required: "Field required."
			},
			lcol: {
				number: "Type error: Number value required.",
				min: "Min value error: Lowest value is -12.",
				max: "Max value error: Highest value is 12.",
				required: "Field required.",
			},
			hcol: {
				number: "Type error: Number value required.",
				min: "Min value error: Lowest value is -12.",
				max: "Max value error: Highest value is 12.",
				required: "Field required."
			}
		}
		
	});
	
}
