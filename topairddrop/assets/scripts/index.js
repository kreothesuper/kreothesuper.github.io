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

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const header = document.querySelector('.header')

    if (burger && header) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();

            header.classList.toggle('header--open')
            burger.classList.toggle('burger--active');
            document.body.classList.toggle('no-scroll');
        });

        const navLinkArray = document.querySelectorAll('.nav__link');

        if (navLinkArray.length) {
            navLinkArray.forEach(link => {
                link.addEventListener('click', () => {
                    header.classList.remove('header--open')
                    burger.classList.remove('burger--active');
                    document.body.classList.remove('no-scroll');
                });
            });
        }
    }

    const swiperArray = document.querySelectorAll('.swiper');

    if (swiperArray.length) {
        const projectSlider = new Swiper('.project-slider', {
            spaceBetween: 20,
            slidesPerView: 'auto',

            rewind: true,
            // Navigation arrows
            navigation: {
                nextEl: '.project-slider__button--next',
                prevEl: '.project-slider__button--prev',
            },
            on: {
                init: function () {
                    if(this.realIndex === 0){
                        // console.log('234');
                       console.log(this.navigation.prevEl[0].classList.add('swiper-button-disabled'))
                    }
                },
                slideChange: function () {
                    if(this.realIndex === 0){
                        // console.log('234');
                       console.log(this.navigation.prevEl[0].classList.add('swiper-button-disabled'))
                    }
                },
            },
        });
    }

    const popupButtons = document.querySelectorAll('[data-popup]');
    const popups = document.querySelectorAll('.popup');

    if (popups.length) {
        popupButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const popupId = button.dataset.popup
                showPopup(popupId);
            });
        });
    }

});