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

    if (popupGroup) popupGroup.classList.add('popup-group--active')

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

    if (popupGroup) popupGroup.classList.remove('popup-group--active');


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
    const __sliderNavigationParams = (sliderPrevClass = '.slider-button--prev', sliderNextClass = '.slider-button--next') => {
        return {
            nextEl: sliderNextClass,
            prevEl: sliderPrevClass,
            hiddenClass: 'slider-pagination--hidden',
            disabledClass: 'slider-button--disabled',
        }
    }
    const __sliderProductNavParams = {
        loop: true,
        speed: 500,
        watchSlidesProgress: true,
        slidesPerView: "auto",
        spaceBetween: 12,
        centeredSlides: true,
        slideToClickedSlide: true,
        breakpoints: {
            701: {
                spaceBetween: 24,
            }
        }
    }
    const __sliderProductImgParams = {
        speed: 500,
        navigation: __sliderNavigationParams(),
        pagination: __sliderPaginationParams,
        slidesPerView: 1,
    }
    const __sliderProductParams = (sliderNav, sliderPrevButton, sliderNextButton) => {
        return {
            slidesPerView: 1,
            loop: true,
            speed: 500,
            effect: "fade",
            allowTouchMove: false,
            navigation: __sliderNavigationParams(sliderPrevButton, sliderNextButton),
            thumbs: {
                swiper: sliderNav,
                slideThumbActiveClass: 'product-label--active'
            }
        }
    }

    const productSliderNav = new Swiper('.js-product-nav-slider', __sliderProductNavParams);
    const productSlider = new Swiper(".js-product-slider", __sliderProductParams(productSliderNav, '.js-product-prev-button', '.js-product-next-button'));

    productSlider.on('slideChange', function () {
        productSliderNav.slideToLoop(productSlider.realIndex)
    });


    const productObjectNav = new Swiper('.js-object-nav-slider', __sliderProductNavParams);
    const productObjectSlider = new Swiper(".js-object-slider", __sliderProductParams(productObjectNav, '.js-object-prev-button', '.js-object-next-button'));

    productObjectSlider.on('slideChange', function () {
        productObjectNav.slideToLoop(productObjectSlider.realIndex)
    });

    const productImgSlider = new Swiper(".js-product-img-slider", __sliderProductImgParams);

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

    if (popupFormArray.length) {
        popupFormArray.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                showPopup('.popup-thanks');
            });
        })
    }

});