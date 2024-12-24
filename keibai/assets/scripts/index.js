document.addEventListener('DOMContentLoaded',()=>{
    const burger = document.querySelector('.burger'),
        menu = document.querySelector('.menu'),
        header = document.querySelector('.header');

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

    autoSlider.init();


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
});