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
    "sibling": {
        get: function () {
            if (this.parent === null) {
                return null;
            } else if (this.parent.left === this) {
                return this.parent.right;
            } else {
                return this.parent.left
            }
        }
    },
    "grandparent": {
        get: function () {
            if (this.parent === null) {
                return null;
            } else {
                return this.parent.parent;
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
    return "NODE{" + (this.left === null ? null : "{" + this.left.data + "}") + " << (" + this.data + "/" + (this.red ? "RED" : "BLACK") + ") >> " + (this.right === null ? null : "{" + this.right.data + "}") + " ^" + (this.parent === null ? null : this.parent.data) + "^}" + " G:" + (this.grandparent === null ? null : this.grandparent.data) + " U:" + (this.uncle === null ? null : this.uncle.data) + " S:" + (this.sibling === null ? null : this.sibling.data);
};


// data can be a single value, an array, or multiple values or arrays
//   the only situation it won't be able to handle is if you're passing multiple arrays, expecting them to be placed as individual nodes
// compare is an optional function which takes two objects of data stored in nodes, and must return:
//   1. a value less than 0 if the first is ordered lower,
//   2. 0 if they are equal
//   3. a value > 0 if the first is ordered higher
// if compare is not provided, then is will be substituded by the operators: <, ==, and > 
function Tree(data, compareFunction) {
    this.length = 0;
    
    // this could be replaced by the construtory arguments-examining loop if compareFunction argument was given
    var compare = function(a, b) {
            if (a == b) {
                return 0;
            } else if (a < b) {
                return -1;
            } else { // (a > b)
                return 1;
            }
    };
    
    var red = true, black = false;

    var leaf = new TreeNode('leaf', black, null, null, null);
    var root = leaf;

    this.walkTree = function (callback) {
        // console.log("walking tree with ROOT {" + root.data + "}");
        walkNode(root, callback);
    }
    function walkNode(node, callback) {
        // console.log("walking:" + node);
        if (node.left !== leaf) walkNode(node.left, callback);
        callback(node.data);
        if (node.right !== leaf) walkNode(node.right, callback);
    }
    this.debugTree = function () {
        var foundBlackHeight = undefined;

        function reachedLeaf(discoveredBlackHeight, node) {
            if (foundBlackHeight === undefined) {
                foundBlackHeight = discoveredBlackHeight;
            } else {
                if (discoveredBlackHeight !== foundBlackHeight) {
                    console.log("ERROR: Tree has an uneven black height on node=" + node);
                }
                // } else {
                //     console.log("verified black height=" + discoveredBlackHeight + " on leaf of node=" + node.data);
                // }
            }
        }

        function logNode(node, parentBlackHeight) {
            console.log("" + node);
            if (node.black)
                parentBlackHeight += 1;
            if (node.left !== leaf)
                logNode(node.left, parentBlackHeight);
            else
                reachedLeaf(parentBlackHeight, node);
            if (node.right !== leaf)
                logNode(node.right, parentBlackHeight);
            else
                reachedLeaf(parentBlackHeight, node);
        }

        logNode(root, 0);
        console.log("Proper black height verified: " + foundBlackHeight);
    }
    
    this.append = function (item) {
        // console.log("appending:" + item);
        if (root === leaf) {
            root = new TreeNode(item, black, leaf, leaf, null); // Red-Black Insertion - Case 1: New node is root - no properties violated
        } else {
            insertBelowNode(root, item);
        }
        // console.log("append done, tree is:  ");
        // console.log("" + this); // "" + is to force JS engine to use overloaded toString(), not it's own object print method
    };
    this.appendArray = function (arr) {
        for (var i = 0; i < arr.length; ++i) {
            this.append(arr[i]);
        }
    };
    
    function insertBelowNode(node, data) {
        // console.log("inserting:" + data);
        if (compare(data, node.data) < 0) { // DONE: replace explicit "<" comparison with a compare() function passed to constructor (maybe even optional; falls back to "<"?)
            if (node.left === leaf) {
                node.left = new TreeNode(data, red, leaf, leaf, node);
                this.length += 1;
                repairTree(node.left);
            } else {
                insertBelowNode(node.left, data);
            }
        } else {
            if (node.right === leaf) {
                node.right = new TreeNode(data, red, leaf, leaf, node);
                this.length += 1;
                repairTree(node.right);
            } else {
                insertBelowNode(node.right, data);
            }
        }
    }
    function repairTree(node) { // note: the Red-Black Tree algorithm __only__ calls this on Red nodes! ie. called for new nodes, or called recursively after setting a node to Red
        // console.log("repair:" + node);
        if (node === root) { // Red-Black Insertion - Case 1: New node is root - must be black
            // console.log("Case 1 - repairing root");
            node.black = true;
            return; // returning here explicitly in order to break the if-elsif chain below to save u and gp
        } else if (node.parent.black) { // Red-Black Insertion - Case 2: Parent of new node is black - no properites violated
            // console.log("Case 2 - parent is already black");
            return; // do nothing
        }
        
        // save uncle and grandparent here for performance (to avoid finding them repeatedly)
        var u = node.uncle;
        var gp = node.grandparent;
        if (u !== null && u.red) { // Red-Black Insertion - Case 3: Both Parent and Uncle are red
            // console.log("Case 3 - parent and uncle are red, so make them black, grandparent red and recurse on grandparent");
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
            // console.log("Case 4 - rotate left");
            rotateLeft(node.parent);
            // redefine var node to point at what used to be it's parent, and has now been rotated down to be node's left child. therefore Case 5 will examine the previous parent
            node = node.left;
            gp = node.grandparent; //reset gp pointer, since node would be pointing to a different node if Case 4 was performed
        } else if (node.parent.left === node && gp.right === node.parent) { // right hand Case 4: node is left sibling, parent is right sibling
            // console.log("Case 4 - rotate right");
            rotateRight(node.parent);
            // redefine var node to previous parent 
            node = node.right;
            gp = node.grandparent; //reset gp pointer, since node would be pointing to a different node if Case 4 was performed
        }
        // there was no explicit return for case 4, therefore Case 5 can be examined after case 4's modifications
        
        // Red-Black Insertion - Case 5: Parent is red, but uncle is black, and nodes are position so we can simply rotate grandparent
        // NOTE: why can we assume node.parent isn't null?
        //   * if Case 4 was performed, then node is now pointing to the same level that node was before.
        //   * more importantly, parent exists (Case 1) and parent's color is red (Case 2). If parent is red, then it cannot be root, therefore a grandparent must exist!
        node.parent.black = true;
        gp.red = true;
        if (node.parent.left === node) {
            // console.log("Case 5 - rotate grandparent right");
            rotateRight(gp);
        } else {
            // console.log("Case 5 - rotate grandparent left");
            rotateLeft(gp);
        }
    }
    function rotateLeft(node) {
        var parent = node.parent;
        var rotateIntoSpot = node.right;
        
        //node.left is unchanged
        node.right = rotateIntoSpot.left;
        if (node.right !== leaf) node.right.parent = node;
        
        rotateIntoSpot.left = node;
        rotateIntoSpot.left.parent = rotateIntoSpot;
        //rotateIntoSpot.right is unchanged
        
        if (parent !== null) {
            if (parent.left === node) {
                parent.left = rotateIntoSpot;
            } else {
                parent.right = rotateIntoSpot;
            }
            rotateIntoSpot.parent = parent;
        } else {
            rotateIntoSpot.parent = null;
            root = rotateIntoSpot;
        }
    }
    function rotateRight(node) {
        var parent = node.parent;
        var rotateIntoSpot = node.left;
        
        node.left = rotateIntoSpot.right;
        if (node.left !== leaf) node.left.parent = node;
        //node.right is unchanged
        
        //rotateIntoSpot.left is unchanged
        rotateIntoSpot.right = node;
        rotateIntoSpot.right.parent = rotateIntoSpot;
        
        if (parent !== null) {
            if (parent.left === node) {
                parent.left = rotateIntoSpot;
            } else {
                parent.right = rotateIntoSpot;
            }
            rotateIntoSpot.parent = parent;
        } else {
            rotateIntoSpot.parent = null;
            root = rotateIntoSpot;
        }
    }
   
    this.delete = function (data) {
        var found = getNode(root, data);
        if (found !== null) {
            console.log("Deleting node with data (" + data + "): " + found);
            deleteNode(found);
        } else {
            console.log("Data (" + data + ") was not found to delete.");
        }
    };
    function deleteNode(node) {
        if (node === null) {
            console.log("Error: Tried to deleteNode on null");
        } else if (node === leaf) {
            console.log("Error: Tried to deleteNode on sentinel leaf");
        } else if (node.left !== leaf && node.right !== leaf) { //node has two children
            // Delete internal node with exactly two children
            // swap either in-order predecessor or successor's data, then recursively delete that node (which will be an edge, so the recursion will end quickly)
            // TODO: should this be random? if successor/predecessor is used every time, the process is deterministic!
            // var victim = ((Math.random() < 0.5) ? findSuccessor(node) : findPredecessor(node)); // algorithm notes says "choose either predecessor or successor"...so predecessor.
            var victim = findPredecessor(node); // always find predeccessor
            node.data = victim.data;
            deleteNode(victim);
        // } else if (node.left === leaf && node.right === leaf) {
        //     // Delete leaf
        //     if (!node.red) {

        //     }
        //     replaceMe(node, leaf);
        // } else { // (node.left !== leaf) XOR (node.right !== leaf) ie. exactly one non-null-leaf node
        //     // Delete internal node with one child
        } else { // node has 0 or 1 non-leaf child
            var child = (node.left === leaf ? node.right : node.left); // child will be either A. left or right child or B. a leaf (taken from node.left, but still a leaf nonetheless)
            replaceMe(node, child);
            if (node.red) { // node is red, therefore child must be black. 
                console.log("Deleting red node with a single child. Black height unaffected. Node=" + node);
            } else if (child.red) { // node.black && child.red
                // recolor child black
                console.log("Deleting a black node with a single red child. Pushing black onto child. Node=" + node);
                child.black = true;
            } else { // node.black && child.black
                // Need to re-blance tree, since a black node was actually removed in the end
                // TODO: will this work on a null-leaf?
                // If child is the null-leaf, then replaceMe( , leaf) just set leaf.parent = node.parent
                repaintDeletedSingleChild(child);
            }
        }
    }
    function replaceMe(node, replacement) {
        this.length -= 1;
        if (node === root) {
            root = replacement;
            replacement.parent = null;
        } else {
            replacement.parent = node.parent;
            if (node.parent.left === node) {
                node.parent.left = replacement;
            } else {
                node.parent.right = replacement;
            }
        }
    }
    function findPredecessor(node) { // find the largest node in the left subtree of given node
        var currNode = node.left;
        while (currNode.right !== leaf) {
            currNode = currNode.right;
        }
        return currNode;
    }
    function findSuccessor(node) { // find the smallest node in the right subtree of given node
        var currNode = node.right;
        while (currNode.left !== leaf) {
            currNode = currNode.left;
        }
        return currNode;
    }
    function repaintDeletedSingleChild(child) {
        // Need to re-blance tree, since a black node was actually removed in the end, and therefore child.parent's two paths (child and sibling) have a different number of black nodes
        if (child.parent === null) {
            console.log("Delete & Rebalance Case 1: Child was moved upward and is now root")
            // root should be black; do nothing
            return;
        }
        
        var sibling = child.sibling; // if child is the null-leaf, sibling will work because replaceMe( , leaf) currently assigned leaf.parent properly

        if (sibling.red) {
            console.log("Delete and Rebalance Case 2: Sibling is Red, so a rotate will reblance");
            child.parent.red = true;
            sibling.black = true;
            if (child.parent.left === child) {
                rotateLeft(child.parent); 
            } else {
                rotateRight(child.parent);
            }
            // do not return, continue testing at child
            sibling = child.sibling; // child.sibling has changed after rotation
        }
        
        if (child.parent.black && sibling.black && sibling.left.black && sibling.right.black) {
            console.log("Delete and Rebalance Case 3: Node, Parent, Sibling, and Sibling's 2 children are all black. Recolor sibling red, then recurse on Parent in order to remove a black node from Parent's sibling's path.");
            sibling.red = true;
            repaintDeletedSingleChild(child.parent);
            return;
        }
        
        if (child.parent.red && sibling.black && sibling.left.black && sibling.right.black) {
            console.log("Delete and Rebalance Case 4: Node, Sibling, and Sibling's 2 children are black, but parent is red. Swap color of sibling and parent, balancing both paths out of parent");
            sibling.red = true;
            child.parent.black = true;
            return;
        }
        
        if (sibling.black) {
            console.log("Delete and Rebalance Case 5: Red sibling. Rotate sibling, then recolor");
            if (child.parent.left === child && sibling.right.black && sibling.left.red) {
                sibling.red = true;
                sibling.left.black = true;
                rotateRight(sibling); // TODO: bug - rotate() resets parent of a null-leaf node! therefore if child is a null-leaf, it's parent & therefore sibling links will be destroyed
            } else if (child.parent.right === child && sibling.left.black && sibling.right.red) {
                sibling.red = true;
                sibling.right.black = true;
                rotateLeft(sibling);
            }
            // fall through to case 6, still examining child
            sibling = child.sibling;
        }
        
        console.log("Delete and Reblance Case 6: Black sibling with black child opposite child. Rotate and recolor.")
        sibling.red = child.parent.red; // recolor sibling as parent's (arbitrary) color 
        child.parent.black = true;
        if (child.parent.left === child) {
            sibling.right.black = true;
            rotateLeft(child.parent);
        } else {
            sibling.left.black = true;
            rotateRight(child.parent);
        }
    }
    
    

    this.exists = function (data) {
        if (getNode(root, data) !== null) {
            return true;
        } else {
            return false;
        }
    };
    
    // a function to return a piece of data stored in the tree
    // this is useful in situations where data is a complex type,
    // and the compare function only examines part of the object to order it
    this.find = function (data) {
        var found = getNode(root, data);
        if (found !== null) {
            return found.data;
        } else {
            return null;
        }
    }
    
    // a search function, starting at node, which uses a test function to determine relationships between data nodes
    // getNode will return the node for which compare() to needle returns 0
    // or null if not found
    function getNode(node, needle) {
        var result = compare(needle, node.data);
        if (result < 0) {
            if (node.left !== leaf) {
                return getNode(node.left, needle);
            } else {
                return null;
            }
        } else if ( result === 0) {
            return node;
        } else {
            if (node.right !== leaf) {
                return getNode(node.right, needle);
            } else {
                return null;
            }
        }
    }

    // Constructor functionality: 
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; ++i) {
            if (i === arguments.length - 1 && typeof arguments[i] === "function") {
                compare = compareFunction;
                break; //loop is done anway, this just skips adding compareFunction as a data node
            }
            if (Array.isArray(arguments[i])) {
                this.appendArray(arguments[i]);
            } else {
                this.append(arguments[i]);
            }
        }
    }
}

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

