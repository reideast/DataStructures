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
            root = new TreeNode(item, black, leaf, leaf, null);
        } else {
            insertBelowNode(root, item);
        }
    };
    function insertBelowNode(node, data) {
        // console.log("inserting:" + data);
        if (data < node.data) {
            if (node.left === leaf) {
                node.left = new TreeNode(data, red, leaf, leaf, node);
            } else {
                insertBelowNode(node.left, data);
            }
        } else {
            if (node.right === leaf) {
                node.right = new TreeNode(data, red, leaf, leaf, node);
            } else {
                insertBelowNode(node.right, data);
            }
        }
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
