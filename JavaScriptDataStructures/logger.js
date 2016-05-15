function Logger(elem) {
    this.elem = elem;
    this.log = function (text) {
        this.elem.appendChild(document.createTextNode(text));
    };
}