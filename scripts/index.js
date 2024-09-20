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
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
// Elements
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditmodal = document.querySelector("#profile-edit-modal");

const cardAddModal = document.querySelector("#card-add-modal");

const profileEditModalCloseBtn = profileEditmodal.querySelector(
  "#profile-edit-modal-close"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// form data input elements
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = cardAddModal.querySelector("#card-title-input");
const cardUrlInput = cardAddModal.querySelector("#card-url-input");

const profileEditForm = profileEditmodal.querySelector("#profile-edit-form");
const cardAddForm = cardAddModal.querySelector("#card-add-form");
const cardListEl = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addNewCardBtn = document.querySelector(".profile__add-button");
const closeNewCardBtn = document.querySelector("#profile-add-modal-close");

const previewImageModal = document.querySelector("#image-preview-modal");
const previewModalImage = document.querySelector(".modal__preview-image");
const previewCloseModal = previewImageModal.querySelector(
  "#preview-modal-close"
);
const previewCaption = document.querySelector(".modal__image-caption");

//Function
function closePopUp(modal) {
  modal.classList.toggle("modal_opened");
}
function openPopUp(modal) {
  modal.classList.add("modal_opened");
}
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditmodal);
}
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopUp(cardAddModal);

  // cardTitleInput.value = '';
  // cardUrlInput.value = '';
  cardAddForm.reset();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openPopUp(previewImageModal);
    previewModalImage.src = cardData.link;
    previewModalImage.alt = cardData.name;
    previewCaption.textContent = cardData.name;
  });
  // Set image and title
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

//Event Listeners
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditmodal);
});
// profileEditModalCloseBtn.addEventListener('click', () => closePopUp(profileEditmodal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleAddCardSubmit);

addNewCardBtn.addEventListener("click", () => openPopUp(cardAddModal));

// closeNewCardBtn.addEventListener('click', () => closePopUp(cardAddModal));
// previewCloseModal.addEventListener('click', () => {
//   closePopUp(previewImageModal);
// });

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// Find all close buttons
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closePopUp(popup));
});
