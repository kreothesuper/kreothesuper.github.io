document.addEventListener('DOMContentLoaded', () => {
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
        disabledClass: 'slider-button--disabled',
    }
    const __sliderProductNavParams = {
        loop: true,
        speed: 500,
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        spaceBetween: 12,
        navigation: __sliderNavigationParams,
        breakpoints: {
            701: {
                spaceBetween: 24,
            }
        }
    }
    const __sliderProductParams = (sliderNav) => {
        return {
            slidesPerView: 1,
            loop: true,
            speed: 500,
            effect: "fade",
            navigation: __sliderNavigationParams,
            thumbs: {
                swiper: sliderNav,
                slideThumbActiveClass: 'product-label--active'
            }
        }
    }

    const productSliderNav = new Swiper('.js-product-nav-slider', __sliderProductNavParams);
    const productSlider = new Swiper(".js-product-slider", __sliderProductParams(productSliderNav));

    const productObjectNav = new Swiper('.js-object-nav-slider', __sliderProductNavParams);
    const productObjectSlider = new Swiper(".js-object-slider", __sliderProductParams(productObjectNav));
});