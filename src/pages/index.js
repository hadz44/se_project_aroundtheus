import Api from "../components/Api.js";
import "../pages/index.css";

// Import all classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
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
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLike
  );
  return card.getView();
}

function renderCard(carddata) {
  const cardInstance = new Card(
    carddata,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLike
  );
  return cardInstance.getView();
}

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


const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
});

popupWithEditProfileForm.setEventListeners();
popupWithAddCardForm.setEventListeners();
popupWithImage.setEventListeners();

function handleImageClick(data) {
  popupWithImage.open({ name: data.name, link: data.link });
}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData) {
  console.log(cardData);
  const cardElement = getCardElement(cardData);
  section.addItem(cardElement);
}

function handleDeleteCard(cardInstance) {
  cardDeleteModal.open();
  cardDeleteModal.setSubmitAction(() => {
    cardDeleteModal.setLoading(true, "Deleting...");
    api
      .deleteCard(cardInstance.id)
      .then(() => {
        cardInstance.handleDeleteButton();
        cardDeleteModal.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardDeleteModal.setLoading(false, "Yes");
      });
  });
}

function handleLike(cardInstance) {
  if (cardInstance.isLiked) {
    api
      .dislikeCard(cardInstance.id)
      .then((data) => {
        cardInstance.setIsLiked(false);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(cardInstance.id)
      .then((data) => {
        cardInstance.setIsLiked(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
/*Event Handlers*/

function handleProfileEditSubmit({ title, description }) {
  console.log(title, description);
  userInfo.setUserInfo({
    name: title,
    description: description,
  });
  console.log(userInfo.getUserInfo());
  popupWithEditProfileForm.close();
}

function handleAddCardFormSubmit(inputValue) {
  const cardData = {
    name: inputValue.title,
    link: inputValue.url,
  };
  renderCard(cardData);
  addCardFormElement.reset();
  addFormValidator.disableButton();
  popupWithAddCardForm.close();
}

//Validation

const editFormValidator = new FormValidator(config, profileEditForm);

const addFormValidator = new FormValidator(config, addCardFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
