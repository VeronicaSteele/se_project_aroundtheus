import PopupWithForm from "./PopupWithForm";

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeModal(document.querySelector(".modal_opened"));
    }
  }

  openModal() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", _handleEscClose);
    this._popupElement.addEventListener("mousedown", _handlePopupClose);
  }

  closeModal() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", _handleEscClose);
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
