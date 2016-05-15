function List(data) {
    var head = null;
    var tail = null;
    this.append = append;
    this.prepend = prepend;

    console.log("creating a new list with arguments:"); console.log(arguments);
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; ++i) {
            console.log("arg[" + i + "]=" + arguments[i]);
            if (Array.isArray(arguments[i])) {
                console.log("appending array:" + arguments[i]);
                for (var j = 0; j < arguments[i].length; ++j)
                    appendList(new List(arguments[i][j]));
            } else {
                console.log("appending scalar:" + arguments[i]);
                this.append(arguments[i]);
            }
        }
    } //else {
        // no data passed
        // leave head/tail as null
    //}
    console.log("a list was created where head="); console.log(head);

    function append(item) {
        console.log("append(), item=" + item);
        if (head === null) {
            head = tail = new Node(item);
        } else {
            tail.next = new Node(item, tail, null);
            tail = tail.next;
        }
    }
    function appendList(list) {
        console.log("appending list:" + list);
        if (head === null) {
            head = list.head;
            tail = list.tail;
        } else {
            tail.next = list.head;
            tail = list.tail;
        }
    }
    function prepend(item) {
        if (head === null) {
            head = tail = new Node(item);
        } else {
            head.prev = new Node(item, null, head);
            head = head.prev;
        }
    }

    this.toString = function () {
        // not going to do a customer StringBuilder since there's no performance gain in every browser except IE6/7: http://www.sitepoint.com/javascript-fast-string-concatenation/
        var s = "";
        var curr = head;
        while (curr !== null) {
            s += curr.data + (curr.next !== undefined ? "," : "");
            curr = curr.next;
        }
        return s;
    }
}
Object.defineProperties(List, {
    head: { get: function () { return head; } },
    tail: { get: function () { return tail; } }
});
