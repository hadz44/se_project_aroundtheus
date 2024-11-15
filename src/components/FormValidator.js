class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = formEl;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }

    this._hideInputError(inputEl);
  }

  _hasInvalidInput(inputEls) {
    return inputEls.some((inputEl) => !inputEl.validity.valid);
  }

  _toggleButtonState(inputEls, submitButton, config) {
    if (this._hasInvalidInput(inputEls)) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _setEventListeners() {
    this._inputEls = [
      ...this._form.querySelectorAll(this._config.inputSelector),
    ];
    this._submitButton = this._form.querySelector(
      this._config.submitButtonSelector
    );
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(
          this._inputEls,
          this._submitButton,
          this._config
        );
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.disableButton();
    });

    this._setEventListeners();
    this._toggleButtonState();
  }
}

export default FormValidator;
