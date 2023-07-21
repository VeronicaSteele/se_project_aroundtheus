import { openModal } from "../utils/utils.js";
import { previewImageModal } from "../pages/index.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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
    this._cardElement.querySelector(".card__image").src = this._link alt = "image";

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        const imagePopup = document.querySelector(
          "#view-card-modal .modal__image-container_popup"
        );
        const imageHeading = document.querySelector(
          "#view-card-modal .modal__image-container_heading"
        );

        imagePopup.src = this._link;
        imagePopup.alt = this._name;
        imageHeading.textContent = this._name;

        openModal(previewImageModal);
      });

    // get the card view
    //set event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}
