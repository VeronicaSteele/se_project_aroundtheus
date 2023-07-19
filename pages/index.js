import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

//                    Constants                                     //S
const cardsWrap = document.querySelector(".card__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
0;
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

// Buttons//

const addNewCardButton = document.querySelector(".profile__add-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addNewCardModal.querySelector(".modal__close");
const profileEditClosebtn = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileEditBtn = document.querySelector("#profile-edit-button");
const previewImageModalCloseButton = document.querySelector(
  "#preview-image-modal-close-button"
);
/*                    Functions                                  */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscKey);
}

//                Validation

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const addCardFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);
addCardFormValidator.enableValidation();
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  //  deleteButton.addEventListener("click", () => {
  // console.log(cardElement);
  //   cardElement.remove();
  //  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  cardImageEl.addEventListener("click", () => {
    openModal(previewImageModal);
    imagePreview.src = data.link;
    imagePreview.alt = data.name;
    imageCaption.textContent = data.name;
  });

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  return cardElement;
}

function renderCard(data) {
  const card = new Card(data, "#card-template");
  const cardElement = card.getView();
  cardListEl.prepend(cardElement);
}

function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

function handlePopupClose(evt) {
  if (
    evt.target.classList.contains("modal__overlay") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscKey);
}

// Form Listeners
profileEditModal.addEventListener("click", handlePopupClose);
addNewCardModal.addEventListener("click", handlePopupClose);
previewImageModal.addEventListener("click", handlePopupClose);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

/*                    Event Handlers                            */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });
  closeModal(addNewCardModal);
  addCardFormElement.reset();
  const createButton = addCardFormElement.querySelector(".modal__button");
  createButton.disabled = true;
  e.target.reset();
  //createButton.classList.add("modal__button_disabled");
  //createButton.disabled = true;
}
/*                     Event Listeners                          */

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));

initialCards.forEach((data) => {
  renderCard(data);
});
//initialCards.forEach((data) => {
//const card = new Card(data, "#card-template");
// const cardElement = getCardElement(data);
// cardListEl.prepend(cardElement);
//});
