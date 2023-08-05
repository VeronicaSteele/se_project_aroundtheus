import PopupWithForm from "./PopupWithForm";

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  // this._overlay = document.querySelector(".page");
  // openpopup
  openModal() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscKey);
    this._popupElement.addEventListener("mousedown", this._handlePopupClose);
  }

  //close popup
  closeModal(modal) {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscKey);
    this._popupElement.removeEventListener("mousedown", this._handlePopupClose);
  }
  //handleEscClose
  _handleEscKey(evt) {
    if (evt.key === "Escape") {
      closeModal(document.querySelector(".modal_opened"));
    }
  }

  _handlePopupClose(evt) {
    if (
      evt.target.classList.contains("modal__overlay") ||
      evt.target.classList.contains("modal__close")
    ) {
      closeModal(evt.currentTarget);
    }
  }
  //setEventListeners
}
