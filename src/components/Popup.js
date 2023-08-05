import PopupWithForm from "./PopupWithForm";
import {
  handleEscKey,
  openModal,
  closeModal,
  handlePopupClose,
} from "./utils.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  // this._overlay = document.querySelector(".page");
  // openpopup
}
