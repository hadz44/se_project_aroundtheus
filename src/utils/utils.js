import { is } from "core-js/core/object";

export const imageModalWindow = document.querySelector(".popup__image");
export const imageCaption = imageModalWindow.querySelector(".popup__caption");

export const closeModal = (modalWindow) => {
  modalWindow.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleEscUp);
};

export const openModal = (modalWindow) => {
  modalWindow.classList.add("popup_opened");
  document.addEventListener("keyup", handleEscUpEsc);
};

export const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModal);
};

export const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    action(activePopup);
  }
};

// export function closePopup(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeModalOn Event);
//   modal.removeEventListener("click", closeModalOneEvent);
// }
