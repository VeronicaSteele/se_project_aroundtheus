import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

/*-----------------------------------------------------------------*/
/*                          Constants                              */
/*-----------------------------------------------------------------*/

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector("#profile__title");
const profileDescription = document.querySelector("#profile__description");
const profileTitleInput = document.querySelector("#title-input");
const profileDescriptionInput = document.querySelector("#profile-description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card__list");
const cardListEl = document.querySelector(".card__item");
const addNewCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addNewCardModal.querySelector("#add-card-form");
const cardTitleInput = addCardFormElement.querySelector("#modal-add");
const cardUrlInput = addCardFormElement.querySelector("#url-input");
export const previewImageModal = document.querySelector("#view-card-modal");
const imagePreview = previewImageModal.querySelector(
  ".modal__image-container_popup"
);
const imageCaption = previewImageModal.querySelector(
  ".modal__image-container_heading"
);
const avatar = document.querySelector("#avatar-url");
const deleteCardModal = document.querySelector("#delete-card-modal");
const avatarEditImg = document.querySelector(".profile__img");
const editProfileForm = document.querySelector("#profile-edit-form");

/*                           Buttons                               */

const addNewCardButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector("#avatar-edit-button");
const profileEditBtn = document.querySelector("#profile-edit-button");
const avatarSaveButton = document.querySelector("#save-avatar-update");
const deleteCardButton = document.querySelector(".card__delete-button"); // we don't use this variable
const avatarCloseButton = document.querySelector("#avatar-modal-close-button");

/*-----------------------------------------------------------------*/
/*                             API                                 */
/*-----------------------------------------------------------------*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9998c541-50a6-4c3b-9b08-c9921babcb2b",
    "Content-Type": "application/json",
  },
});

// UserInfo
const userInfo = new UserInfo(profileTitle, profileDescription, avatarEditImg);

// delete confirmation modal
const deletePopup = new PopupWithConfirmation("#delete-card-modal");
deletePopup.setEventListeners();

let section;

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const cardEl = renderCard(cardData);
          section.addItem(cardEl);
        },
      },
      ".card__item"
    );
    section.renderItems();
  })

  .catch((error) => {
    console.error(error);
  });
//
api.getUserInfo().then((user) => {
  userInfo.setAvatarImg({ avatar: user.avatar });
  userInfo.setUserInfo({ name: user.name, about: user.about });
});

//

// api.editUserInfo({ name, about: description }).then((userData) => {
//   userInfo.setUserInfo(userData.name, userData.description);
// });
//

// api.deleteCard()

/*-----------------------------------------------------------------*/
/*                             Validation                          */
/*-----------------------------------------------------------------*/

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editProfileFormValidator = new FormValidator(
  validationSettings,
  editProfileForm
);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);
addCardFormValidator.enableValidation();
/*-----------------------------------------------------------------*/
/*                             New Instances                       */
/*-----------------------------------------------------------------*/

//New Image Popup
const newImagePopup = new PopupWithImage("#view-card-modal");
newImagePopup.setEventListeners();
function renderCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  );
  return card.getView();
}

function handleLikeClick(card) {
  const action = card._isLiked
    ? api.removeLike.bind(api)
    : api.likeCard.bind(api);
  action(card._id)
    .then((res) => {
      card.updateLikes(res.isLiked);
    })
    .catch((err) => {
      console.error(err);
    });
}

// need an if/else statement that checks whether the card is currently liked or not.
//hint: isLiked is true then we want to tell the server to remove a like
// else we tell the server to remove the like
// when finished, (inside .then) update view of heart button

//New Card Popup
const newCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();
addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  newCardPopup.openModal();
});

//Profile Edit Popup
const newProfileEdit = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
newProfileEdit.setEventListeners();

//Avatar Edit Popup
const newAvatarEdit = new PopupWithForm(
  "#edit-avatar-modal",
  handleAvatarSubmit
);
avatarEditButton.addEventListener("click", () => {
  newAvatarEdit.openModal();
});
const editAvatarValidator = new FormValidator(
  validationSettings,
  editProfileForm
);

/*-----------------------------------------------------------------*/
/*                   "Handle" Functions                            */
/*-----------------------------------------------------------------*/

function handleProfileEditSubmit(inputValues) {
  console.log(inputValues);
  api.editUserInfo(inputValues).then(() => {
    userInfo.setUserInfo({
      name: inputValues.title,
      about: inputValues.description,
    });
    newProfileEdit.closeModal();
  });
}

function handleAvatarSubmit(inputValues) {
  api.updateAvatar(inputValues.link).then((user) => {
    userInfo.setAvatarImg(user);
  });
  newAvatarEdit.closeModal();
}

function handleAddCardFormSubmit(inputValues) {
  api.addNewCard(inputValues).then((card) => {
    const cardEl = renderCard(card);
    section.addItem(cardEl);
    newCardPopup.closeModal();
  });
}

function handleDeleteClick(
  card /* here we receive data about the card from Card.js */
) {
  console.log(card);
  deletePopup.openModal();
  deletePopup._setConfirmation(() => {
    api.remove(data).then((res) => {
      card.removeCard();
      deletePopup.closeModal();
    });
  });
  /**
   * the goal is to provide the data from the card we received here as an argument to the confirmation modal
   * that will allow you to send the remove request to the server with an exact card data you need
   * plan:
   * 1. make an API request to the server to remove the card
   * 2. in the ".then" section to the previous request we need to delete the card from DOM
   */
}

function handleCardClick(name, link) {
  newImagePopup.openModal({ name, link });
}

avatarCloseButton.addEventListener("click", () => {
  newAvatarEdit.closeModal();
});

/*-----------------------------------------------------------------*/
/*                      Event Listeners                            */
/*-----------------------------------------------------------------*/
profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name.trim();
  profileDescriptionInput.value = userData.description.trim();
  newProfileEdit.openModal();
});
