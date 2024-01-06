document.addEventListener('DOMContentLoaded',()=>{
    const __sliderPaginationParams = {
        el: '.slider-pagination',
        hiddenClass: 'slider-pagination--hidden',
        bulletClass: 'slider-pagination__bullet',
        bulletActiveClass: 'slider-pagination__bullet--active',
        lockClass: 'slider-pagination--lock'
    }
    const __sliderNavigationParams = {
        nextEl: '.slider-button--next',
        prevEl: '.slider-button--prev',
        hiddenClass: 'slider-pagination--hidden',
        disabledClass:'slider-button--disabled',
    }
    const productSliderNav = new Swiper('.js-product-nav-slider',{
        loop:true,
        speed:500,
        watchSlidesProgress: true,
        slidesPerView:'auto',
        spaceBetween:12,
        navigation:__sliderNavigationParams,
        breakpoints:{
            701:{
                spaceBetween:24,
            }
        }
    });

    const productSlider = new Swiper(".js-product-slider",{
        slidesPerView:1,
        loop:true,
        speed:500,
        effect: "fade",
        navigation:__sliderNavigationParams,
        thumbs:{
            swiper:productSliderNav,
            slideThumbActiveClass:'product-label--active'
        }
    });

});