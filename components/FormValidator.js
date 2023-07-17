class FormValidator {
	constructor(settings, formElement) {
		this._formElement = formElement;
		this._inputSelector = settings.inputSelector;
		this._submitButtonSelector = settings.submitButtonSelector;
		this._inactiveButtonClass = settings.inactiveButtonClass;
		this._inputErrorClass = settings.inputErrorClass;
		this._errorClass = settings.errorClass;
		this._inputList = Array.from(
			this._formElement.querySelectorAll(this._inputSelector),
		);
		this._submitButton = this._formElement.querySelector(
			this._submitButtonSelector,
		);
	}

	_showInputError(inputElement, errorMessage) {
		const errorElement = this._formElement.querySelector(
			`#${inputElement.id}-error`,
		);
		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._errorClass);
	}

	_hideInputError(inputElement, errorMessage) {
		const errorElement = this._formElement.querySelector(
			`#${inputElement.id}-error`,
		);
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
			submitButton.classList.add(config.inactiveButtonClass);
			submitButton.disabled = true;
		} else {
			submitButton.classList.remove(config.inactiveButtonClass);
			submitButton.disabled = false;
		}
	}

	_setEventListeners() {
		//this._inputList = [...this._formElement.querySelectorAll(this._inputSelector)]; //Do we need config here?
		//this._buttonElement = this._formElement.querySelector(
		//this._submitButtonSelector,
		//);
		//toggleButtonState(inputList, submitButton, config);
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", () => {
				//checkInputValidity(this._formElement, inputElement, config);
				this._checkInputValidity(inputElement);
				//toggleButtonState(inputList, submitButton, config);
				this._toggleButtonState();
			});
		});
	}

	enableValidation() {
		this._setEventListeners();
		this._formElement.addEventListener("submit", function (evt) {
			evt.preventDefault();
		});
		this._toggleButtonState();
		//setEventListeners(formElement, config);
	}
}

//const editFormValidator = new FormValidator();
//editFormValidator.enableValidation();

export default FormValidator;
