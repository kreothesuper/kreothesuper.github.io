const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup__wrapper') ||
        event.key === 'Escape' ||
        event.target.closest('.popup-close')
    ) {
        hideAllPopups();
    }
};
const showPopup = popupId => {
    const popup = document.querySelector(popupId);
    if (!popup) return

    const pageWrapper = document.querySelector('body');

    hideAllPopups();

    popup.classList.add('popup--active');
    pageWrapper.classList.add('no-scroll');

    document.addEventListener('click', checkTargetOrKey);
    document.addEventListener('keyup', checkTargetOrKey);
};

const hideAllPopups = () => {
    const popups = document.querySelectorAll('.popup'),
        pageWrapper = document.querySelector('body');

    popups.forEach(popup => {
        popup.classList.remove('popup--active');
    });
    pageWrapper.classList.remove('no-scroll');

    document.removeEventListener('click', checkTargetOrKey);
    document.removeEventListener('keyup', checkTargetOrKey);
};

document.addEventListener('DOMContentLoaded',()=>{
    const burger = document.querySelector('.burger');
    const header = document.querySelector('.header')

    burger.addEventListener('click',(e)=>{
        e.preventDefault();

        header.classList.toggle('header--open')
        burger.classList.toggle('burger--active');
    });

    const projectSlider = new Swiper('.project-slider', {
        spaceBetween:20,
        slidesPerView:'auto',
      
      
        // Navigation arrows
        navigation: {
          nextEl: '.project-slider__button--next',
          prevEl: '.project-slider__button--prev',
        },
      });

      const popupButtons = document.querySelectorAll('[data-popup]');
      const popups = document.querySelectorAll('.popup');
  
      if (popups.length) {
          popupButtons.forEach(button => {
              console.log(popupButtons)
              button.addEventListener('click', (e) => {
                  e.preventDefault();
  
                  const popupId = button.dataset.popup
                  showPopup(popupId);
              });
          });
      }
});