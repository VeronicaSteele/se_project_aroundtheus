import PopupWithForm from "./PopupWithForm";

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this._popupElement.closeModal();
    }
  }

  openModal() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
    // this._popupElement.addEventListener("mousedown", this._handlePopupClose);
  }

  closeModal() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
    // this._popupElement.removeEventListener("mousedown", this._handlePopupClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal__overlay") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.closeModal();
      }
    });
  }
}
