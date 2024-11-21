import { is } from "core-js/core/object";

export const imageModalWindow = document.querySelector(".modal__image");
export const imageCaption = imageModalWindow.querySelector(".modal__caption");

export const closeModal = (modalWindow) => {
  modalWindow.classList.remove("modal__opened");
  document.removeEventListener("keyup", handleEscUp);
};

export const openModal = (modalWindow) => {
  modalWindow.classList.add("modal__opened");
  document.addEventListener("keyup", handleEscUpEsc);
};

export const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModal);
};

export const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector(".modal_opened");
  if (evt.key === "Escape") {
    action(activePopup);
  }
};

// export function closemodal {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeModalOn Event);
//   modal.removeEventListener("click", closeModalOneEvent);
// }
