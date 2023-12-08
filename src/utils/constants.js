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
const previewImageModal = document.querySelector("#view-card-modal");
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
const avatarForm = document.querySelector("#update-avatar-form");

export {
  profileEditModal,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  cardTemplate,
  cardListEl,
  addNewCardModal,
  addCardFormElement,
  cardTitleInput,
  cardUrlInput,
  previewImageModal,
  imagePreview,
  imageCaption,
  avatar,
  deleteCardModal,
  avatarEditImg,
  editProfileForm,
  addNewCardButton,
  avatarEditButton,
  profileEditBtn,
  avatarSaveButton,
  deleteCardButton,
  avatarCloseButton,
  avatarForm,
};
