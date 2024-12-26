const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup__wrapper') ||
        event.key === 'Escape' ||
        event.target.closest('.popup__close')
    ) {
        hideAllPopups();
    }
};
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


document.addEventListener('DOMContentLoaded',()=>{
    const burger = document.querySelector('.burger'),
        menu = document.querySelector('.menu'),
        header = document.querySelector('.header');

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

    if(burger){
        burger.addEventListener('click',(e)=>{
            e.preventDefault();

            menu.classList.toggle('menu--active');
            burger.classList.toggle('burger--active');
            document.body.classList.toggle('no-scroll');
            if(!header.classList.contains('header--fixed')) header.classList.toggle('header--fixed');
        });
    }
    window.addEventListener('scroll', () => header.classList.toggle('header--fixed', window.scrollY > 0));

    new InfiniteMarquee({
        element: '.marquee-container',
        speed: 25000,
        spaceBetween:"20px",
        smoothEdges: true,
        direction: 'right',
        gap: '15px',
        on: {
        }
    });

    const autoSlider = new Swiper('.auto-slider-element', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: {
            el: ".auto-slider-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: '.auto-slider-button-next',
            prevEl: '.auto-slider-button-prev',
        },
        init:false,
        breakpoints: {
            767: {
                spaceBetween: 30,
            }
        }
    });

    const heroSlider = new Swiper('.hero-slider-element', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop:true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: ".hero-slider-pagination",
        },
        navigation: {
            nextEl: '.hero-slider-button-next',
            prevEl: '.hero-slider-button-prev',
        },
        init:false,
        breakpoints: {
            767: {
                spaceBetween: 30,
            }
        }
    });

    heroSlider.init();

    const objectNavSlider = new Swiper('.single-slider-nav', {
        spaceBetween: 10,
        slidesPerView: 'auto',
        // freeMode: true,
        watchSlidesProgress: true,
        direction:'horizontal',
        breakpoints:{
            768:{
                direction:'vertical',
                spaceBetween: 20,
            },
            1025:{
                direction:'horizontal'
            }
        }
    });
    const objectSlider = new Swiper('.single-slider-main', {
        spaceBetween: 20,
        slidesPerView: 1,
        navigation: {
            nextEl: '.single-slider-button-next',
            prevEl: '.single-slider-button-prev',
        },
        thumbs: {
            swiper: objectNavSlider,
        },
    });


    const textExpandArray = document.querySelectorAll('.questions-item');

    if (textExpandArray.length) {
        textExpandArray.forEach(textExpand => {
            const textExpandElement = textExpand.querySelector('.questions-item__text');
            textExpand.style.setProperty('--text-height', `${textExpandElement.clientHeight}px`)
            textExpand.addEventListener('change', () => {
                const textExpandElement = textExpand.querySelector('.questions-item__text');
                textExpand.style.setProperty('--text-height', `${textExpandElement.clientHeight}px`)
            });
        });
    }


    const form = document.querySelectorAll('form');

    if(form.length){
        form.forEach(element=>{
            element.addEventListener('submit',(e)=>{
                e.preventDefault();

                showPopup('.popup-thanks')
            });
        })
    }
});