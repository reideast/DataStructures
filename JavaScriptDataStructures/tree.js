function TreeNode(data, left, right) {
    this.data = data;
    this.left = left || null;
    this.right = right || null;

    this.walkNode = function (callback) {
        console.log("walking node:" + this);
        if (this.left !== null) this.left.walkNode(callback);
        callback(data);
        if (this.right !== null) this.right.walkNode(callback);
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
TreeNode.prototype.toString = function () {
    return "TREE{" + (this.left === null ? null : "{" + this.left.data + "}") + " << (" + this.data + ") >> " + (this.right === null ? null : "{" + this.right.data + "}") + "}";
};

function Tree(data) {
    this.length = 0;

    var root = null;


    this.walkTree = function (callback) {
        root.walkNode(callback);
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
                    this.concat.call(this, new List(arguments[i][j]));
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
