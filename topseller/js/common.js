document.addEventListener('DOMContentLoaded', () => {
    const advantagesSlider = new Swiper(".advantages", {
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: ".advantages-scrollbar",
            },
        }),
        howSlider = new Swiper(".how", {
            slidesPerView: 3,
            freeMode: true,
            direction: 'vertical',
            spaceBetween: 60,
            breakpoints: {
                1100: {
                    slidesPerView: 4,
                    direction: 'horizontal'
                }
            },
            navigation: {
                nextEl: ".how-button-next",
                prevEl: ".how-button-prev",
            },
        }),
        tariffsSlider = new Swiper(".tariffs", {
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: ".tariffs-scrollbar",
            },
        }),
        statisticsSlider = new Swiper(".statistics", {
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: ".statistics-scrollbar",
            },
        });


    const header = document.querySelector('.header');

    let lastScrollTop = window.pageYOffset || document.scrollTop;

    document.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollTop > lastScrollTop && scrollTop > header.clientHeight ? header.classList.add('hidden') : header.classList.remove('hidden');
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    const popupTriggers = document.querySelectorAll('.popup-trigger'),
        popupClose = document.querySelectorAll('.popup-close');

    popupTriggers.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();

            const popup = document.querySelector(`.${element.dataset.popup}`);
            popup.classList.add('active');
        });
    });

    popupClose.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();

            const popup = element.closest('.popup');
            popup.classList.remove('active');
        });
    });


    const pie = document.querySelector('.pie');

    if (pie) {
        const circle = new CircularProgressBar("pie");
        circle.initial();
    }
});