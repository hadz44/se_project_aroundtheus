import "./index.css";

// Import all classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards, selectors, config } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// Initialize the image modal first
const imageModal = new PopupWithImage("#preview-image-modal");
imageModal.setEventListeners();

function openPreviewModal(cardData) {
  imageModal.open(cardData);
}

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    openPreviewModal,
    handleDeleteAction
  );
  return card.getView();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardEl = createCard(item);
      cardSection.addItem(cardEl);
    },
  },
  ".cards__list"
);
cardSection.renderItems(initialCards);

function handleDeleteAction() {
  confirmationModal.open();
}
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

const confirmationModal = new PopupWithConfirmation({
  popupSelector: "#delete-modal",
  handleFormSubmit: () => {
    cardSection.removeItem();
    confirmationModal.close();
  },
});

// Other modal and form initializations
const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (formData) => {
    const newCard = createCard(formData);
    cardSection.addItem(newCard);
    addCardModal.close();
  },
});

addCardModal.setEventListeners();

const profileModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    profileModal.close();
  },
});
profileModal.setEventListeners();

const avatarModal = new PopupWithForm({
  popupSelector: "#avatar-modal",
  handleFormSubmit: (formData) => {
    userInfo.setAvatar({ avatar: formData.url });
    avatarModal.close();
  },
});
avatarModal.setEventListeners();

const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
  setAvatar: ".profile__image",
});

const profileTitleInput = document.querySelector("#title-input");
const profileDescriptionInput = document.querySelector("#description-input");

const profileEditButton = document.querySelector("#profile-edit-button");
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  profileModal.open();
});

const addCardButton = document.querySelector("#modal__close");
addCardButton.addEventListener("click", () => {
  addCardModal.open();
});

const avatarButton = document.querySelector(".avatar__button");
avatarButton.addEventListener("click", () => {
  avatarModal.open();
});

// Select the form elements
const cardAddForm = document.querySelector("#add-card-form");
const profileEditForm = document.querySelector("#profile-edit-form");

// Form validation
const addCardFormValidator = new FormValidator(config, cardAddForm);
addCardFormValidator.enableValidation();

const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

const deleteModalCloseButton = deleteModal.querySelector(
  ".modal__close-button"
);

deleteModalCloseButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

const deleteModalCancelButton = deleteModal.querySelector(
  ".modal__submit-cancel"
);

deleteModalCancelButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

enableValidation(settings);
