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
    const objectSliderElement = document.querySelector('.object-slider-element');

    if (objectSliderElement) {
        const objectSlider = new Swiper('.object-slider-element', {
            slidesPerView: 2,
            spaceBetween: 30,

            navigation: {
                nextEl: ".object-slider-button-next",
                prevEl: ".object-slider-button-prev",
            },

            breakpoints: {
                1024: {
                    slidesPerView: 4,
                },
                640: {
                    slidesPerView: 3,
                }
            }
        });
    }


    const plansThumbSliderElement = document.querySelector('.plans-tabs'),
        plansSliderElement = document.querySelector('.plans-slider'),
        cardSliderElement = document.querySelector('.card-slider');

    if (plansThumbSliderElement && plansSliderElement && cardSliderElement) {
        const plansThumbSlider = new Swiper(".plans-tabs", {
            // direction: 'vertical',
            slidesPerView: 'auto',
            spaceBetween: 4,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                768: {
                    direction: 'vertical',
                    spaceBetween: 50,
                },
            }
        });
        const plansSlider = new Swiper(".plans-slider", {
            spaceBetween: 10,
            allowTouchMove: false,
            thumbs: {
                swiper: plansThumbSlider,
            },
        });


        const cardSlider = new Swiper(".card-slider", {
            slidesPerView: 1,
            spaceBetween: 16,
            breakpoints: {
                1024: {
                    slidesPerView: 2,
                },
            },
            navigation: {
                nextEl: ".plans-slider-button-next",
                prevEl: ".plans-slider-button-prev",
            },
        });


        plansSlider.on('slideChange', function () {
            cardSlider.forEach(slider => {
                slider.slideTo(0)
            });
        });
    }


    const featuresSliderElement = document.querySelector('.features-slider');

    if (featuresSliderElement) {
        const featuresSlider = new Swiper(".features-slider", {
            slidesPerView: 1,
            spaceBetween: 16,
            observer: true,
            navigation: {
                nextEl: ".features-slider-button-next",
                prevEl: ".features-slider-button-prev",
            },
        });
    }

    const popupCardSliderElement = document.querySelector('.popup-card-slider');

    if (popupCardSliderElement) {
        const popupCardSlider = new Swiper(".popup-card-slider", {
            slidesPerView: 1,
            spaceBetween: 16,
            observer: true,
            navigation: {
                nextEl: ".popup-slider-button-next",
                prevEl: ".popup-slider-button-prev",
            },
        });
    }

    const rangeArray = document.querySelectorAll('.js-range');

    if (rangeArray.length > 0) {
        rangeArray.forEach(range => {
            const rangeElement = range.querySelector('.range-slider'),
                rangeMax = rangeElement.dataset.max,
                rangeMin = rangeElement.dataset.min,
                rangeInputMin = range.querySelector('.js-range-from-input'),
                rangeInputMax = range.querySelector('.js-range-to-input'),
                step = +rangeElement.dataset.step || 1;
            if (rangeInputMin && rangeInputMax) {
                const rangeSliderElement = rangeSlider(rangeElement, {
                    min: rangeMin,
                    max: rangeMax,
                    step: step,
                    value: [rangeMin, rangeMax],
                    disabled: false,
                    rangeSlideDisabled: false,
                    thumbsDisabled: [false, false],
                    orientation: 'horizontal',
                    onInput: function (valueSet) {
                        rangeInputMin.value = valueSet[0];
                        rangeInputMax.value = valueSet[1];
                    },
                });

                rangeInputMin.value = rangeSliderElement.value()[0];
                rangeInputMax.value = rangeSliderElement.value()[1];
            }
        });
    }


    const featuresGrid = document.querySelector('.features-grid');

    if (featuresGrid) {
        const featuresBlockButton = featuresGrid.querySelectorAll('.features-block__button'),
            featuresBlockText = featuresGrid.querySelector('.features-block-text');

        if (featuresBlockButton.length) {
            featuresBlockButton.forEach(button => {
                const buttonText = button.closest('.features-block').querySelector('.features-block__text');
                button.addEventListener('click', (e) => {
                    e.preventDefault();

                    featuresBlockButton.forEach(newButton => {
                        if (newButton !== button) {
                            newButton.classList.remove('active')
                        } else {
                            newButton.classList.add('active');
                            featuresBlockText.innerHTML = buttonText.innerHTML
                        }
                    });
                });
            });
        }
    }

    const popupButtons = document.querySelectorAll('[data-popup]');
    const popups = document.querySelectorAll('.popup');

    if (popups.length) {
        popupButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const popupId = button.dataset.popup
                showPopup(popupId);

                if (popupId === '.popup-image' && document.querySelector('.popup-image__item')) {
                    document.querySelector('.popup-image__item').src = button.dataset.popupSrc;
                }
            });
        });
    }


    const header = document.querySelector('.header');

    if (header) {
        const headerFixed = document.querySelector('.header__fixed');
        const headerBlock = document.querySelector('.header__block');

        if (headerFixed) {
            const headerOffset = headerBlock.getBoundingClientRect().height || 0;
            const headerHeight = header.getBoundingClientRect().height;
            header.style.setProperty('--header-offset', `${headerOffset}px`)
            header.style.setProperty('--header-height', `${headerHeight}px`)
            window.addEventListener('scroll', (e) => {
                if (window.scrollY >= headerOffset) {
                    header.classList.add('fixed');
                } else {
                    header.classList.remove('fixed');
                }
            });
        }

        const burger = document.querySelector('.burger');

        burger.addEventListener('click', (e) => {
            e.preventDefault();

            burger.classList.toggle('burger--active');
            header.classList.toggle('active');

            document.body.classList.toggle('no-scroll');
        });

        const hashLinks = document.querySelectorAll('a[href^="#"]');

        if (hashLinks.length) {
            hashLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    if(!link.hash.length > 0) return
                    burger.classList.remove('burger--active');
                    header.classList.remove('active');

                    document.body.classList.remove('no-scroll');
                })
            });
        }
    }
});