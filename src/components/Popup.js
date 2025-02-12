export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  //open method
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  //close method
  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //for escape button
  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}
