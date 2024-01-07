const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup-group__wrapper') ||
        event.target.classList.contains('popup-group__container') ||
        event.key === 'Escape' ||
        event.target.closest('.popup-close')
    ) {
        hideAllPopups();
    }
};
const showPopup = popupId => {
    const popup = document.querySelector(popupId);
    if (!popup) return

    const pageWrapper = document.querySelector('body'),
        popupGroup = document.querySelector('.popup-group');

    hideAllPopups();

    popup.classList.add('popup--active');
    pageWrapper.classList.add('no-scroll');

    if(popupGroup) popupGroup.classList.add('popup-group--active')

    document.addEventListener('click', checkTargetOrKey);
    document.addEventListener('keyup', checkTargetOrKey);
};

const hideAllPopups = () => {
    const popups = document.querySelectorAll('.popup'),
        pageWrapper = document.querySelector('body'),
        popupGroup = document.querySelector('.popup-group');

    popups.forEach(popup => {
        popup.classList.remove('popup--active');
    });
    pageWrapper.classList.remove('no-scroll');

    if(popupGroup) popupGroup.classList.remove('popup-group--active');
    
    
    document.removeEventListener('click', checkTargetOrKey);
    document.removeEventListener('keyup', checkTargetOrKey);
};

document.addEventListener('DOMContentLoaded', () => {
    const __sliderPaginationParams = {
        el: '.slider-pagination',
        hiddenClass: 'slider-pagination--hidden',
        bulletClass: 'slider-pagination__bullet',
        bulletActiveClass: 'slider-pagination__bullet--active',
        lockClass: 'slider-pagination--lock'
    }
    const __sliderNavigationParams = {
        nextEl: '.slider-button--next',
        prevEl: '.slider-button--prev',
        hiddenClass: 'slider-pagination--hidden',
        disabledClass: 'slider-button--disabled',
    }
    const __sliderProductNavParams = {
        loop: true,
        speed: 500,
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        spaceBetween: 12,
        navigation: __sliderNavigationParams,
        breakpoints: {
            701: {
                spaceBetween: 24,
            }
        }
    }
    const __sliderProductParams = (sliderNav) => {
        return {
            slidesPerView: 1,
            loop: true,
            speed: 500,
            effect: "fade",
            navigation: __sliderNavigationParams,
            thumbs: {
                swiper: sliderNav,
                slideThumbActiveClass: 'product-label--active'
            }
        }
    }

    const productSliderNav = new Swiper('.js-product-nav-slider', __sliderProductNavParams);
    const productSlider = new Swiper(".js-product-slider", __sliderProductParams(productSliderNav));

    const productObjectNav = new Swiper('.js-object-nav-slider', __sliderProductNavParams);
    const productObjectSlider = new Swiper(".js-object-slider", __sliderProductParams(productObjectNav));


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


    const popupFormArray = document.querySelectorAll('.popup form');

    if(popupFormArray.length){
        popupFormArray.forEach(form=>{
            form.addEventListener('submit',(e)=>{
                e.preventDefault();

                showPopup('.popup-thanks');
            });
        })
    }

});