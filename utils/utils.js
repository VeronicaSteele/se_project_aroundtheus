export function handleEscKey(evt){
    if (evt.key ==="Escape") {
        const activeModal = document.querySelector(".modal__opened");
        (activeModal);
    }
}

export function openModal(modal){
    modal.classList.add(".modal__opened");
    document.addEventListener(type: "keyup", handleEscKey);
    overlay.addEventListener(type: "mousedown", handlePopupClose)
}

export function closeModal(modal){
    modal.classList.remove(".modal__opened");
    document.removeEventListener(type: "keyup", handleEscKey);
    overlay.removeEventListener(type: "mousedown", handlePopupClose);
}

export function handlePopupClose(evt){
    if (
        evt.target.classList.contains("modal")|| evt.target.classList.contains("modal__close")
    ){
        closeModal(evt.currentTarget)
    }
}