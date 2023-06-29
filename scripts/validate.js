// pass all the settings on call
const errorMessage = "Please fill out this field";
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { errorClass, inputErrorClass }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  //errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
const hideInputError = (
  formElement,
  inputElement,
  { errorClass, inputErrorClass }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //profile-input-error;
  inputElement.classList.remove(inputErrorClass);

  errorElement.classList.remove(errorClass);
};
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    //show input error
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    //hide input error
    hideInputError(formElement, inputElement, config);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};
const setEventListeners = (formElement, config) => {
  const inputList = [...formElement.querySelectorAll(config.inputSelector)];
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  // create loop for each input & check validation
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      // create loop for each input & check validation
      checkInputValidity(formElement, inputElement, config);
    });
  });
  // toggle button state submit (grey or not allowed)
  toggleButtonState(inputList, buttonElement, config);
};

const enableValidation = (config) => {
  const formElements = [...document.querySelectorAll(config.formSelector)];
  formElements.forEach((formElements) => {
    formElements.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    setEventListeners(formElements, config);
  });
};

//setEventListeners(formElement, options);

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
