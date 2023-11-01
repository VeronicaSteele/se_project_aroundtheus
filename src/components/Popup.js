export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.closeModal();
    }
  };

  openModal() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  closeModal() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal__overlay") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.closeModal();
      }
    });
  }
}
