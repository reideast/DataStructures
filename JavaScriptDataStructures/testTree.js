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

    // test.log("Testing creation of Tree by items (1, 2, 3, 4, 5): ");
    // var tree = new Tree(1, 2, 3, 4, 5);
    // test.log("tree = " + tree);
    // // logNodes();

    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("Testing creation of Tree with disorderd array [3, 1, 2, 4, 5]: ");
    // tree = new Tree([3, 1, 2, 4, 5]);
    // test.log("tree = " + tree);
    
    // container.appendChild(test.elem = document.createElement("p"));
    // arr = [];
    // var limit = 100;
    // for (var i = 0; i < limit; ++i) {
    //     arr.push(Math.floor(Math.random() * limit + 1));
    // }
    // test.log("Testing creation of Tree with very large random array [" + arr + "]: ");
    // tree = new Tree(arr);
    // test.log("tree = " + tree);
    
    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("testing that sorted array does increase with each item:");
    // var sorted = tree.toArray();
    // var deltas = sorted.map(function(item, i, arr) {
    //     if (i == 0) {
    //         return ">";
    //     } else {
    //         if (item === arr[i - 1]) {
    //             return "0";
    //         } else if (item > arr[i - 1]) {
    //             return "^";
    //         } else {
    //             return "!!"
    //         }
    //     }
    // });
    // test.log(deltas);
    
    // container.appendChild(test.elem = document.createElement("p"));
    // test.log("testing searching array if a value exists (50): ");
    // test.log(tree.exists(50));
    
    // container.appendChild(test.elem = document.createElement("p"));
    // function Person(name, age) {
    //     this.name = name;
    //     this.age = age;
    // }
    // Person.prototype.toString = function () {
    //     return this.name + " - " + this.age + " years";
    // }
    // var compareAges = function (a, b) {
    //     if (a.age < b.age) {
    //         return -1;
    //     }  else if (a.age > b.age) {
    //         return 1;
    //     } else {
    //         return 0;
    //     }
    // };
    // var people = [new Person("Rebecca", 32), new Person("Andrew", 30), new Person("Ruthi", 27)];
    // var sortedPeople = new Tree(people, compareAges);
    // var found = sortedPeople.find(32);
    // test.log("Testing a custom compare function (sort by ages) with array: " + people);
    // test.log(" Tree (sorted by age, ascending): " + sortedPeople);
    // test.log(" Found Person with age == 32: " + found);
    
    
    // container.appendChild(test.elem = document.createElement("p"));
    // var arr = [14, 4, 5, 1, 16, 17, 10, 9, 20, 15];
    // test.log("Testing creation of Tree with some random values [" + arr + "]: ");
    // tree = new Tree(arr);
    // tree.debugTree();
    // test.log("tree = " + tree);
    
    // container.appendChild(test.elem = document.createElement("p"));
    // tree.delete(20);
    // tree.debugTree();
    // test.log("deleting leaf node (20): " + tree);
    // tree.delete(14);
    // tree.debugTree();
    // test.log("deleting single-child node (14): " + tree);
    // tree.delete(5);
    // tree.debugTree();
    // test.log("deleting double-child node (5): " + tree);
    
    var arr = [];
    for (var i = 1; i <= 20; ++i) arr.push(i);
    test.log("Testing creation of Tree with array of 1..20 [" + arr + "]: ");
    tree = new Tree(arr);
    tree.debugTree();
    test.log("tree = " + tree);
    
    container.appendChild(test.elem = document.createElement("p"));
    tree.delete(1);
    tree.debugTree();
    test.log("Delete leaf (1): " + tree);
}