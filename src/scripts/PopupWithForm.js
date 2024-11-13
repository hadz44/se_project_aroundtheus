import { pop } from "core-js/core/array";
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
  super({popupSelector});
  this._popupElement.querySelector('.popup__form');
  this._handleFormSubmit = handleFormSubmit;


  }

  close() {
   this.popupForm.reset();
    super.close(); 
  }
}

//index.js

const newCardPopup = new PopupWithForm('#new-card-popup', () => {;
newCardPopup.open()

newCardPopup.close();
