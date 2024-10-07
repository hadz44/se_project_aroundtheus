const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Elements */

const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#add-card-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  "#modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDesciption = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardsWrap = document.querySelector(".cards__list");
const previewImage = document.querySelector("#modal-image");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalClose = document.querySelector("#preview-modal-close");
const imageTitle = document.querySelector("#preview-title");
const cardSelector = "#card-template";
const cardListEl = document.querySelector(".cards__list");

/* Function */

function closePopupEsc(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopup(modalOpened);
  }
}

function closePopupOverlay(e) {
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget);
  }
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopupEsc);
  modal.removeEventListener("mousedown", closePopupOverlay);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closePopupEsc);
  modal.addEventListener("mousedown", closePopupOverlay);
}

function handleImageClick(card) {
  previewImage.src = card.link;
  previewImage.alt = card.name;
  imageTitle.textContent = card.name;
  openPopup(previewImageModal);
}

/* Event Handler */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDesciption.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  console.log("Card Data:", { name, link }); // Debugging: Log card data
  renderCard({ name, link }, cardsWrap);
  closePopup(addCardModal);
  e.target.reset();
}

/* Validation Functions */

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("modal__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__error_visible");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("modal__input_type_error");
  errorElement.classList.remove("modal__error_visible");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal__button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("modal__button_disabled");
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDesciption.textContent;
  openPopup(profileEditModal);
});
addCardButton.addEventListener("click", () => openPopup(addCardModal));
profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);
previewImageModalClose.addEventListener("click", () =>
  closePopup(previewImageModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* Render Card Function */
function renderCard(card, container) {
  const template = document.querySelector(cardSelector);
  console.log("Template:", template); // Debugging: Log template element
  if (template) {
    const clone = document.importNode(template.content, true);
    clone.querySelector(".card__image").src = card.link;
    clone.querySelector(".card__image").alt = card.name;
    clone.querySelector(".card__title").textContent = card.name;

    // Add delete button functionality
    const deleteButton = clone.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      const cardElement = deleteButton.closest(".card");
      if (cardElement) {
        cardElement.remove();
      }
    });

    // Add like button functionality
    const likeButton = clone.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    // Add image click functionality
    const imageElement = clone.querySelector(".card__image");
    imageElement.addEventListener("click", () => {
      handleImageClick(card);
    });

    console.log("Card Clone:", clone); // Debugging: Log card clone
    container.appendChild(clone);
    console.log("Card appended to container:", container); // Debugging: Log container
  } else {
    console.error("Card template not found");
  }
}

/* Render Initial Cards */
function renderInitialCards() {
  initialCards.forEach((card) => {
    renderCard(card, cardsWrap);
  });
}

/* Initialize */
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  renderInitialCards();
  enableValidation(config);
});
