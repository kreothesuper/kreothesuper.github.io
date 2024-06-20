const showPopup = popupId => {
    const popup = document.querySelector(popupId);
    if (!popup) return

    hideAllPopups();

    popup.classList.add('popup--active');
    document.body.classList.add('no-scroll');

    document.addEventListener('click', checkTargetOrKey);
    document.addEventListener('keyup', checkTargetOrKey);
};

const hideAllPopups = () => {
    const popups = document.querySelectorAll('.popup');

    popups.forEach(popup => {
        popup.classList.remove('popup--active');
    });
    document.body.classList.remove('no-scroll');

    document.removeEventListener('click', checkTargetOrKey);
    document.removeEventListener('keyup', checkTargetOrKey);
};

const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup__wrapper') ||
        event.key === 'Escape' ||
        event.target.closest('.popup__close')
    ) {
        event.preventDefault();
        hideAllPopups();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const languageList = document.querySelectorAll('.language');

    if (languageList.length) {
        languageList.forEach(language => {
            const languageCurrent = language.querySelector('.language__current'),
                languageCurrentText = languageCurrent.querySelector('.language__text');

            languageCurrent.addEventListener('click', () => {
                language.classList.toggle('language--active');
            });

            language.addEventListener('change', (e) => {
                languageCurrentText.textContent = e.target.value;
                language.classList.remove('language--active');
            });
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language')) {
                // language.classList.remove('lanuguage--active');
                languageList.forEach(language => {
                    language.classList.remove('language--active');
                });
            }
        });
    }

    const searchArray = document.querySelectorAll('.search');

    if (searchArray.length) {
        searchArray.forEach(search => {
            const searchInput = search.querySelector('input');
            search.addEventListener('input', () => {
                search.classList.add('search--active')
            });
            search.addEventListener('click', () => {
                search.classList.add('search--active')
            });
            search.addEventListener('change', () => {
                search.classList.add('search--active')
            });

            searchInput.addEventListener('blur', () => {
                search.classList.remove('search--active');
                search.reset();
            });
        });
    }


    const headerNav = document.querySelector('.header__nav'),
        burger = document.querySelector('.burger');

    if (headerNav && burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('burger--active');
            headerNav.classList.toggle('header__nav--active');
        });
    }

    const filter = document.querySelector('.filter');

    if (filter) {
        filter.addEventListener('change', () => {
            console.log('234');
        });
        filter.addEventListener('click', (e) => {
            if (e.target.closest('.filter-label')) {
                filter.classList.toggle('filter--active');
            }
        });
    }

    // popup init
    const popupButtons = document.querySelectorAll('[data-popup]');
    const popups = document.querySelectorAll('.popup');

    if (popups.length && popupButtons.length) {
        popupButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const popupId = button.dataset.popup
                showPopup(popupId);
            });
        });
    }

    const formList = document.querySelectorAll('.form');

    if(formList.length){
        formList.forEach(form=>{
            form.addEventListener('submit',e=>{
                e.preventDefault();

                showPopup('.popup-thanks')
            });
        });
    }

    const swiper = document.querySelector('.swiper');

    if(swiper){
        const horseSlider = new Swiper('.horse-slider', {
            loop:true,
            pagination: {
              el: '.horse-slider__pagination',
            },
          
            // Navigation arrows
            navigation: {
              nextEl: '.horse-slider__button--next',
              prevEl: '.horse-slider__button--prev',
            },          
          });
    }

    const videoArray = document.querySelectorAll('.video');

    if (videoArray.length) {
        videoArray.forEach(video => {
            const videoElement = document.querySelector('video');
         
            video.addEventListener('click', function () {
                if (videoElement.paused) {
                    videoElement.play();
                    video.classList.add('play');
                } else {
                    videoElement.pause();
                    video.classList.remove('play');
                }
            });
        })
    }
});