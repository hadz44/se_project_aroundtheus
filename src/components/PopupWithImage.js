import { Popup } from "./Popup.js";

export default class PopupWIthImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupSrc = this._popupElement.querySelector(".modal__picture");
    this._popupCap = this._popupElement.querySelector(".modal__caption");
  }
  open(data) {
    this._popupSrc.src = data.link;
    this._popupSrc.alt = data.alt;
    this._popupCap.textContent = data.name;
    super.open();
  }
}
