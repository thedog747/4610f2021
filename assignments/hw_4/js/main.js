var table = document.getElementById("table_mult");
var lrow = Math.floor(document.getElementsByName("lrow")[0].value);
var hrow = Math.floor(document.getElementsByName("hrow")[0].value);
var lcol = Math.floor(document.getElementsByName("lcol")[0].value);
var hcol = Math.floor(document.getElementsByName("hcol")[0].value);



function makeTable() {
	
	validate();
	
	if (!($("#mform").valid())){
		
		return;
		
	}
	
	lrow = Math.floor(document.getElementsByName("lrow")[0].value);
	hrow = Math.floor(document.getElementsByName("hrow")[0].value);
	lcol = Math.floor(document.getElementsByName("lcol")[0].value);
	hcol = Math.floor(document.getElementsByName("hcol")[0].value);
	
	if ((lrow > hrow) || (lcol > hcol)){
		document.getElementById("debug5").innerHTML = "Invalid table: Low bound cannot exceed high bound";
		return;
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

$.validator.addMethod('loe',
	function(value, element, params){
		return (value <= $(params).val());
	});

function validate(){

	$("#mform").validate({
		
		rules: {
			
			lrow: {
				number: true,
				min: -12,
				max: 12,
				required: true,
				loe: "#hrow"
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
				loe: "#hcol"
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
				loe: "Low bound cannot exceed high bound."
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
				loe: "Low bound cannot exceed high bound."
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
