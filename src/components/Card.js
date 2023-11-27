export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._id = data._id;
    this._isLiked = data.isLiked;
    //console.log("data", data._id);
  }

  _setEventListeners() {
    //delete button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    // Like button
    this._cardElement.querySelector(".card__like-button");
    this._handleLikeClick(this);
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked);
    });

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

  updateLikes(isLiked) {
    this._isLiked = isLiked;
    this.renderLikes();
  }

  renderLikes() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button-active");
    } else {
      this._likeButton.classList.remove("card__like-button-active");
    }
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
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this.renderLikes();
    this._setEventListeners();
    return this._cardElement;
  }
}
