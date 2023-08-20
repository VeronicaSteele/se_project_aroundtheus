import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._setEventListeners();
  }
  close() {
    this._popupForm.reset();
    super.closeModal();
  }
  _setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues);
    });
  }
  _getInputValues() {
    //create new variable that is an empty object
    //loop through the form inputs .forEach
    const values = {};
    //create key-value pair
    //after loop return the result
    //collects data how?
    return; //obj
  }
}
