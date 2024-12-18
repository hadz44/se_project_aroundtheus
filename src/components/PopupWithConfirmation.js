import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    const popupElement = document.querySelector(popupSelector);
    if (!popupElement) {
      throw new Error(`Element with selector "${popupSelector}" not found.`);
    }
    super({ popupSelector: popupSelector });
    this._popupform = popupElement.querySelector(".modal__form");
    this._submitButton = this._popupform.querySelector(".modal__submit-button");
    this._submitButtonText = this._submitButton.textContent;
    this._handleForSubmit = null;
  }

  setSubmitAction(action) {
    this._handleForSubmit = action;
  }

  setLoading(submit, loadingText = "Deleting...") {
    if (submit) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    this._popupform.addEventListener("submit", (e) => {
      e.preventDefault();
      if (typeof this._handleForSubmit === "function") {
        this._handleForSubmit();
      } else {
        console.error("Submit action is not defined or not a function");
      }
    });
    super.setEventListeners();
  }
}
