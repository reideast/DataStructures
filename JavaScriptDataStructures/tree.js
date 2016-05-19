function TreeNode(data, isRed, left, right) {
    this.data = data;
    this.left = left || null;
    this.right = right || null;
    this.red = true;
    if (arguments.length > 1) {
        this.red = isRed;
    }

    this.insert = function (data) {
        // console.log("inserting:" + data);
        if (data < this.data) {
            if (this.left === null) {
                this.left = new TreeNode(data);
            } else {
                this.left.insert(data);
            }
        } else {
            if (this.right === null) {
                this.right = new TreeNode(data);
            } else {
                this.right.insert(data);
            }
        }
    }
}
Object.defineProperty(List.prototype, "black", {
    get: function () {
        return !this.red;
    },
    set: function (isBlack) {
        this.red = !isBlack;
    }
});
TreeNode.prototype.toString = function () {
    return "TREE{" + (this.left === null ? null : "{" + this.left.data + "}") + " << (" + this.data + "/" + (this.red ? "RED" : "BLACK") + ") >> " + (this.right === null ? null : "{" + this.right.data + "}") + "}";
};


function Tree(data) {
    this.length = 0;

    var leaf = new TreeNode(null);
    var root = null;


    this.walkTree = function (callback) {
        walkNode(root, callback);
    }
    function walkNode(node, callback) {
        console.log("walking node:" + node);
        if (node.left !== null) walkNode(node.left, callback);
        callback(node.data);
        if (node.right !== null) walkNode(node.right, callback);
    }

    this.append = function (item) {
        console.log("appending:" + item);
        if (root === null) {
            root = new TreeNode(item);
        } else {
            root.insert(item);
        }
    };

    this.rootToString = function () {
        return root.toString();
    }


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
Object.defineProperty(List.prototype, "getRoot", { get: function () { return this.rootToString(); } });
Tree.prototype.toString = function () {
    var s = "";
    this.walkTree(function (item) {
        s += item + " ";
    });
    return s;
};
