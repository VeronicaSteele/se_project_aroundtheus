import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(
      ".modal__image-container"
    );
    this._popupCaption = this._popupElement.querySelector(".popup__caption");
  }

  openModal(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.openModal();
  }
}
