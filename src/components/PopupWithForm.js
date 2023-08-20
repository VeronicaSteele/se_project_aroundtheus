import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._setEventListeners();
  }
  close() {
    this._popupForm.reset();
    super.closeModal();
  }
  _setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formValues = this._getInputValues();
      this._handleFormSubmit(formValues);
    });
  }
  _getInputValues() {
    const values = {};
    const inputElements = this._popupForm.querySelectorAll(".modal__input");
    inputElements.forEach((input) => {
      values[input.name] = input.value; // Create a key-value pair
    });

    return values;
  }
}
