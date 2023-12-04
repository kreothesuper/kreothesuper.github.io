let marqueeLeft = new Swiper('.marquee-left', {
    spaceBetween: 16,
    centeredSlides: true,
    speed: 5000,
    autoplay: {
        delay: 1,
    },
    loop: true,
    slidesPerView: 'auto',
    allowTouchMove: false,
    disableOnInteraction: true,
    breakpoints: {
        600: {
            spaceBetween: 15
        }
    }
});
let marqueeRight = new Swiper('.marquee-right', {
    spaceBetween: 16,
    centeredSlides: true,
    speed: 5000,
    autoplay: {
        delay: 1,
        reverseDirection: true
    },
    loop: true,
    loopedSlides: 6,
    slidesPerView: 'auto',
    allowTouchMove: false,
    disableOnInteraction: true,
    breakpoints: {
        600: {
            spaceBetween: 15
        }
    }
});