document.addEventListener('DOMContentLoaded', () => {

    const sliderScrollbar = {
        el: '.slider-scrollbar',
        dragClass: 'slider-scrollbar__drag',
        draggable:true,
    }
    const partnersSlider = new Swiper('.js-partners-slider', {
        slidesPerView: 'auto',
        spaceBetween: 50,
        breakpoints: {
            769: {
                spaceBetween: 86,
            }
        }
    });
    const roadmapSlider = new Swiper('.js-roadmap-slider', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        scrollbar: sliderScrollbar,
    });
    const teamSlider = new Swiper('.js-team-slider', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        scrollbar: sliderScrollbar,
    });


    const faq = document.querySelector('.faq');

    if (faq) {
        const faqItemArray = faq.querySelectorAll('.faq-item');

        if (faqItemArray.length) {
            faqItemArray.forEach(faqItem => {
                const faqItemHeader = faqItem.querySelector('.faq-item__header');

                faqItemHeader.addEventListener("click", (e) => {
                    e.preventDefault();

                    faqItem.classList.toggle('faq-item--active');
                })
            })
        }
    }

    const burger = document.querySelector('.burger');
    const headerNav = document.querySelector('.header__nav');

    if (burger && headerNav) {
        const navLinkArray = document.querySelectorAll('.nav__link');

        if (navLinkArray.length) {
            navLinkArray.forEach(navLink => {
                navLink.addEventListener('click', () => {
                    burger.classList.remove('burger--active');
                    headerNav.classList.remove('header__nav--active');
                })
            })
        }

        burger.addEventListener('click', (e) => {
            e.preventDefault();

            burger.classList.toggle('burger--active');
            headerNav.classList.toggle('header__nav--active')
        });
    }


    const timer = document.querySelector('.timer');

    if (timer) {
        const timerDay = timer.querySelector('.js-timer-day'),
            timerHours = timer.querySelector('.js-timer-hours'),
            timerMins = timer.querySelector('.js-timer-mins'),
            timerSec = timer.querySelector('.js-timer-sec'),
            timerLine = timer.querySelector('.js-timer-progress');


        const countdownDate = new Date("December 31, 2023 23:59:59").getTime();

        const countdownInterval = setInterval(function () {
            const now = new Date().getTime();

            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timerDay.innerHTML = days;
            timerHours.innerHTML = hours;
            timerMins.innerHTML = minutes;
            timerSec.innerHTML = seconds;

            if (distance < 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }



    const languageSelect = document.querySelector('.language-select');

    if(languageSelect){
        document.addEventListener('click',(e)=>{
            if(!e.target.closest('.language-select')){
                languageSelect.classList.remove('language-select--active');
            }
        })
        const languageSelectCurrent = languageSelect.querySelector('.language-select__current');
        languageSelectCurrent.addEventListener('click',(e)=>{
            e.preventDefault();

            languageSelect.classList.toggle('language-select--active')
        });
    }

});