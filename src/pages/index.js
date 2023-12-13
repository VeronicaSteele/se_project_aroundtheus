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
  validationSettings,

  // userInfo,
  // deletePopup,
  // editProfileFormValidator,
  // addCardFormValidator,
  // newImagePopup,
  // newCardPopup,
  // newProfileEdit,
  // newAvatarEdit,
  // editAvatarValidator,
} from "../utils/constants.js";

/*-----------------------------------------------------------------*/
/*                             API                                 */
/*-----------------------------------------------------------------*/
let section;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9998c541-50a6-4c3b-9b08-c9921babcb2b",
    "Content-Type": "application/json",
  },
});

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
api
  .getUserInfo()
  .then((user) => {
    userInfo.setAvatarImg({ avatar: user.avatar });
    userInfo.setUserInfo({ name: user.name, about: user.about });
  })
  .catch((err) => {
    console.error(err);
  });

/*-----------------------------------------------------------------*/
/*                             New Instances                       */
/*-----------------------------------------------------------------*/

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
const editAvatarValidator = new FormValidator(validationSettings, avatarForm);

/*-----------------------------------------------------------------*/
/*                             Validation                          */
/*-----------------------------------------------------------------*/

editProfileFormValidator.enableValidation();
editProfileFormValidator.resetValidation();

addCardFormValidator.enableValidation();

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
  const action = card.isLiked
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

newCardPopup.setEventListeners();
addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  newCardPopup.openModal();
});

//Profile Edit Popup

newProfileEdit.setEventListeners();

//Avatar Edit Popup

avatarEditButton.addEventListener("click", () => {
  newAvatarEdit.openModal();
});

editAvatarValidator.enableValidation();
editAvatarValidator.resetValidation();

/*-----------------------------------------------------------------*/
/*                   "Handle" Functions                            */
/*-----------------------------------------------------------------*/

export function handleProfileEditSubmit(inputValues) {
  newProfileEdit.setSaving(true);
  console.log(inputValues);
  api
    .editUserInfo(inputValues)
    .then(() => {
      userInfo.setUserInfo({
        name: inputValues.title,
        about: inputValues.description,
      });
      newProfileEdit.closeModal();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newProfileEdit.setSaving(false);
    });
}

export function handleAvatarSubmit(inputValues) {
  newAvatarEdit.setSaving(true);
  api
    .updateAvatar(inputValues.link)
    .then((user) => {
      userInfo.setAvatarImg(user);
      newAvatarEdit.closeModal();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newAvatarEdit.setSaving(false);
    });
}

export function handleAddCardFormSubmit(inputValues) {
  newCardPopup.setSaving(true);
  api
    .addNewCard(inputValues)
    .then((card) => {
      const cardEl = renderCard(card);
      section.addItem(cardEl);
      newCardPopup.closeModal();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardPopup.setSaving(false);
    });
}

function handleDeleteClick(card) {
  deletePopup.openModal();
  deletePopup.setConfirmation(() => {
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

// avatarCloseButton.addEventListener("click", () => {
//   newAvatarEdit.closeModal();
// });

newAvatarEdit.setEventListeners();
deletePopup.setEventListeners();

/*-----------------------------------------------------------------*/
/*                      Event Listeners                            */
/*-----------------------------------------------------------------*/
profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name.trim();
  profileDescriptionInput.value = userData.description.trim();
  newProfileEdit.openModal();
});
newProfileEdit.resetValidation();
