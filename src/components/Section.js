export default class Section {
    constructor({  renderer , selector}) {
        this._renderer = renderer;
        this._element = document.querySelector(Selector);
    }
    
    renderItems(items) {
       items.forEach((item)) => this.renderer(item);
    }
    
    addItem(item) {
        this._element.prepend(item);
    }
    }