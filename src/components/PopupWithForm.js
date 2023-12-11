import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._saveButton = this._popupForm.querySelector(".modal__button");
    this._saveButtonText = this._saveButton.textContent;
    // this._setEventListeners();
  }
  closeModal() {
    this._popupForm.reset();
    super.closeModal();
  }
  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formValues = this._getInputValues();
      this._handleFormSubmit(formValues);
    });
    super.setEventListeners();
  }
  _getInputValues() {
    const inputValues = {};
    const inputElements = this._popupForm.querySelectorAll(".modal__input");
    inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }
  setSaving(isLoading, text = "Saving...") {
    if (isLoading) {
      this._saveButton.textContent = text;
    } else {
      this._saveButton.textContent = this._saveButtonText;
    }
  }
}
