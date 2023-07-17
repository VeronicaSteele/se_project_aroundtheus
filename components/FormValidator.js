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

	_showInputError(inputElement, errorMessage) {
		const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._errorClass);
	}

	_hideInputError(inputElement, errorMessage) {
		const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.remove(this._inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.remove(this._errorClass);
	}

	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	}

	//What to do w/this function???
	_toggleButtonState() {
		if (hasInvalidInput(inputList)) {
			buttonElement.classList.add(config.inactiveButtonClass);
			buttonElement.disabled = true;
		} else {
			buttonElement.classList.remove(config.inactiveButtonClass);
			buttonElement.disabled = false;
		}
	}

	_setEventListeners() {
		this._inputList = [...this._form.querySelectorAll(this._inputSelector)]; //Do we need config here?
		this._buttonElement = this._form.querySelector(this._submitButtonSelector);
		toggleButtonState(inputList, buttonElement, config);

		inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", () => {
				checkInputValidity(this._form, inputElement, config);
				toggleButtonState(inputList, buttonElement, config);
			});
		});
	}

	enableValidation() {
		this._setEventListeners();
		this._form.addEventListener("submit", function (evt) {
			evt.preventDefault();
		});
		this._toggleButtonState();
		//setEventListeners(formElement, config);
	}
}

//const editFormValidator = new FormValidator();
//editFormValidator.enableValidation();

export default FormValidator;
