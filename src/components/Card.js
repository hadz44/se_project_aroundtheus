export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick
  ) {
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._setEventListeners = this._setEventListeners.bind(this);
  }
  

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  handleDeleteButton() {
    this._cardElement.remove();
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardImage.id = this._id;
    cardImage.isLiked = this._isLiked;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
