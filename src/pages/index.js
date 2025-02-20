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
import { 
  initialCards,
  config,
} from "../utils/constants.js";

/*Variables*/
const profileAddbutton  = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModalEl = document.querySelector("#profile-edit-modal");
const addCardModalEl = document.querySelector("#add-card-modal");
const profileModalCloseButton =
  profileEditModalEl.querySelector(".modal__close");
const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardFormElement = addCardModalEl.querySelector(".modal__form");
const profileEditForm = profileEditModalEl.querySelector(".modal__form");
const profileTitleInput = document.querySelector("#title-input");
const profileDescriptionInput = document.querySelector("#description-input");
/*Linked Classes*/

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardsListEl = document.querySelector(".cards__list");

const cardSelector = "#card-template";

// const userInfo = new UserInfo({
//   profileTitle: ".profile__title",
//   profileDescription: ".profile__description",
//   avatarSelector: ".profile__image",
// });
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8c8b85bf-59a0-4ef6-bd12-8a446b1d2253",
    "Content-Type": "application/json",
  },
});
// let section; (removed duplicate declaration)

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => 
      { 
        const card = renderCard(cardData);
        section.addItem(card);
      },
  },
  ".cards__list"
);
//section.renderItems();
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    // section = new Section(
    //   {
    //     items: cards,
    //     renderer: (data) => {
    //       const cardEl = renderCard(data);
    //       section.addItem(cardEl);
    //     },
    //   },
    //   ".cards__list"
    // );
    section.renderItems(cards);
    userInfo.setUserInfo({
      title: user.name,
      description: user.about,
    });

    userInfo.setAvatar({ avatar: user.avatar });
  })
  .catch((err) => {
    console.log(err);
  });

if (profileAddbutton) {
  profileAddbutton.addEventListener("click", () => {
    addCardPopup.open();
  });
} else {
  console.error("profileAddButton not found in the DOM");
}

const popupWithEditProfileForm = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  config
);

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit,
  config
);
popupWithEditProfileForm.setEventListeners();
addCardPopup.setEventListeners();

const cardDeleteModal = new PopupWithConfirmation({
  popupSelector: "#delete-modal",
});


const deleteModalCloseButton = deleteModal.querySelector(
  ".modal__close_delete"
);

cardDeleteModal.setEventListeners();

function handleProfileEditSubmit(inputValues) {
  profileEditModal.setLoading(true);
  api
    .updateUserInfo(inputValues)
    .then((data) => {
      userInfo.setUserInfo({
        title: data.name,
        description: data.about,
      });
      profileEditModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileEditModal.setLoading(false);
    });
}

const previewImageModal = new PopupWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

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

<<<<<<< HEAD
function handleAddCardFormSubmit(inputValues) {
  addCardModal.setLoading(true);
  const cardData = {
    name: inputValues.name.trim(),
    link: inputValues.link.trim(),
  };

  if (!cardData.name || !cardData.link) {
    console.error("Name and link are required fields");
    addCardModal.setLoading(false);
    return;
  }

  api
    .addCard(cardData)
    .then((data) => {
      const cardEl = renderCard(data);
      section.addItem(cardEl);
      addCardModal.resetForm();
      addFormValidator.disableButton();
      addCardModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardModal.setLoading(false);
    });
}

function handleAvatarSubmit(url) {
  profileAvatarModal.setLoading(true);
  api
    .updateAvatar({ url })
    .then((data) => {
      userInfo.setAvatar(data);
      avatarFormValidator.disableButton();
      profileAvatarModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileAvatarModal.setLoading(false);
    });
}

const popupWithAddCardForm = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  popupWithEditProfileForm.open();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
});

addNewCardButton.addEventListener("click", () => {
  popupWithAddCardForm.open();
});

const popupWithImage = new PopupWithImage("#preview-image-modal");

=======
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
>>>>>>> 9220480c71801717a28aa1962ada7ee34d688bed

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

const deleteModalCloseButton = deleteModal.querySelector(
  ".modal__close-button"
);

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
