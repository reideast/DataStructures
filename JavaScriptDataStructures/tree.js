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

    var leaf = new TreeNode('leaf', black, null, null);
    var root = leaf;

    this.walkTree = function (callback) {
        console.log("walking tree with ROOT:" + root.toString());
        walkNode(root, callback);
    }
    function walkNode(node, callback) {
        console.log("walking node:" + node);
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
    };
    function insertBelowNode(node, data) {
        // console.log("inserting:" + data);
        if (data < node.data) {
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
        if (node === root) { // Red-Black Insertion - Case 1: New node is root - must be black
            node.black = true;
            return; // returning here explicitly in order to break the if-elsif chain below to save u and gp
        } else if (node.parent.black) { // Red-Black Insertion - Case 2: Parent of new node is black - no properites violated
            return; // do nothing
        }
        
        // save uncle and grandparent here for performance (to avoid finding them repeatedly)
        var u = node.uncle;
        var gp = node.grandparent;
        if (u !== null && u.red) { // Red-Black Insertion - Case 3: Both Parent and Uncle are red
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
            rotateLeft(node.parent);
            // redefine var node to point at what used to be it's parent, and has now been rotated down to be node's left child. therefore Case 5 will examine the previous parent
            node = node.left;
        } else if (node.parent.left === node && gp.right === node.parent) { // right hand Case 4: node is left sibling, parent is right sibling
            rotateRight(node.parent);
            // redefine var node to previous parent 
            node = node.right;
        }
        // there was no explicit return for case 4, therefore Case 5 can be examined after case 4's modifications
        
        // Red-Black Insertion - Case 5: Parent is red, but uncle is black, and nodes are position so we can simply rotate grandparent
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
        
        if (parent.left === node)
            parent.left = newNode;
        else
            parent.right = newNode;
        newNode.parent = parent;
    }
    function rotateRight(node) {
        
    }

    this.rootToString = function () {
        return root.toString();
    }



    // Constructor functionality: 
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; ++i) {
            if (Array.isArray(arguments[i])) {
                for (var j = 0; j < arguments[i].length; ++j) {
                    //this.concat.call(this, new List(arguments[i][j]));
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
