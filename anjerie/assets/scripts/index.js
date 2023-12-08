document.addEventListener('DOMContentLoaded',()=>{
    const burger = document.querySelector('.burger');

    burger.addEventListener('click',(e)=>{
        e.preventDefault();

        burger.classList.toggle('burger--active');
    });


    const gallerySlider = new Swiper('.js-gallery-slider',{
        slidesPerView:'auto',
        spaceBetween:22,
        loop:true,
        speed:500,
    });
});