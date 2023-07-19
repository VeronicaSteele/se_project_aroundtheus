export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);
    return cardTemplate.content.cloneNode(true);
  }

  _setEventListeners() {
    //delete button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    // Like button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
  }
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__list")
      .cloneNode(true);

    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardElement.querySelector(".card__image").image = this._link; //   ???????
    // get the card view
    //set event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}
