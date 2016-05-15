function Node(data, prev, next) {
    this.data = data || undefined;
    this.prev = prev || undefined;
    this.next = next || undefined;
    console.log("a node was created: " + this.data + this.prev + this.next);
}
