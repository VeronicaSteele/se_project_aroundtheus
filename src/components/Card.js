export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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
    //
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  _handleDeleteCard() {
    this._handleDeleteClick(/* you need to provide data about the card, e.g. ID, because this is the data we need to delete the card */);
    // this._cardElement.remove();
    // this._cardElement = null;
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
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}
