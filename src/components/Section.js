export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._cardListEl = document.querySelector(selector);
  }
  renderItems() {
    // loop through list of this._items
    //{name:'', link:''}
    // invoke the callback functiona and pass the card data to it
    this._renderer();
  }
  addItem(cardEl) {
    // prepend the cardEl to this._cardListEl
  }
}
