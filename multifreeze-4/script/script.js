const sliderTabsInit = (slider,sliderTabs, newIndex = 0) => {
    const sliderTabsNavLink = document.querySelectorAll('.slider-tabs__link');

    sliderTabsNavLink.forEach((element, index) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            changeSliderTabs(index);

            slider.slideTo(index);
        });
    });


    changeSliderTabs(newIndex);
}

const changeSliderTabs = (newIndex = 0) => {
    const sliderTabsNavLink = document.querySelectorAll('.slider-tabs__link');

    sliderTabsNavLink.forEach((element, index) => {
        index !== newIndex ? element.classList.remove('active') : element.classList.add('active');
    });
};

const showPopup = (selector) => {

    const popup = document.querySelector(`.${selector}`);

    document.body.classList.add('hidden');
    popup.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const sliderTabs = new Swiper(".slider-tabs", {
            slidesPerView: "auto",
            freeMode: true,
            mousewheel: true,
        }),
        slider = new Swiper(".slider-wrapper", {
            slidesPerView: 1,
            autoHeight: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            on: {
                init: function () {
                    sliderTabsInit(this, sliderTabs);
                }
            }
        });

    slider.on('slideChange', () => {
        changeSliderTabs(slider.realIndex);
        sliderTabs.slideTo(slider.realIndex)
    });

    document.querySelector('.boxes-btn').addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelector('.advantages').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    });

    const popupTriggers = document.querySelectorAll('*[data-popup]'),
        popups = document.querySelectorAll('.popup'),
        popupClose = document.querySelectorAll('.popup-close');

    if (popupTriggers.length > 0) {
        popupTriggers.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
            });
            el.addEventListener('click',()=>showPopup(el.dataset.popup));
        });
    };

    if (popups.length > 0) {
        popups.forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.classList.contains('popup-wrapper')) {
                    document.body.classList.remove('hidden');
                    el.classList.remove('active');
                }
            });
        });
    }

    if (popupClose.length > 0) {
        popups.forEach(el => {
            el.addEventListener('click', (e) => {
                document.body.classList.remove('hidden');
                el.classList.remove('active');
            });
        });
    };

    const pdfButton = document.querySelector('.pdf-mobile');

    if(window.innerWidth < 767){
        if(popupTriggers.length > 0){
            popupTriggers.forEach(trigger=>{
                trigger.addEventListener('click',(e)=>{
                    window.location.href = trigger.href;
                });
            });
        }
    }
});