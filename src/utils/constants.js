import Api from "../components/API";
import UserInfo from "../components/UserInfo";
import Popup from "../components/Popup";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";
import {
  handleAddCardFormSubmit,
  handleProfileEditSubmit,
  handleAvatarSubmit,
} from "../pages";
/*-----------------------------------------------------------------*/
/*                          Constants                              */
/*-----------------------------------------------------------------*/

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector("#profile__title");
const profileDescription = document.querySelector("#profile__description");
const profileTitleInput = document.querySelector("#title-input");
const profileDescriptionInput = document.querySelector("#profile-description");
// const profileEditForm = profileEditModal.querySelector(".modal__form");
// const cardTemplate = document
//   .querySelector("#card-template")
//   .content.querySelector(".card__list");
// const cardListEl = document.querySelector(".card__item");
const addNewCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addNewCardModal.querySelector("#add-card-form");
const cardTitleInput = addCardFormElement.querySelector("#modal-add");
// const cardUrlInput = addCardFormElement.querySelector("#url-input");
// const previewImageModal = document.querySelector("#view-card-modal");
// const imagePreview = previewImageModal.querySelector(
//   ".modal__image-container_popup"
// );
// const imageCaption = previewImageModal.querySelector(
//   ".modal__image-container_heading"
// );
const avatar = document.querySelector("#avatar-url");
// const deleteCardModal = document.querySelector("#delete-card-modal");
const avatarEditImg = document.querySelector(".profile__img");
const editProfileForm = document.querySelector("#profile-edit-form");

/*                           Buttons                               */

const addNewCardButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector("#avatar-edit-button");
const profileEditBtn = document.querySelector("#profile-edit-button");
// const avatarSaveButton = document.querySelector("#save-avatar-update");
//const deleteCardButton = document.querySelector(".card__delete-button"); // we don't use this variable
const avatarCloseButton = document.querySelector("#avatar-modal-close-button");
const avatarForm = document.querySelector("#update-avatar-form");
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9998c541-50a6-4c3b-9b08-c9921babcb2b",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(profileTitle, profileDescription, avatarEditImg);

const deletePopup = new PopupWithConfirmation("#delete-card-modal");

const editProfileFormValidator = new FormValidator(
  validationSettings,
  editProfileForm
);

const addCardFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

const newImagePopup = new PopupWithImage("#view-card-modal");

const newCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

const newProfileEdit = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const newAvatarEdit = new PopupWithForm(
  "#edit-avatar-modal",
  handleAvatarSubmit
);

export {
  profileEditModal,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  // profileEditForm,
  // cardTemplate,
  // cardListEl,
  addNewCardModal,
  addCardFormElement,
  cardTitleInput,
  // cardUrlInput,
  // previewImageModal,
  // imagePreview,
  // imageCaption,
  avatar,
  // deleteCardModal,
  avatarEditImg,
  editProfileForm,
  addNewCardButton,
  avatarEditButton,
  profileEditBtn,
  // avatarSaveButton,
  //deleteCardButton,
  avatarCloseButton,
  avatarForm,
  validationSettings,
  api,
  userInfo,
  deletePopup,
  editProfileFormValidator,
  addCardFormValidator,
  newImagePopup,
  newCardPopup,
  newProfileEdit,
  newAvatarEdit,
};
