function Node(data, prev, next) {
    this.data = data;
    this.prev = prev || null;
    this.next = next || null;
    console.log("a node was created: " + this.data + this.prev + this.next);
}
