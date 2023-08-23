import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._setEventListeners();
  }
  closeModal() {
    this._popupForm.reset();
    super.closeModal();
  }
  _setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      const formValues = this._getInputValues();
      this._handleFormSubmit(formValues);
    });
  }
  _getInputValues() {
    const inputValues = {};
    const inputElements = this._popupForm.querySelectorAll(".modal__input");
    inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }
}
