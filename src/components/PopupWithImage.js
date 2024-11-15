import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, imageSelector, captionSelector }) {
    super({ popupSelector });
    this._imageEL = this._popup.querySelector(".modal__image");
    this._captionEL = this._popup.querySelector(".modal__caption");
  }

  open(cardData) {
    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    this._caption.textContent = cardData.name;
    super.open();
  }
}
