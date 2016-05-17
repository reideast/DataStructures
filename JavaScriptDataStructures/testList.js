function logNodes() {
    container.appendChild(test.elem = document.createElement("p"));
    list.forEachNode(function(item) {
        test.log(item + ","); 
    });
    test.log("HEAD=" + list.getHead + " TAIL=" + list.getTail);
}

var container = document.getElementById("testList");

var para = document.createElement("p");
var test = new Logger(para);
container.appendChild(para);

test.log("Testing creation of List by items (1, 2, 3, 4, 5): ");
var list = new List(1, 2, 3, 4, 5);
test.log("list = " + list);
// logNodes();

container.appendChild(test.elem = document.createElement("p"));
var arr = [1, 2, 3];
test.log("Testing creation of List by a single array ([" + arr + "]): ");
list = new List(arr);
test.log("list = " + list);
// logNodes();

container.appendChild(test.elem = document.createElement("p"));
test.log("Testing creation of List by a concat(new List(3,2,1)): ");
list = new List();
list.concat(new List(3,2,1));
test.log("list = " + list);
// logNodes();

container.appendChild(test.elem = document.createElement("p"));
test.log("Testing creation of empty List (): ");
list = new List();
test.log("list = " + list);
// logNodes();

container.appendChild(test.elem = document.createElement("p"));
var b = ["a", "b", "c"];
test.log("Testing creation of List by a scalar and two arrays (0, [" + arr + "], [" + b + "]): ");
list = new List(0, arr, b);
test.log("list = " + list);
logNodes();

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
try {
    test.log(" [2000]=");
    test.log(list.elementAt(2000));
} catch (e) {
    test.log(e.message);
}

container.appendChild(test.elem = document.createElement("p"));
test.log("indexOf: -1=" + list.indexOf(-1) + " 0=" + list.indexOf(0) + "10=" + list.indexOf(10) + "'blah'=" + list.indexOf('blah') + " 3=" + list.indexOf(3));
test.log("indexOf(3, 4+1)=" + list.indexOf(3, 4+1));
test.log("indexOf(3, -1)=" + list.indexOf(3, -1));
test.log("indexOf(3, -4)=" + list.indexOf(3, -4));
test.log("indexOf(3, -5)=" + list.indexOf(3, -5));

container.appendChild(test.elem = document.createElement("p"));
test.log("lastIndexof: -1=" + list.lastIndexOf(-1) + " 0=" + list.lastIndexOf(0) + " 10=" + list.lastIndexOf(10) + "'blah'=" + list.indexOf('blah') + " 3=" + list.lastIndexOf(3));

container.appendChild(test.elem = document.createElement("p"));
list.push(4);
test.log("push(4):" + list + " pop()=" + list.pop() + " pop()=" + list.pop() + " finally: " + list + " length=" + list.length);

container.appendChild(test.elem = document.createElement("p"));
list.unshift(-2);
test.log("unshift(-2):" + list + " shift()=" + list.shift() + " shift()=" + list.shift());
list.unshift(-1);
test.log(" unshift(-1):" + list + " length=" + list.length);

// logNodes();
container.appendChild(test.elem = document.createElement("p"));
list.reverse();
test.log("reversed (odd length): " + list);
list.reverse();
test.log(" un-reversed: " + list);
list.push(4);
list.reverse()
test.log(" reversed (even length): " + list);
list.reverse();
test.log(" un-reversed: " + list);
// logNodes();

container.appendChild(test.elem = document.createElement("p"));
test.log("(1, 4, 9).map(Math.sqrt)=" + (new List(1, 4, 9)).map(Math.sqrt));
test.log(" (1, 2, 3, 4, 5).map(squared)=" + (new List(1, 2, 3, 4, 5)).map(function(item) {return Math.pow(item, 2);}));

