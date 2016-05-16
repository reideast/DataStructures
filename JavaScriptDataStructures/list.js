function List(data) {
    this.head = null;
    this.tail = null;

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
//Object.defineProperties(List, {
//    head: { get: function () { return head; } },
//    tail: { get: function () { return tail; } }
//});

List.prototype.append = function (item) {
    console.log("append(), item=" + item);
    if (this.head === null) {
        this.head = this.tail = new Node(item);
    } else {
        this.tail.next = new Node(item, this.tail, null);
        this.tail = this.tail.next;
    }
}
List.prototype.appendList = function (list) {
    if (this.head === null) {
        this.head = list.head;
        this.tail = list.tail;
    } else {
        this.tail.next = list.head;
        this.tail = list.tail;
    }
}
List.prototype.prepend = function (item) {
    if (this.head === null) {
        this.head = this.tail = new Node(item);
    } else {
        this.head.prev = new Node(item, null, this.head);
        this.head = this.head.prev;
    }
}

List.prototype.toString = function () {
    // not going to do a customer StringBuilder since there's no performance gain in every browser except IE6/7: http://www.sitepoint.com/javascript-fast-string-concatenation/
    var s = "";
    var curr = this.head;
    while (curr !== null) {
        s += curr.data + (curr.next !== null ? "," : "");
        curr = curr.next;
    }
    return s;
};