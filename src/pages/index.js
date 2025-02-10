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
import Api from "../components/Api.js";

// Initialize the image modal first
const imageModal = new PopupWithImage("#preview-image-modal");
imageModal.setEventListeners();

function openPreviewModal(cardData) {
  imageModal.open(cardData);
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8c8b85bf-59a0-4ef6-bd12-8a446b1d2253",
    "Content-Type": "application/json",
  },
});
function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    openPreviewModal,
    handleDeleteAction
  );
  return card.getView();
}

function handleDeleteAction(card) {
  confirmationModal.open();
  confirmationModal.setSubmitAction(() => {
    card._handleDeleteAction();
    confirmationModal.close();
  });
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

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

const confirmationModal = new PopupWithConfirmation({
  popupSelector: "#delete-modal",
});
confirmationModal.setEventListeners();

// Other modal and form initializations
const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (formData) => {
    const newCard = createCard({ name: formData.title, link: formData.url });
    cardSection.addItem(newCard);
    addCardModal.close();
  },
});

addCardModal.setEventListeners();

api.getUserInfoAndCards().then(([cards, userData]) => {
  cardSection.renderItems(cards);

  userInfo.setUserInfo({ title: userData.name, description: userData.about });
});

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

const avatarForm = document.querySelector(".profile__avatar-form");

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

deleteModalCloseButton.addEventListener("click", () => {
  confirmationModal.close();
});

const deleteModalCancelButton = deleteModal.querySelector(
  ".modal__submit-button-cancel"
);

deleteModalCancelButton.addEventListener("click", () => {
  confirmationModal.close();
});

// avatarForm.addEventListener("submit", handleAvatarSubmit);
// deleteForm.addEventListener("submit", handleDeleteSubmit);
// profileFormElement.addEventListener("submit", handleProfileFormSubmit);
// cardForm.addEventListener("submit", handleAddCardSubmit);

// enableValidation(settings);
