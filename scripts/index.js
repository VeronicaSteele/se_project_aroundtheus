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
//                    Constants                                     //
const cardsWrap = document.querySelector(".card__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector("#profile__title");
const profileDescription = document.querySelector("#profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card__list");
const cardListEl = document.querySelector(".card__item");
const addNewCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addNewCardModal.querySelector("#add-card-form");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
const previewImageModal = document.querySelector("#view-card-modal");
const imagePreview = previewImageModal.querySelector(".card__image");
console.log(imagePreview);

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
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    console.log(cardElement);
    cardElement.remove();
  });

  // add click listener to the cardImage element
  // openModal with previewImageModal
  //
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  cardImageEl.addEventListener("click", () => {
    openModal(previewImageModal);
    imagePreview.src = cardData.link;
  });

  cardTitleEl.textContent = cardData.name.trim();
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

function closeModals(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(getCardElement(cardElement));
}

// Form Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

/*                    Event Handlers                            */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModals(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard(name, link, cardsWrap);
  closeModals(addNewCardModal);
}
/*                     Event Listeners                          */

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  profileEditModal.classList.add("modal_opened");
});
profileEditBtn.addEventListener("click", () => openModal(profileEditModal));

profileEditClosebtn.addEventListener("click", () =>
  closeModals(profileEditModal)
);
addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModals(addNewCardModal)
);
previewImageModalCloseButton.addEventListener("click", () =>
  closeModals(previewImageModal)
);
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
