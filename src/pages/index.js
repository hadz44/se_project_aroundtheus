import "./index.css";

// Import all classes
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

// Initialize the image modal first
const imageModal = new PopupWithImage("#image-preview-modal");
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
  nameSelector: ".profile__title",
  infoSelector: ".profile__description",
});

const profileEditButton = document.querySelector("#profile-edit-button");
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.info;
  profileModal.open();
});

const addCardButton = document.querySelector("#add-card-button");
addCardButton.addEventListener("click", () => {
  addCardModal.open();
});

// Form validation
const addCardFormValidator = new FormValidator(validationSettings, cardAddForm);
addCardFormValidator.enableValidation();

const profileEditFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
profileEditFormValidator.enableValidation();
