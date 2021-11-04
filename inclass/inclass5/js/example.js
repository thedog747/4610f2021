var page = document.getElementById("page");
var header = document.getElementById("header");
var buy_groceries = header.nextSibling.nextSibling;
var id_1 = document.getElementById("one");
var id_2 = document.getElementById("two");
var id_3 = document.getElementById("three");
var id_4 = document.getElementById("four");

// ADD NEW ITEM TO END OF LIST

var after = document.createElement("li");
var text_after = document.createTextNode("cream");
after.appendChild(text_after);
id_4.parentNode.insertBefore(after, id_4.nextSibling);

// ADD NEW ITEM START OF LIST

var before = document.createElement("li");
var text_before = document.createTextNode("Kale");
before.appendChild(text_before);
id_1.parentNode.insertBefore(before, id_1);

// ADD A CLASS OF COOL TO ALL LIST ITEMS

class cool {
	constructor() {
		this.style.backgroundColor = "green";
	}
}

before.classList.add("cool");
id_1.classList.add("cool");
id_2.classList.add("cool");
id_3.classList.add("cool");
id_4.classList.add("cool");
after.classList.add("cool");

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING

var span = document.createElement("span");
var text_span = document.createTextNode(id_1.parentNode.getElementsByTagName("li").length);
span.appendChild(text_span);
buy_groceries.insertBefore(span, buy_groceries.childNodes[1]);
