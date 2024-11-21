export default class FormValidator {
  constructor(config, formEl) {
    this._config = config;
    this._formElement = formEl;
    this._inputEls = [
      ...this._formElement.querySelectorAll(this._config.inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _checkInputValidity(formEl, inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(this._formElement, inputEl, this._config);
    } else {
      this._hideInputError(this._formElement, inputEl, this._config);
    }
  }

  _showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }

  _hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }

  _setEventListeners(formEl) {
    const { inputSelector, submitButtonSelector } = this._config;

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(this._formElement, inputEl);
        this.toggleButtonState(
          this._inputEls,
          this._submitButton,
          this._config
        );
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.disableButton(this._submitButton, this._config.inactiveButtonClass);
    });
    this._setEventListeners();
  }

  toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    let foundInvalid = false;
    inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }
    });

    if (foundInvalid) {
      this.disableButton(submitButton, inactiveButtonClass);
    } else {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  disableButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}
