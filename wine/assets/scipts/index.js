document.addEventListener('DOMContentLoaded', () => {
    const swiperArray = document.querySelectorAll('.swiper');

    if (swiperArray.length) {
        const slider = new Swiper('.slider-element', {
            spaceBetween: 44,
            loop: true,
            slidesPerView:1,
            loopAdditionalSlides:4,

            pagination: {
                el: '.slider-element__pagination',
            },

            navigation: {
                nextEl: '.slider-element__button--next',
                prevEl: '.slider-element__button--prev',
            },

        });
    }

    const header = document.querySelector('.header'),
    burger = document.querySelector('.burger');

    if(header && burger){
        burger.addEventListener('click',(e)=>{
            e.preventDefault();

            header.classList.toggle('header--active');
            burger.classList.toggle('burger--active');
        });

        const headerListLink = header.querySelectorAll('.header-list__link');

        if(headerListLink.length){
            headerListLink.forEach(link=>{
                link.addEventListener('click',()=>{
                    header.classList.remove('header--active');
                    burger.classList.remove('burger--active');
                })
            });
        }
    }
});