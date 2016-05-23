function TreeNode(data, isRed, left, right, parent) {
    this.data = data;
    this.left = left || null;
    this.right = right || null;
    this.red = true;
    if (arguments.length > 1) {
        this.red = isRed;
    }
    this.parent = parent || null;
}
Object.defineProperties(TreeNode.prototype, {
    "black": {
        get: function () {
            return !this.red;
        },
        set: function (isBlack) {
            this.red = !isBlack;
        },
        enumerable: true
    },
    "grandparent": {
        get: function () {
            if (this.parent) {
                return this.parent.parent;
            } else {
                return null;
            }
        }
    },
    "uncle": {
        get: function() {
            var gp = this.grandparent;
            if (gp === null)
                return null;
            else if (gp.left === this.parent)
                return gp.right;
            else
                return gp.left;
        }
    }
});
TreeNode.prototype.toString = function () {
    return "NODE{" + (this.left === null ? null : "{" + this.left.data + "}") + " << (" + this.data + "/" + (this.red ? "RED" : "BLACK") + ") >> " + (this.right === null ? null : "{" + this.right.data + "}") + " ^" + (this.parent === null ? null : this.parent.data) + "^}" + " gp:" + (this.grandparent === null ? null : this.grandparent.data) + " uncle:" + (this.uncle === null ? null : this.uncle.data);
};


