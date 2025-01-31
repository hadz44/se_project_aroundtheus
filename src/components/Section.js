export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._rendereritems = items;
    this._renderer = renderer;
    this._class = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._class.prepend(element);
  }
}
