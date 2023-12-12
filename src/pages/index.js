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
  api,
  userInfo,
  deletePopup,
  editProfileFormValidator,
  addCardFormValidator,
  newImagePopup,
  newCardPopup,
  newProfileEdit,
  newAvatarEdit,
  newAvatarValidator,
} from "../utils/constants.js";

/*-----------------------------------------------------------------*/
/*                             API                                 */
/*-----------------------------------------------------------------*/
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

editProfileFormValidator.enableValidation();

addCardFormValidator.enableValidation();
/*-----------------------------------------------------------------*/
/*                             New Instances                       */
/*-----------------------------------------------------------------*/

//New Image Popup

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
      newProfileEdit.setSaving(false);
      newProfileEdit.closeModal();
    })
    .catch((err) => {
      console.error(err);
    });
}

export function handleAvatarSubmit(inputValues) {
  newAvatarEdit.setSaving(true);
  api
    .updateAvatar(inputValues.link)
    .then((user) => {
      userInfo.setAvatarImg(user);
      newAvatarEdit.setSaving(false);
      newAvatarEdit.closeModal();
    })
    .catch((err) => {
      console.error(err);
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
      newCardPopup.setSaving(false);
    })
    .catch((err) => {
      console.error(err);
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
