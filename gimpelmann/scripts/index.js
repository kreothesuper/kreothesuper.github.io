const openContactButtonOne = document.querySelectorAll(".open-popup-contact-one")
const openContactButtonTwo = document.querySelectorAll(".open-popup-contact-two")
const openContactButtonThree = document.querySelectorAll(".open-popup-contact-three")

// Popup
const popupContactOne = document.querySelector(".popup-contact-one")
const popupContactTwo = document.querySelector(".popup-contact-two")
const popupContactThree = document.querySelector(".popup-contact-three")
const popupFinish = document.querySelector(".popup-finish")
const popups = document.querySelectorAll(".popup")



// Функции
function handleOpenPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', handleKeyEscape);
}

function handleClosePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', handleKeyEscape);
}

function handleKeyEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    handleClosePopup(openedPopup);
  }
}


// закрывает любой попап
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      handleClosePopup(popup);
    };
    if (evt.target.classList.contains("popup__close")) {
      handleClosePopup(popup);
    };
  });
});

openContactButtonOne.forEach(element =>
  element.addEventListener("click", function () {
    handleOpenPopup(popupContactOne);
  }));

openContactButtonTwo.forEach(element =>
  element.addEventListener("click", function () {
    handleOpenPopup(popupContactTwo);
  }));

openContactButtonThree.forEach(element =>
  element.addEventListener("click", function () {
    handleOpenPopup(popupContactThree);
  }));

if (window.location.search === "?popup") {
  popupFinish.classList.add("popup_opened");
} else {
  popupFinish.classList.remove("popup_opened");
}



// Количество слайдов swiper
const swipersOne = document.querySelectorAll('.swiper-thumbs-one');
console.log(swipersOne.length) // 3

document.querySelector(".projects__title span").textContent = swipersOne.length;

const swipersTwo = document.querySelectorAll('.swiper-thumbs-two');
console.log(swipersTwo.length) // 3

document.querySelector(".projects-title-two span").textContent = swipersTwo.length;
