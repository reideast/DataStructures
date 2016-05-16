function List(data) {
    // note: these are not actually private properties. but, JS isn't designed to do private (or more importantly, protected) members. see: http://philipwalton.com/articles/implementing-private-and-protected-members-in-javascript/
    // so, pseudo-private members will have to do
    this._head = null;
    this._tail = null;

    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; ++i) {
            if (Array.isArray(arguments[i])) {
                for (var j = 0; j < arguments[i].length; ++j) {
                    this.appendList.call(this, new List(arguments[i][j]));
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

List.prototype.append = function (item) {
    console.log("append(), item=" + item);
    if (this._head === null) {
        this._head = this._tail = new Node(item);
    } else {
        this._tail.next = new Node(item, this._tail, null);
        this._tail = this._tail.next;
    }
}
List.prototype.appendList = function (list) {
    if (this._head === null) {
        this._head = list.getHead;
        this._tail = list.getTail;
    } else {
        this._tail.next = list.getHead;
        this._tail = list.getTail;
    }
}
List.prototype.prepend = function (item) {
    if (this._head === null) {
        this._head = this._tail = new Node(item);
    } else {
        this._head.prev = new Node(item, null, this._head);
        this._head = this._head.prev;
    }
}

List.prototype.toString = function () {
    // not going to do a customer StringBuilder since there's no performance gain in every browser except IE6/7: http://www.sitepoint.com/javascript-fast-string-concatenation/
    var s = "";
    var curr = this._head;
    while (curr !== null) {
        s += curr.data + (curr.next !== null ? "," : "");
        curr = curr.next;
    }
    return s;
};