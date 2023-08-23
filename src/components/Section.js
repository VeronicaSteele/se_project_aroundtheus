export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._cardListEl = document.querySelector(selector);
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardEl) {
    this._cardListEl.prepend(cardEl);
  }
}
