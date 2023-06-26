// enabling validation by calling enableValidation()
// pass all the settings on call
// popup class???

function setEventListeners(formEl, options) {
  const { inputSelector } = options; //What is this???
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    //???
    inputEl.addEventListener("input");
  });
}

function enableValidation() {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", () => {
      e.preventDefault();
    });

    // look for all inputs inside of form
    // loop through all inputs to make sure they're valid
    // if input is invalid, get validation message
    // add error class to input
    // display error message
    // disable button

    // if all inputs are valid
    // enable button
    // reset error messages
  });
}

setEventListeners(formElement, options);
//Where did FormElement come from???

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
