import Popup from "./Popup.js";
 
this._submitButton = this._popupform.querySelector(".modal__submit-button");


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
  };
}
