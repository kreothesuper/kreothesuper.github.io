const categoryChange = (newIndex) => {
    const categoryList = document.querySelector('.category-list'),
        categoryListItem = categoryList.querySelectorAll('.category-list__item');

    categoryListItem.forEach((element, index) => {
        index !== newIndex ? element.querySelector('.category-list__link').classList.remove('active') : element.querySelector('.category-list__link').classList.add('active');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const mainSlider = new Swiper(".main-slider", {
        slidesPerView: 1,
        direction: 'vertical',
        speed: 1000,
        mousewheel: {
            invert: false,
        },
    });
    const productSlider = new Swiper(".product-slider", {
            slidesPerView: 'auto',
            freeMode: true,
            direction: 'vertical'
        }),
        categoryThumbs = new Swiper(".category-thumbs", {
            slidesPerView: 4,
            direction: 'vertical',
            spaceBetween: 15,
        }),
        categorySlider = new Swiper(".category-slider", {
            slidesPerView: 1,
            thumbs: {
                swiper: categoryThumbs,
            },
            on: {
                init: function () {
                    categoryChange(0);
                },
                slideChange:function (){
                    categoryChange(categorySlider.realIndex)
                }
            },
        }),
        setSlider = new Swiper(".set-slider-item", {
            slidesPerView: 1,
            direction: 'vertical',
            speed: 1000,
            pagination: {
                el: ".set-slider-pagination",
                type: "fraction",
            },
            navigation: {
                nextEl: ".set-slider-button-next",
                prevEl: ".set-slider-button-prev",
            },
        });

    const categoryList = document.querySelector('.category-list'),
        categoryListItem = categoryList.querySelectorAll('.category-list__item');

    categoryListItem.forEach((element, index) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();

            categorySlider.slideTo(index);
            categoryChange(index);
        })
    });
});