function Tree(data) {
    this.length = 0;
    var red = true, black = false;

    var leaf = new TreeNode('leaf', black, null, null, null);
    var root = leaf;

    this.walkTree = function (callback) {
        console.log("walking tree with ROOT {" + root.data + "}");
        walkNode(root, callback);
    }
    function walkNode(node, callback) {
        // console.log("walking:" + node);
        if (node.left !== leaf) walkNode(node.left, callback);
        callback(node.data);
        if (node.right !== leaf) walkNode(node.right, callback);
    }

    this.append = function (item) {
        console.log("appending:" + item);
        if (root === leaf) {
            root = new TreeNode(item, black, leaf, leaf, null); // Red-Black Insertion - Case 1: New node is root - no properties violated
        } else {
            insertBelowNode(root, item);
        }
        this.length += 1;
        // console.log("append done, tree is:  ");
        // console.log("" + this); // "" + is to force JS engine to use overloaded toString(), not it's own object print method
    };
    function insertBelowNode(node, data) {
        // console.log("inserting:" + data);
        if (data < node.data) { // TODO: replace explicit "<" comparison with a compare() function passed to constructor (maybe even optional; falls back to "<"?)
            if (node.left === leaf) {
                node.left = new TreeNode(data, red, leaf, leaf, node);
                repairTree(node.left);
            } else {
                insertBelowNode(node.left, data);
            }
        } else {
            if (node.right === leaf) {
                node.right = new TreeNode(data, red, leaf, leaf, node);
                repairTree(node.right);
            } else {
                insertBelowNode(node.right, data);
            }
        }
    }
    function repairTree(node) { // note: the Red-Black Tree algorithm __only__ calls this on Red nodes! ie. called for new nodes, or called recursively after setting a node to Red
        console.log("repair:" + node);
        if (node === root) { // Red-Black Insertion - Case 1: New node is root - must be black
            console.log("Case 1 - repairing root");
            node.black = true;
            return; // returning here explicitly in order to break the if-elsif chain below to save u and gp
        } else if (node.parent.black) { // Red-Black Insertion - Case 2: Parent of new node is black - no properites violated
            console.log("Case 2 - parent is already black");
            return; // do nothing
        }
        
        // save uncle and grandparent here for performance (to avoid finding them repeatedly)
        var u = node.uncle;
        var gp = node.grandparent;
        if (u !== null && u.red) { // Red-Black Insertion - Case 3: Both Parent and Uncle are red
            console.log("Case 3 - parent and uncle are red, so make them black, grandparent red and recurse on grandparent");
            //change both parent and uncle to black
            node.parent.black = true;
            u.black = true;
            //change grandparent to red
            gp.red = true;
            repairTree(gp);
            return; //explicit return here to show logical grouping of case 4
        }
        
        // Red-Black Insertion - Case 4: Parent is red, but uncle is black and can't simply rotate grandparent - fix by rotating node.parent downward and node into it's spot, and then recursively repairing node.parent (now a child)
        if (node.parent.right === node && gp.left === node.parent) { // left-hand Case 4: node is right sibling, parent is left sibling
            console.log("Case 4 - rotate left");
            rotateLeft(node.parent);
            // redefine var node to point at what used to be it's parent, and has now been rotated down to be node's left child. therefore Case 5 will examine the previous parent
            node = node.left;
        } else if (node.parent.left === node && gp.right === node.parent) { // right hand Case 4: node is left sibling, parent is right sibling
            console.log("Case 4 - rotate right");
            rotateRight(node.parent);
            // redefine var node to previous parent 
            node = node.right;
        }
        // there was no explicit return for case 4, therefore Case 5 can be examined after case 4's modifications
        
        // Red-Black Insertion - Case 5: Parent is red, but uncle is black, and nodes are position so we can simply rotate grandparent
        // NOTE: why can we assume node.parent isn't null?
        //   * if Case 4 was performed, then node is now pointing to the same level that node was before.
        //   * more importantly, parent exists (Case 1) and parent's color is red (Case 2). If parent is red, then it cannot be root, therefore a grandparent must exist!
        node.parent.black = true;
        gp = node.grandparent; //reset gp pointer, since node would be pointing to a different node if Case 4 was performed
        gp.red = true;
        if (node.parent.left === node) {
            console.log("Case 5 - rotate grandparent right");
            rotateRight(gp);
        } else {
            console.log("Case 5 - rotate grandparent left");
            rotateLeft(gp);
        }
    }
    function rotateLeft(node) {
        var parent = node.parent;
        var newNode = node.right;
        
        //node.left is unchanged
        node.right = newNode.left;
        node.right.parent = node;
        
        newNode.left = node;
        newNode.left.parent = newNode;
        //newNode.right is unchanged
        
        if (parent !== null) {
            if (parent.left === node) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
            newNode.parent = parent;
        } else {
            newNode.parent = null;
            root = newNode;
        }
    }
    function rotateRight(node) {
        var parent = node.parent;
        var newNode = node.left;
        
        node.left = newNode.right;
        node.left.parent = node;
        //node.right is unchanged
        
        //newnode.left is unchanged
        newNode.right = node;
        newNode.right.parent = newNode;
        
        if (parent !== null) {
            if (parent.left === node) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
            newNode.parent = parent;
        } else {
            newNode.parent = null;
            root = newNode;
        }
    }

    this.rootToString = function () {
        return root.toString();
    }
    
    this.dataExists = function (data) {
        if (getNode(root, function(item) {
            console.log("testFunctioning " + data + " ? " + item);
            if (data < item) {
                return -1;
            } else if (data == item) {
                return 0;
            } else {
                return 1;
            }
        }) !== null) {
            return true;
        } else {
            return false;
        }
    };
    
    // a search function, starting at node, which uses a test function to determine relationships between data nodes
    // getNode will return the node for which testFunction returns 0
    // or null if not found
    // testFunction should take one argument, the current node.data
    // testFunction should return 0 for equals, -1 for less than, and 1 for greater than
    function getNode(node, testFunction) {
        var result = testFunction(node.data);
        console.log("testing:" + node + ", result=" + result);
        if (result < 0) {
            if (node.left !== leaf) {
                return getNode(node.left, testFunction);
            } else {
                return null;
            }
        } else if ( result === 0) {
            return node;
        } else {
            if (node.right !== leaf) {
                return getNode(node.right, testFunction);
            } else {
                return null;
            }
        }
    }

    // Constructor functionality: 
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; ++i) {
            if (Array.isArray(arguments[i])) {
                for (var j = 0; j < arguments[i].length; ++j) {
                    this.append(arguments[i][j]); //TODO: should there be functionality to look deeper? or should the constructor be simple, only examining one level of array
                }
            } else {
                this.append(arguments[i]);
            }
        }
    }
}

Object.defineProperty(Tree.prototype, "getRoot", { get: function () { return this.rootToString(); } });

Tree.prototype.toString = function () {
    var s = "";
    this.walkTree(function (item) {
        s += item + " ";
    });
    return s;
};

Tree.prototype.toArray = function () {
  var arr = [];
  this.walkTree(function (item) {
      arr.push(item);
  });
  return arr;
};
