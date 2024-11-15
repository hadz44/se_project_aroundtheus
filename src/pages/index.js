import "./index.css";

//import all classes

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  initialCards,
  selectors,
  validationSettings,
  cardAddForm,
  profileEditForm,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/userinfo.js";

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

function createCard(data) {
  const card = new Card(data, "#card-template", openPreviewModal);
  return card.getView();
}

const cardList = new Section({
  renderer: (item) => {
    const cardEl = createCard(item);
    cardSection.addItem(ardEl);
  },
  selector: selectors.cardSelection,
});
cardSection.renderItems(initialCards);

//-----------------------------------------------------------------------------------------------------
//Image Modal
const imageModal = new PopupWithImage(".#image-preview-modal");
imageModal.setEventListeners();

function openPreviewModal(cardData) {
  imageModal.open(cardData);
}

//----------------------------------------------------------------
// Add Card Modal

//cardAddModal validation
const cardAddFormValidator = new FormValidator(validationSettings, cardAddForm);
cardAddFormValidator.enableValidation();

// Function to handle form submission and add a new card
function handleAddCardSubmit({ title, url }) {
  // const { title, url } = formValues;
  const newCardData = { name: title, link: url };
  const newCard = createCard(newCardData);
  cardSection.addItem(newCard);

  newCardModal.close();
  cardAddFormValidator.disableButton();
}

// Instance of PopupWithForm for adding a new card
const newCardModal = new PopupWithForm("#card-add-modal", handleAddCardSubmit);
newCardModal.setEventListeners();

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  newCardModal.open();
});

//----------------------------------------------------------------
// Profile edit Modal

//Profile Modal validation
const editProfileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editProfileFormValidator.enableValidation();

// Function to handle form submission and update the profile
function handleProfileFormSubmit(input) {
  userInfo.setUserInfo(input);
  profileModal.close();
}

// create an instance of PopupWithForm for the profile modal
const profileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
profileModal.setEventListeners();

// open the profile modal on button click
const openProfileModalButton = document.querySelector(".profile__edit-button");
openProfileModalButton.addEventListener("click", () => {
  const input = userInfo.getUserInfo();
  profileModal.setInputValues(input);
  editProfileFormValidator.resetValidation();
  profileModal.open();
});

//userInfo
const profileName = ".profile__title";
const profileDescription = ".profile__description";
// Create user info instance
const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileDescription,
});

//----------------------------------------------------------------
/*Elements*/

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

/*Function*/

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

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

function handleImageClick(card) {
  previewImage.src = card.link;
  previewImage.alt = card.name;
  imageTitle.textContent = card.name;
  openPopup(previewImageModal);
}

/*Event Handler*/

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
  renderCard({ name, link }, cardsWrap);
  closePopup(addCardModal);
  e.target.reset();
}

/*Event Listeners*/

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

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
