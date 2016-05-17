// Define a linked-list data structure
// double-linked, head and tail pointers
// Constructor can take a variable number of arguments
// All arguments that are Arrays will have their elements added (recursively!)
// All other arguments will be added as single list nodes
function List(data) {
    this.length = 0;

    // note: these are not actually private properties. but, JS isn't designed to do private (or more importantly, protected) members. see: http://philipwalton.com/articles/implementing-private-and-protected-members-in-javascript/
    // so, pseudo-private members will have to do
    this._head = null;
    this._tail = null;

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
    } //else {
        // no data passed
        // leave head/tail as null
    //}
}

Object.defineProperty(List.prototype, "getHead", { get: function () { return this._head; } });
Object.defineProperty(List.prototype, "getTail", { get: function () { return this._tail; } });

List.prototype.toString = function () {
    return this.join(",");
};
List.prototype.join = function (separator) {
    if (arguments.length < 1) separator = ",";
    // not going to do a customer StringBuilder since there's no performance gain in every browser except IE6/7: http://www.sitepoint.com/javascript-fast-string-concatenation/
    var s = "";
    var curr = this._head;
    while (curr !== null) {
        s += (curr.data === null || curr.data === undefined ? "" : curr.data) + (curr.next !== null ? separator : "");
        curr = curr.next;
    }
    return s;
};

List.prototype.append = function (item) {
    if (this._head === null) {
        this._head = this._tail = new Node(item);
    } else {
        this._tail.next = new Node(item, this._tail, null);
        this._tail = this._tail.next;
    }
    ++this.length;
};
List.prototype.push = function (item) {
    this.append(item);
};
List.prototype.pop = function () {
    if (this._tail === null) return undefined;
    var popped = this._tail;
    this._tail = popped.prev;
    this._tail.next = null;
    return popped.data;
};
List.prototype.concat = function (list) {
    if (this._head === null) {
        this._head = list.getHead;
        this._tail = list.getTail;
    } else {
        list.getHead.prev = this._tail;
        this._tail.next = list.getHead;
        this._tail = list.getTail;
    }
    this.length += list.length;
};
List.prototype.prepend = function (item) {
    if (this._head === null) {
        this._head = this._tail = new Node(item);
    } else {
        this._head.prev = new Node(item, null, this._head);
        this._head = this._head.prev;
    }
    ++this.length;
};
//List.prototype.length = function () {
//    var count = 0;
//    var curr = this._head;
//    while (curr !== null) {
//        ++count;
//        curr = curr.next;
//    }
//    return count;
//};
List.prototype.elementAt = function (position) {
    var i = 0;
    var curr = this._head;
    while (curr !== null) {
        if (i++ === position)
            return curr.data;
        curr = curr.next;
    }
    throw new RangeError("Index out of range.");
};
List.prototype.indexOf = function (data) {
    var i = 0;
    var curr = this._head;
    while (curr !== null) {
        if (curr.data === data)
            return i;
        ++i;
        curr = curr.next;
    }
    return -1;
};
List.prototype.lastIndexOf = function (data) {
    var i = 0;
    var found = -1;
    var curr = this._head;
    while (curr !== null) {
        if (curr.data === data)
            found = i;
        ++i;
        curr = curr.next;
    }
    return found;
};
List.prototype.every = function (callback, thisArg) {
    if (arguments.length < 2)
        thisArg = this;
    var i = 0;
    var curr = this._head;
    while (curr !== null) {
        if (!callback.call(thisArg, curr.data, i, this))
            return false;
        ++i;
        curr = curr.next;
    }
    return true;
};
List.prototype.some = function (callback, thisArg) {
    if (arguments.length < 2)
        thisArg = this;
    var i = 0;
    var curr = this._head;
    while (curr !== null) {
        if (callback.call(thisArg, curr.data, i, this))
            return true;
        ++i;
        curr = curr.next;
    }
    return false;
};
List.prototype.forEach = function (callback, thisArg) {
    if (arguments.length < 2)
        thisArg = this;
    var i = 0;
    var curr = this._head;
    while (curr !== null) {
        callback.call(thisArg, curr.data, i, this)
        ++i;
        curr = curr.next;
    }
};
List.prototype.forEachNode = function (callback, thisArg) {
    // this function is largely for DEBUG; I can't see it as good Object Oriented practice to have this normally.
    if (arguments.length < 2)
        thisArg = this;
    var i = 0;
    var curr = this._head;
    while (curr !== null) {
        callback.call(thisArg, curr, i, this)
        ++i;
        curr = curr.next;
    }
};
