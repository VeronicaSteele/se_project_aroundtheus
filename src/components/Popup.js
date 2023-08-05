import PopupWithForm from "./PopupWithForm";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }
  // this._overlay = document.querySelector(".page");
  // openpopup
  openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keyup", handleEscKey);
    modal.addEventListener("mousedown", handlePopupClose);
  }

  //close popup
  closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keyup", handleEscKey);
    modal.removeEventListener("mousedown", handlePopupClose);
  }
  //handleEscClose
  _handleEscKey(evt) {
    if (evt.key === "Escape") {
      closeModal(document.querySelector(".modal_opened"));
    }
  }

  handlePopupClose(evt) {
    if (
      evt.target.classList.contains("modal__overlay") ||
      evt.target.classList.contains("modal__close")
    ) {
      closeModal(evt.currentTarget);
    }
  }
  //setEventListeners
}
