export default class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    // opens popup
  }

  close() {
    // closes popup
  }

  _handleEscClose(e) {
    // listens for the escape button
  }

  setEventListeners() {
    // sets event listeners
  }
}
