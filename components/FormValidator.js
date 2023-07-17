class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.formSelector;
    //formSelector: ".modal__form",
    this._submitButtonSelector = settings.submitButtonSelector;
    //submitButtonSelector: ".modal__button",
    this._inactiveButtonClass = settings.inactiveButtonClass;
    //inactiveButtonClass: "modal__button_disabled",
    this._inputErrorClass = settings.inputErrorClass;
    //inputErrorClass: "modal__input_type_error",
    this._errorClass = settings.errorClass;
    //errorClass: "modal__error_visible",
    this._form = formElement;
  }
}

const editFormValidator = new FormValidator();