container.appendChild(test.elem = document.createElement("p"));
test.log("(1,2,3,4).reduce(prev + curr)=" + (new List(1, 2, 3, 4)).reduce(function(prev, item) { return prev + item; }));
test.log(" (1,2,3,4).reduce(prev * curr)=" + (new List(1, 2, 3, 4)).reduce(function(prev, item) { return prev * item; }));
test.log(" (1,2,3,4).reduce(prev * curr, inital=0)=" + (new List(1, 2, 3, 4)).reduce(function(prev, item) { return prev * item; },0));
test.log(" ('hello',' ','world').reduce(prev + curr)=" + (new List('hello',' ','world')).reduce(function(prev, item) { return prev + item; }));

container.appendChild(test.elem = document.createElement("p"));
test.log("Some(false, false, true, false)=" + (new List(false, false, true, false)).some(function(item) {return item;}));
test.log(" Some(false, false, false, false)=" + (new List(false, false, false, false)).some(function(item) {return item;}));
test.log(" every(true, true, true, true)=" + (new List(true, true, true, true)).every(function(item) {return item;}));
test.log(" every(true, false, true, true)=" + (new List(true, false, true, true)).every(function(item) {return item;}));

container.appendChild(test.elem = document.createElement("p"));
test.log("(1, 2, 3, 4, 5).filter(item % 2)=" + (new List(1, 2, 3, 4, 5)).filter(function(item) {return item % 2;} ));

container.appendChild(test.elem = document.createElement("p"));
test.log("(0, 1, 2, 3, 4, 5).slice(3)=" + (new List(0, 1, 2, 3, 4, 5)).slice(3));
test.log(" (0, 1, 2, 3, 4, 5).slice(-2)=" + (new List(0, 1, 2, 3, 4, 5)).slice(-2));
test.log(" (0, 1, 2, 3, 4, 5).slice(1,4)=" + (new List(0, 1, 2, 3, 4, 5)).slice(1,4));
test.log(" (0, 1, 2, 3, 4, 5).slice(2,-1)=" + (new List(0, 1, 2, 3, 4, 5)).slice(2,-1));


container.appendChild(test.elem = document.createElement("p"));
test.log("Spice from the middle:" );
list = new List(0, 1, 2, 3, 4, 5);
list.splice(2, 0);
test.log(" (0, 1, 2, 3, 4, 5).splice(2, 0)=" + list);
list = new List(0, 1, 2, 3, 4, 5);
list.splice(2, 1)
test.log(" (0, 1, 2, 3, 4, 5).splice(2, 1)=" + list);
list = new List(0, 1, 2, 3, 4, 5);
var del = list.splice(2, 2)
test.log(" (0, 1, 2, 3, 4, 5).splice(2, 2)=" + list + " (deleted items=" + del + ")");
list = new List(0, 1, 2, 3, 4, 5);
list.splice(2)
test.log(" (0, 1, 2, 3, 4, 5).splice(2)=" + list);

container.appendChild(test.elem = document.createElement("p"));
test.log("Spice from the head:" );
list = new List(0, 1, 2, 3, 4, 5);
list.splice(0, 0);
test.log(" (0, 1, 2, 3, 4, 5).splice(0, 0)=" + list);
list = new List(0, 1, 2, 3, 4, 5);
list.splice(0, 1)
test.log(" (0, 1, 2, 3, 4, 5).splice(0, 1)=" + list);
list = new List(0, 1, 2, 3, 4, 5);
del = list.splice(0, 2)
test.log(" (0, 1, 2, 3, 4, 5).splice(0, 2)=" + list + " (deleted items=" + del + ")");
list = new List(0, 1, 2, 3, 4, 5);
list.splice(0)
test.log(" (0, 1, 2, 3, 4, 5).splice(0)=" + list);

container.appendChild(test.elem = document.createElement("p"));
test.log("Spice starting from the tail:" );
list = new List(0, 1, 2, 3, 4, 5);
list.splice(5, 0);
test.log(" (0, 1, 2, 3, 4, 5).splice(5, 0)=" + list);
list = new List(0, 1, 2, 3, 4, 5);
list.splice(5, 1)
test.log(" (0, 1, 2, 3, 4, 5).splice(5, 1)=" + list);
list = new List(0, 1, 2, 3, 4, 5);
list.splice(5, 2)
test.log(" (0, 1, 2, 3, 4, 5).splice(5, 2)=" + list);
list = new List(0, 1, 2, 3, 4, 5);
del = list.splice(5)
test.log(" (0, 1, 2, 3, 4, 5).splice(5)=" + list + " (deleted items=" + del + ")");

