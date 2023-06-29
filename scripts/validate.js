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
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
const hideInputError = (
  formElement,
  inputElement,
  { errorClass, inputErrorClass }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //profile-input-error;
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = errorMessage;
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
};

function enableValidation(config) {
	const formElements = [...document.querySelectorAll(config.formSelector)];
	formElements.forEach((formElements) => {
		formElements.addEventListener("submit", (e) => {
			e.preventDefault();
		});
		setEventListeners(formElements, config);
	});
}

    // if all inputs are valid
    // enable button
    // reset error messages
    setEventListeners(formElement, config);
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
