import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
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
} from "../utils/constants.js";

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
  avatarForm
  //is this where the validation gets tied in?
);
editAvatarValidator.enableValidation();

/*-----------------------------------------------------------------*/
/*                   "Handle" Functions                            */
/*-----------------------------------------------------------------*/

function handleProfileEditSubmit(inputValues) {
  newProfileEdit.setSaving(true);
  console.log(inputValues);
  api
    .editUserInfo(inputValues)
    .then(() => {
      userInfo.setUserInfo({
        name: inputValues.title,
        about: inputValues.description,
      });
      newProfileEdit.setSaving(false);
      newProfileEdit.closeModal();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleAvatarSubmit(inputValues) {
  newAvatarEdit.setSaving(true);
  api
    .updateAvatar(inputValues.link)
    .then((user) => {
      userInfo.setAvatarImg(user);
      newAvatarEdit.setSaving(false);
    })
    .catch((err) => {
      console.error(err);
    });

  newAvatarEdit.closeModal();
}

function handleAddCardFormSubmit(inputValues) {
  newCardPopup.setSaving(true);
  api
    .addNewCard(inputValues)
    .then((card) => {
      const cardEl = renderCard(card);
      section.addItem(cardEl);
      newCardPopup.closeModal();
      newCardPopup.setSaving(false);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleDeleteClick(card) {
  deletePopup.openModal();
  deletePopup._setConfirmation(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.removeCard();
        deletePopup.closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleCardClick(name, link) {
  newImagePopup.openModal({ name, link });
}

avatarCloseButton.addEventListener("click", () => {
  newAvatarEdit.closeModal();
});
console.log("test");
newAvatarEdit.setEventListeners();

/*-----------------------------------------------------------------*/
/*                      Event Listeners                            */
/*-----------------------------------------------------------------*/
profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name.trim();
  profileDescriptionInput.value = userData.description.trim();
  newProfileEdit.openModal();
});
