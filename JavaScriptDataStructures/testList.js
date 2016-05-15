var container = document.getElementById("testList");

var para = document.createElement("p");
var test = new Logger(para);
container.appendChild(para);

var arr = [0, 1, 2, 3];
test.log("Testing creation by List by array (" + arr + "): ");
var list = new List(0, arr);
test.log("list = " + list);

container.appendChild(test.elem = document.createElement("p"));
list.append(4);
test.log("Append (4): " + list);

container.appendChild(test.elem = document.createElement("p"));
list.prepend(-1);
test.log("Prepend (-1): " + list);

container.appendChild(test.elem = document.createElement("p"));
container.appendChild(test.elem = document.createElement("p"));
container.appendChild(test.elem = document.createElement("p"));
container.appendChild(test.elem = document.createElement("p"));
container.appendChild(test.elem = document.createElement("p"));
