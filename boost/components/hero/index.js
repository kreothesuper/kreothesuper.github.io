const hero = new Swiper(".hero-slider", {
    slidesPerView: 'auto',
    speed: 500,
    allowTouchMove:false,
    pagination: {
        el: '.swiper-pagination',
    },
    breakpoints:{
        1440:{
            allowTouchMove:true,
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        click: function (swiper, event) {
            const clickedSlide = swiper.target.closest('.swiper-slide');
            const activeSlide = clickedSlide.closest('.swiper').querySelector('.swiper-slide-active');
            if (clickedSlide !== activeSlide) {
                activeSlide.classList.remove('swiper-slide-active');
                clickedSlide.classList.add('swiper-slide-active');
            }
        },
        slideChange: function (event) {
            const currentSlideColor = hero.slides[hero.activeIndex].dataset.color;
            hero.navigation.nextEl.dataset.color = currentSlideColor;
            hero.navigation.prevEl.dataset.color = currentSlideColor;
        }
    }
});