const overlay = document.querySelector(".page");

export function handleEscKey(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".modal_opened"));
  }
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscKey);
  modal.addEventListener("mousedown", handlePopupClose);
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscKey);
  modal.removeEventListener("mousedown", handlePopupClose);
}

export function handlePopupClose(evt) {
  if (
    evt.target.classList.contains("modal__overlay") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
}