export function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal__opened");
    activeModal;
  }
}

export function openModal(modal) {
  modal.classList.add(".modal__opened");
  document.addEventListener("keyup", handleEscKey);
  // overlay.addEventListener("mousedown", handlePopupClose);
}

export function closeModal(modal) {
  modal.classList.remove(".modal__opened");
  document.removeEventListener("keyup", handleEscKey);
  // overlay.removeEventListener("mousedown", handlePopupClose);
}

export function handlePopupClose(evt) {
  if (
    evt.target.classList.contains("modal__overlay") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
}
