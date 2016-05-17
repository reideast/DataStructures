function Node(data, prev, next) {
    this.data = data;
    this.prev = prev || null;
    this.next = next || null;
    // console.log("node created: " + this.toString());
}
Node.prototype.toString = function () {
    return "NODE{" + (this.prev === null ? null : "{"+this.prev.data+"}") + " << (" + this.data + ") >> " + (this.next === null ? null : "{"+this.next.data+"}") + "}";
};