testTree('testDiv'); //DEBUG

function testTree(testDiv) {
    function logNodes() {
        container.appendChild(test.elem = document.createElement("p"));
        tree.forEachNode(function (item) {
            test.log(item + ",");
        });
        test.log("ROOT=" + tree.getRoot);
    }

    var container = document.getElementById(testDiv);

    var para = document.createElement("p");
    var test = new Logger(para);
    container.appendChild(para);

    test.log("Testing creation of Tree by items (1, 2, 3, 4, 5): ");
    var tree = new Tree(1, 2, 3, 4, 5);
    test.log("tree = " + tree);
    // logNodes();

    container.appendChild(test.elem = document.createElement("p"));
    test.log("Testing creation of Tree with disorderd array [3, 1, 2, 4, 5]: ");
    tree = new Tree([3, 1, 2, 4, 5]);
    test.log("tree = " + tree);
    
    container.appendChild(test.elem = document.createElement("p"));
    arr = [];
    var limit = 100;
    for (var i = 0; i < limit; ++i) {
        arr.push(Math.floor(Math.random() * limit + 1));
    }
    test.log("Testing creation of Tree with very large random array [" + arr + "]: ");
    tree = new Tree(arr);
    test.log("tree = " + tree);
    
    container.appendChild(test.elem = document.createElement("p"));
    test.log("testing that sorted array does increase with each item:");
    var sorted = tree.toArray();
    var deltas = sorted.map(function(item, i, arr) {
        if (i == 0) {
            return ">";
        } else {
            if (item === arr[i - 1]) {
                return "0";
            } else if (item > arr[i - 1]) {
                return "^";
            } else {
                return "!!"
            }
        }
    });
    test.log(deltas);
    
    container.appendChild(test.elem = document.createElement("p"));
    test.log("testing searching array if a value exists (50): ");
    test.log(tree.exists(50));
    
    container.appendChild(test.elem = document.createElement("p"));
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.toString = function () {
        return this.name + " - " + this.age + " years";
    }
    var compareAges = function (a, b) {
        if (a.age < b.age) {
            return -1;
        }  else if (a.age > b.age) {
            return 1;
        } else {
            return 0;
        }
    };
    var people = [new Person("Rebecca", 32), new Person("Andrew", 30), new Person("Ruthi", 27)];
    var sortedPeople = new Tree(people, compareAges);
    var found = sortedPeople.find(32);
    test.log("Testing a custom compare function (sort by ages) with array: " + people);
    test.log(" Tree (sorted by age, ascending): " + sortedPeople);
    test.log(" Found Person with age == 32: " + found);
    
    
    container.appendChild(test.elem = document.createElement("p"));
    var arr = [14, 4, 5, 1, 16, 17, 10, 9, 20, 15];
    test.log("Testing creation of Tree with some random values [" + arr + "]: ");
    tree = new Tree(arr);
    tree.debugTree();
    test.log("tree = " + tree);
    
    container.appendChild(test.elem = document.createElement("p"));
    tree.delete(20);
    tree.debugTree();
    test.log("deleting leaf node (20): " + tree);
    tree.delete(14);
    tree.debugTree();
    test.log("deleting single-child node (14): " + tree);
    tree.delete(5);
    tree.debugTree();
    test.log("deleting double-child node (5): " + tree);
    
    // container.appendChild(test.elem = document.createElement("p"));
    // var arr = [1, 2, 3];
    // test.log("Testing creation of Tree by a single array ([" + arr + "]): ");
    // tree = new Tree(arr);
    // test.log("tree = " + tree);
    // // logNodes();

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("Testing creation of Tree by a concat(new Tree(3,2,1)): ");
    // tree = new Tree();
    // tree.concat(new Tree(3, 2, 1));
    // test.log("tree = " + tree);
    // // logNodes();

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("Testing creation of empty Tree (): ");
    // tree = new Tree();
    // test.log("tree = " + tree);
    // // logNodes();

    // container.appendChild(test.elem = document.createElement("p"));
    // var b = [ "a", "b", "c" ];
    // test.log("Testing creation of Tree by a scalar and two arrays (0, [" + arr + "], [" + b + "]): ");
    // tree = new Tree(0, arr, b);
    // test.log("tree = " + tree);
    // logNodes();

    // container.appendChild(test.elem = document.createElement("p"));
    // tree.append(3);
    // test.log("Append (3): " + tree);

    // container.appendChild(test.elem = document.createElement("p"));
    // tree.prepend(-1);
    // test.log("Prepend (-1): " + tree);

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("length: " + tree.length);

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("elementAt: [0]=" + tree.elementAt(0) + " [5]=" + tree.elementAt(5) + " [2]=" + tree.elementAt(2));
    // try {
    //     test.log(" [-1]=");
    //     test.log(tree.elementAt(-1));
    // } catch (e) {
    //     test.log(e.message);
    // }
    // try {
    //     test.log(" [2000]=");
    //     test.log(tree.elementAt(2000));
    // } catch (e) {
    //     test.log(e.message);
    // }

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("indexOf: -1=" + tree.indexOf(-1) + " 0=" + tree.indexOf(0) + "10=" + tree.indexOf(10) + "'blah'=" + tree.indexOf('blah') + " 3=" + tree.indexOf(3));
    // test.log("indexOf(3, 4+1)=" + tree.indexOf(3, 4 + 1));
    // test.log("indexOf(3, -1)=" + tree.indexOf(3, -1));
    // test.log("indexOf(3, -4)=" + tree.indexOf(3, -4));
    // test.log("indexOf(3, -5)=" + tree.indexOf(3, -5));

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("lastIndexof: -1=" + tree.lastIndexOf(-1) + " 0=" + tree.lastIndexOf(0) + " 10=" + tree.lastIndexOf(10) + "'blah'=" + tree.indexOf('blah') + " 3=" + tree.lastIndexOf(3));

    // container.appendChild(test.elem = document.createElement("p"));
    // tree.push(4);
    // test.log("push(4):" + tree + " pop()=" + tree.pop() + " pop()=" + tree.pop() + " finally: " + tree + " length=" + tree.length);

    // container.appendChild(test.elem = document.createElement("p"));
    // tree.unshift(-2);
    // test.log("unshift(-2):" + tree + " shift()=" + tree.shift() + " shift()=" + tree.shift());
    // tree.unshift(-1);
    // test.log(" unshift(-1):" + tree + " length=" + tree.length);

    // // logNodes();
    // container.appendChild(test.elem = document.createElement("p"));
    // tree.reverse();
    // test.log("reversed (odd length): " + tree);
    // tree.reverse();
    // test.log(" un-reversed: " + tree);
    // tree.push(4);
    // tree.reverse()
    // test.log(" reversed (even length): " + tree);
    // tree.reverse();
    // test.log(" un-reversed: " + tree);
    // // logNodes();

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("(1, 4, 9).map(Math.sqrt)=" + (new Tree(1, 4, 9)).map(Math.sqrt));
    // test.log(" (1, 2, 3, 4, 5).map(squared)=" + (new Tree(1, 2, 3, 4, 5)).map(function(item) { return Math.pow(item, 2); }));

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("(1,2,3,4).reduce(prev + curr)=" + (new Tree(1, 2, 3, 4)).reduce(function(prev, item) { return prev + item; }));
    // test.log(" (1,2,3,4).reduce(prev * curr)=" + (new Tree(1, 2, 3, 4)).reduce(function(prev, item) { return prev * item; }));
    // test.log(" (1,2,3,4).reduce(prev * curr, inital=0)=" + (new Tree(1, 2, 3, 4)).reduce(function(prev, item) { return prev * item; }, 0));
    // test.log(" ('hello',' ','world').reduce(prev + curr)=" + (new Tree('hello', ' ', 'world')).reduce(function(prev, item) { return prev + item; }));

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("Some(false, false, true, false)=" + (new Tree(false, false, true, false)).some(function(item) { return item; }));
    // test.log(" Some(false, false, false, false)=" + (new Tree(false, false, false, false)).some(function(item) { return item; }));
    // test.log(" every(true, true, true, true)=" + (new Tree(true, true, true, true)).every(function(item) { return item; }));
    // test.log(" every(true, false, true, true)=" + (new Tree(true, false, true, true)).every(function(item) { return item; }));

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("(1, 2, 3, 4, 5).filter(item % 2)=" + (new Tree(1, 2, 3, 4, 5)).filter(function(item) { return item % 2; }));

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("(0, 1, 2, 3, 4, 5).slice(3)=" + (new Tree(0, 1, 2, 3, 4, 5)).slice(3));
    // test.log(" (0, 1, 2, 3, 4, 5).slice(-2)=" + (new Tree(0, 1, 2, 3, 4, 5)).slice(-2));
    // test.log(" (0, 1, 2, 3, 4, 5).slice(1,4)=" + (new Tree(0, 1, 2, 3, 4, 5)).slice(1, 4));
    // test.log(" (0, 1, 2, 3, 4, 5).slice(2,-1)=" + (new Tree(0, 1, 2, 3, 4, 5)).slice(2, -1));


    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("Spice from the middle:");
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(2, 0);
    // test.log(" (0, 1, 2, 3, 4, 5).splice(2, 0)=" + tree);
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(2, 1)
    // test.log(" (0, 1, 2, 3, 4, 5).splice(2, 1)=" + tree);
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // var del = tree.splice(2, 2)
    // test.log(" (0, 1, 2, 3, 4, 5).splice(2, 2)=" + tree + " (deleted items=" + del + ")");
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(2)
    // test.log(" (0, 1, 2, 3, 4, 5).splice(2)=" + tree);

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("Spice from the head:");
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(0, 0);
    // test.log(" (0, 1, 2, 3, 4, 5).splice(0, 0)=" + tree);
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(0, 1)
    // test.log(" (0, 1, 2, 3, 4, 5).splice(0, 1)=" + tree);
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // del = tree.splice(0, 2)
    // test.log(" (0, 1, 2, 3, 4, 5).splice(0, 2)=" + tree + " (deleted items=" + del + ")");
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(0)
    // test.log(" (0, 1, 2, 3, 4, 5).splice(0)=" + tree);

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("Spice starting from the tail:");
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(5, 0);
    // test.log(" (0, 1, 2, 3, 4, 5).splice(5, 0)=" + tree);
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(5, 1)
    // test.log(" (0, 1, 2, 3, 4, 5).splice(5, 1)=" + tree);
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(5, 2)
    // test.log(" (0, 1, 2, 3, 4, 5).splice(5, 2)=" + tree);
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // del = tree.splice(5)
    // test.log(" (0, 1, 2, 3, 4, 5).splice(5)=" + tree + " (deleted items=" + del + ")");

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("Spice including tail:");
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(3, 3);
    // test.log(" (0, 1, 2, 3, 4, 5).splice(3, 3)=" + tree);
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(3, 4)
    // test.log(" (0, 1, 2, 3, 4, 5).splice(3, 4)=" + tree);
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(0, 2)

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("Spice insert single:");
    // tree = new Tree(0, 1, 2);
    // tree.splice(0, 0, 'foo');
    // test.log(" (0, 1, 2).splice(0, 0, 'foo')=" + tree);
    // tree = new Tree(0, 1, 2);
    // tree.splice(1, 0, 'foo');
    // test.log(" (0, 1, 2).splice(1, 0, 'foo')=" + tree);
    // tree = new Tree(0, 1, 2);
    // tree.splice(2, 0, 'foo');
    // test.log(" (0, 1, 2).splice(2, 0, 'foo')=" + tree);
    // tree = new Tree(0, 1, 2);
    // tree.splice(3, 0, 'foo');
    // test.log(" (0, 1, 2).splice(3, 0, 'foo')=" + tree);
    // tree = new Tree(0, 1, 2);
    // tree.splice(4, 0, 'foo');
    // test.log(" (0, 1, 2).splice(4, 0, 'foo')=" + tree);

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("Spice insert tree:");
    // tree = new Tree(0, 1, 2);
    // tree.splice(0, 0, 'foo', 'bar', 'baz');
    // test.log(" (0, 1, 2).splice(0, 0, 'foo', 'bar', 'baz')=" + tree);
    // tree = new Tree(0, 1, 2);
    // tree.splice(1, 0, 'foo', 'bar', 'baz');
    // test.log(" (0, 1, 2).splice(1, 0, 'foo', 'bar', 'baz')=" + tree);
    // tree = new Tree(0, 1, 2);
    // tree.splice(2, 0, 'foo', 'bar', 'baz');
    // test.log(" (0, 1, 2).splice(2, 0, 'foo', 'bar', 'baz')=" + tree);
    // tree = new Tree(0, 1, 2);
    // tree.splice(3, 0, 'foo', 'bar', 'baz');
    // test.log(" (0, 1, 2).splice(3, 0, 'foo', 'bar', 'baz')=" + tree);
    // tree = new Tree(0, 1, 2);
    // tree.splice(4, 0, 'foo', 'bar', 'baz');
    // test.log(" (0, 1, 2).splice(4, 0, 'foo', 'bar', 'baz')=" + tree);


    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("Spice delete and insert:");
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(2, 2, 'foo')
    // test.log(" (0, 1, 2, 3, 4, 5).splice(2, 2, 'foo')=" + tree);
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(0, 2, 'foo')
    // test.log(" (0, 1, 2, 3, 4, 5).splice(0, 2, 'foo')=" + tree);
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(0, 20, 'foo')
    // test.log(" (0, 1, 2, 3, 4, 5).splice(0, 20, 'foo')=" + tree);
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // tree.splice(5, 2, 'foo')
    // test.log(" (0, 1, 2, 3, 4, 5).splice(5, 2, 'foo')=" + tree);
    // tree = new Tree(0, 1, 2, 3, 4, 5);
    // del = tree.splice(3, 3, 'foo');
    // test.log(" (0, 1, 2, 3, 4, 5).splice(3, 3, 'foo')=" + tree + " (deleted items=" + del + ")");
}