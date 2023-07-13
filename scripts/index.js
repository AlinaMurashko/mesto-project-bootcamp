const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(card => createCardElement(card.name, card.link));

let closeButtons = document.querySelectorAll('.popup__close');
let editButton = document.querySelector('.profile__edit-btn');
let popupEditProfileElement = document.querySelector('#edit-ptofile');
let popupZoomInElement = document.querySelector('#zoom-element');
let popupAddPicElement = document.querySelector('#add-element');
let addButton = document.querySelector('.profile__add-btn');

let cardTitleElement = document.querySelector('#title');
let cardLinkElement = document.querySelector('#link');

const nameInputElement = document.querySelector('#name');
const descriptionInputElement = document.querySelector('#description');
const nameElement = document.querySelector('.profile__title');
const descriptionElement = document.querySelector('.profile__description');

const profileFormElement = document.querySelector('#persInfo');
const addCardFormElement = document.querySelector('#add-element');

profileFormElement.addEventListener('submit', submitProfileForm);
addCardFormElement.addEventListener('submit', submitAddCardForm);

closeButtons.forEach(element => element.addEventListener('click', closeEditPopup));
editButton.addEventListener('click', openEditPopup);

addButton.addEventListener('click', openAddPopup);

addLikeClickListeners();

function addLikeClickListeners() {
    const likeButtonElements = document.querySelectorAll('.elements__button');
    likeButtonElements.forEach(element => element.addEventListener('click', likeElement));
}

function likeElement(evt) {
    evt.target.classList.toggle('elements__button_active');
}

function closeEditPopup() {
    let popupOpenedElement = document.querySelector('.popup_opened');
    popupOpenedElement.classList.remove('popup_opened');
};

function openEditPopup() {
    populateInputs();
    popupEditProfileElement.classList.add('popup_opened');
};

function openAddPopup() {
    populateInputs();
    popupAddPicElement.classList.add('popup_opened');
};

function populateInputs() {
    nameInputElement.value = nameElement.innerText;
    descriptionInputElement.value = descriptionElement.innerText;
}

function submitProfileForm(evt) {
    evt.preventDefault();
    nameElement.innerText = nameInputElement.value;
    descriptionElement.innerText = descriptionInputElement.value;
    closeEditPopup();
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    const title = cardTitleElement.value;
    const link = cardLinkElement.value;
    createCardElement(title, link);
    closeEditPopup();
}

function deleteCard(evt) {
    const cardElement = evt.target.parentElement;
    cardElement.remove();
}

function zoomInImage(evt) {
    popupZoomInElement.classList.add('popup_opened');
    const zoomElement = popupZoomInElement.querySelector('.popup__image-zoom');
    zoomElement.src = evt.target.src;
    zoomElement.alt = evt.target.alt;

    const titleElement = popupZoomInElement.querySelector('.popup__image-title');
    titleElement.innerText = evt.target.alt;
}

function createCardElement(title, source) {
    const cardContainer = document.querySelector('.elements');
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    const imageElement = cardElement.querySelector('.elements__photo');
    imageElement.src = source;
    imageElement.alt = title;
    cardElement.querySelector('.elements__title').innerText = title;
    cardContainer.prepend(cardElement);

    addLikeClickListeners();

    const deleteButton = cardElement.querySelector('.elements__delete');
    deleteButton.addEventListener('click', deleteCard);

    const imageZoom = cardElement.querySelector('.elements__photo');
    imageZoom.addEventListener('click', zoomInImage);
}