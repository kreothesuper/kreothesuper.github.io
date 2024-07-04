const loader = document.querySelector('.loader');

if (loader) {
    const scrollbartWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.classList.add('hidden');
    document.body.style.setProperty(`--scrollbar-width`, `${scrollbartWidth}px`);

    window.addEventListener('load', () => {
        document.body.classList.remove('hidden');
        const loader = document.querySelector('.loader');
        loader.classList.add('loaded');
    });
}




const closeAllAside = () => {
    const asideLength = document.querySelectorAll('.aside');

    if (asideLength.length) {
        asideLength.forEach(aside => {
            aside.classList.remove('aside--active');
        });
    }
};
// popup

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

// popup

document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.video-bg');
    const windowWidth = window.innerWidth;

    if (video) {
        const videoSource = (windowWidth < 1025) ? video.dataset.mobile : video.dataset.desktop;
        const videoHTML = `<source src='${videoSource}' type='video/mp4'>`;
        video.innerHTML = videoHTML;
    }


    const header = document.querySelector('.header');

    if (header) {
        header.classList.toggle("is-pinned", window.scrollY > 0);
        window.addEventListener('scroll', (e) => {
            header.classList.toggle("is-pinned", window.scrollY > 0)
        });
    }

    const asideButtons = document.querySelectorAll('[data-aside]');

    if (asideButtons.length) {
        asideButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const aside = document.querySelector(`${button.dataset.aside}`);

                if (aside) {
                    aside.classList.toggle('aside--active');
                }
            });
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

    const formArray = document.querySelectorAll('form');

    if (formArray.length) {
        formArray.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const formData = new FormData(form);

                closeAllAside();
                hideAllPopups();
                showPopup('.popup-thanks');
            });
        })
    }

    const categorySliderElement = document.querySelector('.category-slider');

    if (categorySliderElement) {
        const categorySlider = new Swiper('.category-slider', {
            spaceBetween: 20,
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.category-slider-button-next',
                prevEl: '.category-slider-button-prev',
                disabledClass: 'slider__button--disabled'
            },
            pagination: {
                el: ".category-slider-progress",
                type: "progressbar",
            },
        });
    }

    const productSliderElement = document.querySelector('.product-slider');

    if (productSliderElement) {
        const productSlider = new Swiper('.product-slider', {
            spaceBetween: 20,
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.product-slider-button-next',
                prevEl: '.product-slider-button-prev',
                disabledClass: 'slider__button--disabled'
            },
            pagination: {
                el: ".product-slider-progress",
                type: "progressbar",
            },
        });
    }

    const partnersSliderElement = document.querySelector('.partners-slider');

    if (partnersSliderElement) {
        const productSlider = new Swiper('.partners-slider', {
            spaceBetween: 50,
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.partners-slider-button-next',
                prevEl: '.partners-slider-button-prev',
                disabledClass: 'slider__button--disabled'
            },
            pagination: {
                el: ".partners-slider-progress",
                type: "progressbar",
            },
            breakpoints: {
                768: {
                    spaceBetween: 100
                }
            }
        });
    }

    const singleSlider = document.querySelector('.single-slider');

    if (singleSlider) {
        const singleSliderNav = new Swiper(".single-slider-nav", {
            spaceBetween: 2,
            slidesPerView: 5,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                768: {
                    slidesPerView: 4,
                }
            }
        });
        const singleSliderMain = new Swiper(".single-slider-main", {
            spaceBetween: 10,
            navigation: {
                nextEl: ".single-slider-button-next",
                disabledClass: 'slider__button--disabled',
                prevEl: ".single-slider-button-prev",
            },
            thumbs: {
                swiper: singleSliderNav,
            },
        });
    }


    const videoArray = document.querySelectorAll('.video');

    if (videoArray.length) {
        videoArray.forEach(video => {
            const videoElement = document.querySelector('video');

            video.addEventListener('click', function (e) {
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


    const sort = document.querySelector('.sort');

    if (sort) {
        const sortCurrent = sort.querySelector('.sort__current');
        document.addEventListener('click', (e) => {
            if (e.target.closest('.sort')) {
                sort.classList.toggle('sort--active')
            } else {
                sort.classList.remove('sort--active')
            }
        });

        sort.addEventListener('change', (e) => {
            sortCurrent.textContent = e.target.value;
            sort.classList.remove('sort--active');
        });
    }


    [].forEach.call(document.querySelectorAll('.phone-input'), function (input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = new_value;
            }
            if (event.type == "blur" && this.value.length < 5) {
                this.value = "";
            }
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);

    });

    const faqItemArray = document.querySelectorAll('.faq-item');

    if (faqItemArray.length) {
        faqItemArray.forEach(item => {
            const itemText = item.querySelector('.faq-item__text');

            item.style.setProperty('--height', `${itemText.offsetHeight}px`)
        });
    }
})



