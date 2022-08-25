
document.addEventListener('DOMContentLoaded', () => {
    // SLIDERS INITS
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


    // HEADER SETTINGS
    const header = document.querySelector('.header');

    let lastScrollTop = window.pageYOffset || document.scrollTop;

    document.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollTop > lastScrollTop && scrollTop > header.clientHeight ? header.classList.add('hidden') : header.classList.remove('hidden');
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // POPUP || MENU SETTINGS
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


    // CIRCLE PIE SETTINGS
    const pie = document.querySelector('.pie');

    if(pie){
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = new CircularProgressBar("pie");
                    circle.initial();

                    observer.unobserve(pie);
                }
            })
        }, { threshold: 0.5 });

        observer.observe(pie);
    }


    // PARALLAX SETTINGS
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(entry)
            }
        })
    }, { threshold: 0.5 });


    const firstEl = document.querySelector('.hero');
    const textEl = document.querySelector(".parallax"),
        parallaxSecond = document.querySelector('.section-statistics'),
        parallaxThird = document.querySelector('.section-how'),
        parallaxFourth = document.querySelector('.section-setup'),
        parallaxFifth = document.querySelector('.section-tariffs'),
        parallaxSix = document.querySelector('.section-rate'),
        parallaxSeven = document.querySelector('.footer');

    firstEl.addEventListener('scroll',(e)=>{
       console.log(event);
    });

    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + ", " + yPos + "px, 0)";
    }

    window.addEventListener("DOMContentLoaded", scrollLoop, false);

    let xScrollPosition;
    let yScrollPosition;

    function scrollLoop(scrollTop) {
        xScrollPosition = window.pageXOffset;
        yScrollPosition = scrollTop * .6;


        setTranslate(0, yScrollPosition * -0.3, textEl);
        setTranslate(0, yScrollPosition * -0.4, parallaxSecond);
        setTranslate(0, yScrollPosition * -0.45, parallaxThird);
        setTranslate(0, yScrollPosition * -0.5, parallaxFourth);
        setTranslate(0, yScrollPosition * -0.53, parallaxFifth);
        setTranslate(0, yScrollPosition * -0.55, parallaxSix);
        setTranslate(0, yScrollPosition * -0.56, parallaxSeven);


        // We use requestAnimationFrame to target the GPU instead of the CPU
    }

    let scrollTop = 0;

    const parallaxBlocks = document.querySelectorAll('.parallax');
    let blockHeight = 0;
    parallaxBlocks.forEach(element=>{
        blockHeight += element.clientHeight;
    });

    console.log(blockHeight)

    parallaxBlocks.forEach(element=>{
        observer.observe(element);
    })

    document.addEventListener('mousewheel', (event) => {

        let scrollDeep = event.deltaY;

        scrollDeep < 0 ? header.classList.remove('hidden') : header.classList.add('hidden');

        scrollTop += scrollDeep;

        scrollTop <= 0 ? scrollTop = 0 : scrollTop;
        scrollTop * .6 * 0.56>= blockHeight ? scrollTop = blockHeight : scrollTop;

        console.log(scrollTop * .6 * 0.56, blockHeight)

        scrollLoop(scrollTop)
    });

    document.addEventListener('touchmove', (event) => {

        let scrollDeep = event.deltaY;

        scrollDeep < 0 ? header.classList.remove('hidden') : header.classList.add('hidden');

        scrollTop += scrollDeep;

        scrollTop <= 0 ? scrollTop = 0 : scrollTop;
        scrollTop * .6 * 0.56>= blockHeight ? scrollTop = blockHeight : scrollTop;

        console.log(scrollTop * .6 * 0.56, blockHeight)

        scrollLoop(scrollTop)
    });
});