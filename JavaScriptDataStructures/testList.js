var container = document.getElementById("testList");

var para = document.createElement("p");
var test = new Logger(para);
container.appendChild(para);

var arr = [1, 2, 3];
test.log("Testing creation by List by array (" + arr + "): ");
var list = new List(0, arr);
test.log("list = " + list);

container.appendChild(test.elem = document.createElement("p"));
list.append(3);
test.log("Append (3): " + list);

container.appendChild(test.elem = document.createElement("p"));
list.prepend(-1);
test.log("Prepend (-1): " + list);

container.appendChild(test.elem = document.createElement("p"));
test.log("length: " + list.length);

container.appendChild(test.elem = document.createElement("p"));
test.log("elementAt: [0]=" + list.elementAt(0) + " [5]=" + list.elementAt(5) + " [2]=" + list.elementAt(2));
try {
    test.log(" [-1]=");
    test.log(list.elementAt(-1));
} catch (e) {
    test.log(e.message);
}

container.appendChild(test.elem = document.createElement("p"));
test.log("indexOf: -1=" + list.indexOf(-1) + " 0=" + list.indexOf(0) + "10=" + list.indexOf(10) + "'blah'=" + list.indexOf('blah') + " 3=" + list.indexOf(3));

container.appendChild(test.elem = document.createElement("p"));
test.log("lastIndexof: -1=" + list.lastIndexOf(-1) + " 0=" + list.lastIndexOf(0) + " 10=" + list.lastIndexOf(10) + "'blah'=" + list.indexOf('blah') + " 3=" + list.lastIndexOf(3));

container.appendChild(test.elem = document.createElement("p"));
list.push(4);
test.log("push(4):" + list + " pop()=" + list.pop() + " pop()=" + list.pop() + " finally: " + list);

// container.appendChild(test.elem = document.createElement("p"));
// list.forEachNode(function(item) {
//    test.log(item + ","); 
// });

container.appendChild(test.elem = document.createElement("p"));
list.reverse();
test.log("reversed (odd length): " + list);
list.reverse();
test.log("un-reversed: " + list);
list.push(4);
list.reverse()
test.log("reversed (even length): " + list);
list.reverse();
test.log("un-reversed: " + list);


container.appendChild(test.elem = document.createElement("p"));
container.appendChild(test.elem = document.createElement("p"));
container.appendChild(test.elem = document.createElement("p"));
container.appendChild(test.elem = document.createElement("p"));
