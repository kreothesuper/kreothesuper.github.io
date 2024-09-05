const initTabs = () => {
    const tabs = [...document.querySelectorAll(".tabs")];

    if (tabs.length > 0) {
        tabs.forEach((tab) => {
            const tabContent = [...tab.querySelectorAll(".tabs__content")];
            const tabLinks = [...tab.querySelectorAll(".tabs__link")];

            const openTab = (tabIndex = 0) => {
                tabContent.forEach((element, i) => {
                    const isActive = i === tabIndex;
                    element.classList.toggle("active", isActive);
                });

                tabLinks.forEach((element, i) => {
                    element.classList.toggle("active", i === tabIndex);
                });
            }

            openTab(0)

            tabLinks.forEach((link, i) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    openTab(i);
                });
            });
        });
    }
}


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
    const popupButtonArray = document.querySelectorAll('[data-popup]');

    if (popupButtonArray.length) {
        popupButtonArray.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                showPopup(`${button.dataset.popup}`);
            });
        });
    }

    initTabs();

    const architectureSlider = new Swiper('.architecture-slider', {
        slidesPerView: 3,
        spaceBetween: 20,
        speed: 750,
        navigation: {
            nextEl: '.architecture-slider-button-next',
            prevEl: '.architecture-slider-button-prev',
        },

        init: false,
        breakpoints:{
            991:{
                spaceBetween:60,
            }
        },
    });

    architectureSlider.on('slideChangeTransitionStart', () => {
        const direction = architectureSlider.touches.startX > architectureSlider.touches.currentX ? 'forward' : 'backward';
        console.log(architectureSlider)
        direction === 'forward' ? architectureSlider.el.classList.add('left') : architectureSlider.el.classList.add('right');
        architectureSlider.el.classList.add('animated');
    });
    architectureSlider.on('slideChangeTransitionEnd', () => {
        architectureSlider.el.classList.remove('animated');
        architectureSlider.el.classList.remove('left');
        architectureSlider.el.classList.remove('right');
    });

    architectureSlider.init();


    const advantagesSlider = new Swiper('.advantages-slider', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        speed: 750,

        init: false,
        breakpoints:{
            991:{
                spaceBetween:40,
                slidesPerView: 3,
            }
        },
    });

    advantagesSlider.init();


    const choiceSlider = new Swiper('.choice-slider', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        speed: 750,

        init: false,
        breakpoints:{
            991:{
                spaceBetween:40,
                slidesPerView: 3,
            }
        },

        
    });

    choiceSlider.init();


    const placesSlider = new Swiper('.places-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 750,

        init: false,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        navigation: {
            nextEl: '.places-slider-button-next',
            prevEl: '.places-slider-button-prev',
        },
    });

    placesSlider.init();


    const gallerySlider = new Swiper('.gallery-slider', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        speed: 750,
        navigation: {
            nextEl: '.gallery-slider-button-next',
            prevEl: '.gallery-slider-button-prev',
        },

        init: false,
        breakpoints:{
            991:{
                slidesPerView: 3,
                spaceBetween:60,
            }
        },
    });

    gallerySlider.init();

    const sportSlider = new Swiper('.sport-slider', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        speed: 750,
        navigation: {
            nextEl: '.sport-slider-button-next',
            prevEl: '.sport-slider-button-prev',
        },
        observer:true,
        breakpoints:{
            991:{
                slidesPerView: 3,
                spaceBetween:60,
            }
        },
    });



    architectureSlider.on('slideChangeTransitionStart', () => {
        const direction = architectureSlider.touches.startX > architectureSlider.touches.currentX ? 'forward' : 'backward';
        console.log(architectureSlider)
        direction === 'forward' ? architectureSlider.el.classList.add('left') : architectureSlider.el.classList.add('right');
        architectureSlider.el.classList.add('animated');
    });
    architectureSlider.on('slideChangeTransitionEnd', () => {
        architectureSlider.el.classList.remove('animated');
        architectureSlider.el.classList.remove('left');
        architectureSlider.el.classList.remove('right');
    });


    gsap.to('.advantages__header', {
        y:'-20vh',
        ease: "none",
        scrollTrigger: {
            scrub: true,
            trigger: '.advantages',
            start: "top bottom",
            end: "bottom top",
        },
    });

    gsap.to('.location__bg', {
        opacity:1,
        ease: "none",
        scrollTrigger: {
            scrub: true,
            trigger: '.location',
            start: "50% bottom",
            end: "25% top",
      
        },
    });

    gsap.to(".choice-bg", {
        y:'15%',
        ease: "none",
        scrollTrigger: {
            scrub: true,
            trigger: ".choice",
            start: "top bottom",
            end: "bottom top",
        },
    });

    gsap.to(".structure-hero__img", {
        y:'15%',
        ease: "none",
        scrollTrigger: {
            scrub: true,
            trigger: ".structure-hero",
            start: "top bottom",
            end: "bottom top",
        },
    });

    gsap.to(".structure-info__img", {
        y:'15%',
        ease: "none",
        scrollTrigger: {
            scrub: true,
            trigger: ".structure-info",
            start: "top bottom",
            end: "bottom top",
        },
    });

    gsap.to(".structure-about__img", {
        y:'15%',
        ease: "none",
        scrollTrigger: {
            scrub: true,
            trigger: ".structure-about",
            start: "top bottom",
            end: "bottom top",
        },
    });


    gsap.to(".park__branch", {
        y:'-60%',
        ease: "none",
        scrollTrigger: {
            scrub: true,
            trigger: ".park",
            start: "top bottom",
            end: "bottom top",
        },
    });

    gsap.to(".hero-img", {
        y:'20%',
        ease: "none",
        scrollTrigger: {
            scrub: true,
            trigger: ".hero",
            start: "top bottom",
            end: "bottom top",
        },
    });

    const galleryImg = document.querySelectorAll('.park-gallery__img');

    if(galleryImg.length){
        galleryImg.forEach(img=>{
            gsap.to(img, {
                y:'-60%' || `-${img.dataset.count}%`,
                ease: "none",
                scrollTrigger: {
                    scrub: true,
                    trigger: ".park",
                    start: "top bottom",
                    end: "bottom top",
                },
            });
        });
    }


    const header = document.querySelector('.header');


    window.addEventListener('scroll',(e)=>{
        if(pageYOffset > 0){
            header.classList.add('fixed');
        }else{
            header.classList.remove('fixed');
        }
    });

    const burger = document.querySelector('.js-burger'),
        menu = document.querySelector('.menu'),
        menuClose = document.querySelector('.menu__close');

        burger.addEventListener('click',(e)=>{
            e.preventDefault();
            menu.classList.toggle('active');
            header.classList.toggle('open');
        });

        menuClose.addEventListener('click',(e)=>{
            e.preventDefault();
            menu.classList.remove('active');
            header.classList.remove('open');
        });

       
});