container.appendChild(test.elem = document.createElement("p"));
test.log("Spice including tail:" );
list = new List(0, 1, 2, 3, 4, 5);
list.splice(3, 3);
test.log(" (0, 1, 2, 3, 4, 5).splice(3, 3)=" + list);
list = new List(0, 1, 2, 3, 4, 5);
list.splice(3, 4)
test.log(" (0, 1, 2, 3, 4, 5).splice(3, 4)=" + list);
list = new List(0, 1, 2, 3, 4, 5);
list.splice(0, 2)

container.appendChild(test.elem = document.createElement("p"));
test.log("Spice insert single:" );
list = new List(0, 1, 2);
list.splice(0, 0, 'foo');
test.log(" (0, 1, 2).splice(0, 0, 'foo')=" + list);
list = new List(0, 1, 2);
list.splice(1, 0, 'foo');
test.log(" (0, 1, 2).splice(1, 0, 'foo')=" + list);
list = new List(0, 1, 2);
list.splice(2, 0, 'foo');
test.log(" (0, 1, 2).splice(2, 0, 'foo')=" + list);
list = new List(0, 1, 2);
list.splice(3, 0, 'foo');
test.log(" (0, 1, 2).splice(3, 0, 'foo')=" + list);
list = new List(0, 1, 2);
list.splice(4, 0, 'foo');
test.log(" (0, 1, 2).splice(4, 0, 'foo')=" + list);

container.appendChild(test.elem = document.createElement("p"));
test.log("Spice insert list:" );
list = new List(0, 1, 2);
list.splice(0, 0, 'foo', 'bar', 'baz');
test.log(" (0, 1, 2).splice(0, 0, 'foo', 'bar', 'baz')=" + list);
list = new List(0, 1, 2);
list.splice(1, 0, 'foo', 'bar', 'baz');
test.log(" (0, 1, 2).splice(1, 0, 'foo', 'bar', 'baz')=" + list);
list = new List(0, 1, 2);
list.splice(2, 0, 'foo', 'bar', 'baz');
test.log(" (0, 1, 2).splice(2, 0, 'foo', 'bar', 'baz')=" + list);
list = new List(0, 1, 2);
list.splice(3, 0, 'foo', 'bar', 'baz');
test.log(" (0, 1, 2).splice(3, 0, 'foo', 'bar', 'baz')=" + list);
list = new List(0, 1, 2);
list.splice(4, 0, 'foo', 'bar', 'baz');
test.log(" (0, 1, 2).splice(4, 0, 'foo', 'bar', 'baz')=" + list);


container.appendChild(test.elem = document.createElement("p"));
test.log("Spice delete and insert:" );
list = new List(0, 1, 2, 3, 4, 5);
list.splice(2, 2, 'foo')
test.log(" (0, 1, 2, 3, 4, 5).splice(2, 2, 'foo')=" + list);
list = new List(0, 1, 2, 3, 4, 5);
list.splice(0, 2, 'foo')
test.log(" (0, 1, 2, 3, 4, 5).splice(0, 2, 'foo')=" + list);
list = new List(0, 1, 2, 3, 4, 5);
list.splice(0, 20, 'foo')
test.log(" (0, 1, 2, 3, 4, 5).splice(0, 20, 'foo')=" + list);
list = new List(0, 1, 2, 3, 4, 5);
list.splice(5, 2, 'foo')
test.log(" (0, 1, 2, 3, 4, 5).splice(5, 2, 'foo')=" + list);
list = new List(0, 1, 2, 3, 4, 5);
del = list.splice(3, 3, 'foo');
test.log(" (0, 1, 2, 3, 4, 5).splice(3, 3, 'foo')=" + list + " (deleted items=" + del + ")");