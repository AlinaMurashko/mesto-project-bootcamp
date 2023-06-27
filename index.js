console.log ('20k');

let closeButton = document.querySelector('.popup__close');
let editButton = document.querySelector('.profile__editBtn');

closeButton.addEventListener('click', close__popup);
editButton.addEventListener('click', open__popup);

function close__popup() {
    let element = document.querySelector('.popup_opened');
    element.classList.remove('popup_opened');
};

function open__popup() {
    let element = document.querySelector('.popup');
    element.classList.add('popup_opened');
};