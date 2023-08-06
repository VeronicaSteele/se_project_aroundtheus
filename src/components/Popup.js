import PopupWithForm from "./PopupWithForm";

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  _handleEscKey(evt) {
    if (evt.key === "Escape") {
      closeModal(document.querySelector(".modal_opened"));
    }
  }

  openModal(modal) {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", _handleEscKey);
    this._popupElement.addEventListener("mousedown", _handlePopupClose);
  }

  closeModal(modal) {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", _handleEscKey);
    this._popupElement.removeEventListener("mousedown", _handlePopupClose);
  }

  _handlePopupClose(evt) {
    if (
      evt.target.classList.contains("modal__overlay") ||
      evt.target.classList.contains("modal__close")
    ) {
      closeModal(evt.currentTarget);
    }
  }
}
