export default class Popup {
  constructor({ popupSelector }) {
    
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".modal__close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    // opens popup
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    // closes popup
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
    // listens for the escape button
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    // sets event listeners
  }

  this._popup.addEventListener("click", (evt) => {
    if (evt.target === e.currentTarget) {
      this.close();
    }
  });
}

