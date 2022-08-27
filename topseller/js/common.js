const setTranslate = (positionY, parallaxItem) => {
    parallaxItem.style.transform = "translate3d(0, " + positionY + "px, 0)";
}

const scrollLoop = (scrollTop, parallaxItems) => {
    let scrollSpeed = 3,
        yScrollPosition = scrollTop * scrollSpeed;
    parallaxItems.forEach(parallaxElement => {
        const parallaxElementCoefficient = +parallaxElement.dataset.coefficient;
        setTranslate(yScrollPosition * -parallaxElementCoefficient, parallaxElement);
        if (document.body.getBoundingClientRect().bottom > parallaxItems[parallaxItems.length - 1].getBoundingClientRect().bottom) {
            return
        }
    });
}

const findParallaxIndex = (el) => {
    const parallaxArray = [...document.querySelectorAll('.parallax')];

    return parallaxArray.indexOf(el);
}


document.addEventListener('DOMContentLoaded', () => {
    // SLIDERS INITS
    const advantagesSlider = new Swiper(".advantages", {
            slidesPerView: 'auto',
            freeMode: false,
            scrollbar: {
                el: ".advantages-scrollbar",
            },
            mousewheel: {
                invert: false,
            },
            breakpoints: {
                1100: {
                    slidesPerView: 'auto',
                }
            }
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
        });

    if (window.innerWidth <= 991) {
        const tariffsSlider = new Swiper(".tariffs", {
            slidesPerView: 'auto',
            freeMode: false,
            spaceBetween: 30,
            scrollbar: {
                el: ".tariffs-scrollbar",
            },
            breakpoints: {
                991: {
                    spaceBetween: 0
                }
            }
        });
    }

    if (window.innerWidth <= 1240) {
        const statisticsSlider = new Swiper(".statistics", {
            slidesPerView: 'auto',
            freeMode: false,
            spaceBetween: 15,
            scrollbar: {
                el: ".statistics-scrollbar",
            },
            mousewheel: {
                invert: false,
            },
        });
    }

    // HEADER SETTINGS
    const header = document.querySelector('.header');

    let lastScrollTop = window.pageYOffset || document.scrollTop;

    document.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollTop > lastScrollTop && scrollTop > header.clientHeight ? header.classList.add('hidden') : header.classList.remove('hidden');
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // POPUP || MENU SETTINGS
    const popup = document.querySelector('.popup');

    if (popup) {
        const popupTriggers = document.querySelectorAll('*[data-popup]'),
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
    }


    // CIRCLE PIE SETTINGS
    const pie = document.querySelector('.pie');

    if (pie) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = new CircularProgressBar("pie");
                    circle.initial();

                    observer.unobserve(pie);
                }
            })
        }, {threshold: 0.5});
        observer.observe(pie);
    }


    // PARALLAX SETTINGS
    const parallaxItems = document.querySelectorAll('.parallax');

    const dataAnchorLinks = document.querySelectorAll('*[data-anchor]');

    /*
    if (window.innerWidth > 1100) {

        var scrollTop = 0;

        dataAnchorLinks.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();

                scrollTop = +element.dataset.height;
                parallaxItems.forEach(element => {
                    element.classList.add('transition');
                });
                scrollLoop(scrollTop, parallaxItems)
                setTimeout(() => {
                    parallaxItems.forEach(element => {
                        element.classList.remove('transition')
                    });
                }, 500)
            });
        });
        document.addEventListener('wheel', (event) => {

            let scrollDeep = event.deltaY;

            if (scrollDeep < 0) {
                header.classList.remove('hidden')
            } else {
                header.classList.add('hidden');
            }

            scrollTop += scrollDeep;

            scrollTop <= 0 ? scrollTop = 0 : scrollTop;

            scrollLoop(scrollTop, parallaxItems);
        });
    }
     */


    var swiper = new Swiper(".parallax-slider", {
        direction:'vertical',
        slidesPerView:'auto',
        freeMode:true,
        mousewheel:{
            invert:false,
        },
        speed: 1500,
        parallax:true,
        on:{
            beforeInit:function () {
                parallaxItems.forEach(element=>{
                    const container = element.querySelector('.parallax__wrapper');
                    element.style.height = `${container.offsetHeight}px`;
                });
            },
            afterInit:function () {
                const dataAnchorLinks = document.querySelectorAll('*[data-anchor]');
                dataAnchorLinks.forEach(element => {
                    element.addEventListener('click',(e)=>{
                        e.preventDefault();
                        this.slideTo(+element.dataset.anchor);
                    })
                });
            }
        }
    });
    swiper.on('beforeInit',function () {

    });
});