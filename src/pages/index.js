import "./index.css";

// Import all classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  initialCards,
  selectors,
  validationSettings,
} from "../utils/constants.js";
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
  const card = new Card(data, "#card-template", openPreviewModal);
  return card.getView();
}

const cardSection = new Section({
  renderer: (item) => {
    const cardEl = createCard(item);
    cardSection.addItem(cardEl);
  },
  selector: selectors.cardSelection,
});
cardSection.renderItems(initialCards);

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

const userInfo = new UserInfo({
  userName: ".profile__title",
  userJob: ".profile__description",
});

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditButton = document.querySelector("#profile-edit-button");
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  profileModal.open();
});

const addCardButton = document.querySelector("#add-card-button");
addCardButton.addEventListener("click", () => {
  addCardModal.open();
});

// Select the form elements
const cardAddForm = document.querySelector("form[name='add-card-form']");
const profileEditForm = document.querySelector(
  "form[name='profile-edit-form']"
);

// Form validation
const addCardFormValidator = new FormValidator(validationSettings, cardAddForm);
addCardFormValidator.enableValidation();

const profileEditFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
profileEditFormValidator.enableValidation();
