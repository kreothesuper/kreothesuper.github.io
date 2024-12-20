const initTabs = () => {
    const tabs = [...document.querySelectorAll(".tabs")];

    if (tabs.length > 0) {
        tabs.forEach((tab) => {
            const tabContent = [...tab.querySelectorAll(".tabs__content")];
            const tabLinks = [...tab.querySelectorAll(".tabs__link")];

            const openTab = (tabIndex = 0) => {
                tabContent.forEach((element, i) => {
                    const isActive = i === tabIndex;
                    element.classList.toggle("active", isActive);
                });

                tabLinks.forEach((element, i) => {
                    element.classList.toggle("active", i === tabIndex);
                });
            }

            openTab(0)

            tabLinks.forEach((link, i) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    openTab(i);
                });
            });
        });
    }
}

class Animations {
    constructor() {
        this.animationWrapperArray = document.querySelectorAll('.animation-wrapper');
    }

    toggleAnimation(animationWrapperElement) {
        const animationItemArray = animationWrapperElement.querySelectorAll('.animation-item');
        animationItemArray.forEach((animationItemElement, animationItemIndex) => {
            animationItemElement.style.setProperty(`--animation-delay`, `${animationItemIndex * 0.2}s`);
            animationItemElement.classList.add('animated');
        });
    }


    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.toggleAnimation(entry.target);
            }
        });
    }

    init() {
        if (!this.animationWrapperArray.length) return;


        const observer = new IntersectionObserver(this.handleIntersection.bind(this), {
            threshold: 0.1
        });
        this.animationWrapperArray.forEach(animationWrapper => {
            observer.observe(animationWrapper);
        });
    }
}


const showPopup = popupId => {
    const popup = document.querySelector(popupId);
    if (!popup) return

    hideAllPopups();

    popup.classList.add('popup--active');
    document.body.classList.add('no-scroll');

    document.addEventListener('click', checkTargetOrKey);
    document.addEventListener('keyup', checkTargetOrKey);
};

const hideAllPopups = () => {
    const popups = document.querySelectorAll('.popup');

    popups.forEach(popup => {
        popup.classList.remove('popup--active');
    });
    document.body.classList.remove('no-scroll');

    document.removeEventListener('click', checkTargetOrKey);
    document.removeEventListener('keyup', checkTargetOrKey);
};

const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup__wrapper') ||
        event.key === 'Escape' ||
        event.target.closest('.popup__close')
    ) {
        event.preventDefault();
        hideAllPopups();
    }
};

function init() {
    new SmoothScroll(document, 80, 20)
}

function SmoothScroll(target, speed, smooth) {
    if (target === document)
        target = (document.scrollingElement
            || document.documentElement
            || document.body.parentNode
            || document.body) // cross browser support for document scrolling

    var moving = false
    var pos = target.scrollTop
    var frame = target === document.body
    && document.documentElement
        ? document.documentElement
        : target // safari is the new IE

    target.addEventListener('mousewheel', scrolled, {passive: false})
    target.addEventListener('DOMMouseScroll', scrolled, {passive: false})

    function scrolled(e) {
        e.preventDefault(); // disable default scrolling

        var delta = normalizeWheelDelta(e)

        pos += -delta * speed
        pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

        if (!moving) update()
    }

    function normalizeWheelDelta(e) {
        if (e.detail) {
            if (e.wheelDelta)
                return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1) // Opera
            else
                return -e.detail / 3 // Firefox
        } else
            return e.wheelDelta / 120 // IE,Safari,Chrome
    }

    function update() {
        moving = true

        var delta = (pos - target.scrollTop) / smooth

        target.scrollTop += delta

        if (Math.abs(delta) > 0.5)
            requestFrame(update)
        else
            moving = false
    }

    var requestFrame = function () { // requestAnimationFrame cross browser
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (func) {
                window.setTimeout(func, 1000 / 50);
            }
        );
    }()
}


document.addEventListener('DOMContentLoaded', () => {
    const animation = new Animations();
    animation.init();
    // init();

    initTabs();

    const swiper = new Swiper('.slider-advantages', {
        speed: 400,
        spaceBetween: 0,
        slidesPerView: 1,
        effect: 'fade',
        navigation: {
            nextEl: '.slider-button--next',
            prevEl: '.slider-button--prev',
        },

    });

    swiper.on('slideChange', function () {
        swiper.slides.forEach(slide => {
            const animationArray = slide.querySelectorAll('.animation-item');
            if (animationArray.length) {
                animationArray.forEach(element => {
                    element.classList.remove('animated');
                })
            }
        });

        const activeSlideAnimationArray = swiper.slides[swiper.activeIndex].querySelectorAll('.animation-item');
        activeSlideAnimationArray.forEach(element => {
            element.classList.add('animated');
        })
    });

    const plans = new Swiper('.slider-plans', {
        speed: 400,
        spaceBetween: 0,
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.slider-button--next',
            prevEl: '.slider-button--prev',
        },
        pagination: {
            type: 'fraction',
            el: '.slider-pagination'
        },
        on: {
            slideChange: function (swiper) {
                swiper.slides.forEach(slide => {
                    const animationArray = slide.querySelectorAll('.animation-item');
                    if (animationArray.length) {
                        animationArray.forEach(element => {
                            element.classList.remove('animated');
                        })
                    }
                });

                const activeSlideAnimationArray = swiper.slides[swiper.activeIndex].querySelectorAll('.animation-item');
                activeSlideAnimationArray.forEach(element => {
                    element.classList.add('animated');
                })
            },
        },
    });

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    gsap.to(".hero-img__bg", {
        backgroundPosition: `${-innerHeight / 2}px top`,
        ease: "none",
        scrollTrigger: {
            scrub: true,
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
        },
    });

    const sectionBg = document.querySelectorAll('.section-bg');

    if (sectionBg.length && window.innerWidth > 767) {
        sectionBg.forEach(element => {
            const sectionBgItem = element.querySelector('.section-bg__item');
            gsap.to(sectionBgItem, {
                y:'-30vh',
                ease: "none",
                scrollTrigger: {
                    scrub: true,
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                },
            });
        })
    }


    gsap.from(".branch__img", {
        ease: "none",
        // yPercent: -100,
        y: '30vh',
        rotation: 30,
        duration: 5000,
        scrollTrigger: {
            scrub: true,
            trigger: ".branch-wrapper",
            start: "-800vh top",
            end: "top top",

        },
    });
    gsap.to(".branch__container", {
        ease: "none",
        yPercent: -50,
        duration: 5000,
        rotation: -30,
        scrollTrigger: {
            scrub: true,
            trigger: ".branch-wrapper",
            start: "top top",
        },
    });

    gsap.from(".branch__decor", {
        ease: "none",
        // yPercent: -100,
        y: '10vh',
        rotation: -20,
        duration: 5000,
        scrollTrigger: {
            scrub: true,
            trigger: ".branch-wrapper",
            start: "-200vh top",
            end: "top top",
        },
    });

    gsap.from(".architecture__img", {
        ease: "none",
        // yPercent: -100,
        y: '40vh',
        rotation: -30,
        duration: 5000,
        scrollTrigger: {
            scrub: true,
            trigger: ".architecture",
            start: "top bottom",
            end: "bottom top",
        },
    });
    gsap.from(".fort__rectangle", {
        ease: "none",
        // yPercent: -100,
        y: '25vh',
        rotation: -30,
        duration: 5000,
        scrollTrigger: {
            scrub: true,
            trigger: ".fort",
            start: "top bottom",
            end: "bottom top",
        },
    });

    const heroParallaxArray = document.querySelectorAll('.hero-parallax');

    heroParallaxArray.forEach(heroParallax => {
        gsap.to(heroParallax, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                scrub: true,
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
            },
        });
    })


    const burgerArray = document.querySelectorAll('.burger');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');

    const navDecorPath = document.querySelector('.nav-decor__path');
    const navDecorRect = document.querySelector('.nav-decor__rect');


    if (burgerArray.length && nav) {
        document.body.style.setProperty('--scrollbar-width', `${window.innerWidth - document.documentElement.clientWidth}px`)
        burgerArray.forEach(burger => {
            burger.addEventListener('click', (e) => {
                e.preventDefault();
                header.classList.toggle('active');
                nav.classList.toggle('active');
                if (nav.classList.contains('active')) {
                    gsap.to(navDecorRect, {
                        ease: "power1.inOut",
                        duration: 3,
                        repeat: 0,
                        motionPath: {
                            path: navDecorPath,
                            align: navDecorPath,
                            autoRotate: true,
                            end: .25,
                            alignOrigin: [0.5, 0.5]
                        },
                    });
                } else {
                    gsap.to(navDecorRect, {
                        ease: "power1.inOut",
                        duration: 3,
                        repeat: 0,
                        motionPath: {
                            path: navDecorPath,
                            align: navDecorPath,
                            autoRotate: true,
                            start: .25,
                            end: 0,
                            alignOrigin: [0.5, 0.5]
                        },
                    });
                }
                document.body.classList.toggle('no-scroll');
                burgerArray.forEach(burgerElement => {
                    burgerElement.classList.toggle('burger--active');
                })
            });
        });

        nav.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav')) {
                document.body.classList.remove('no-scroll');
                nav.classList.remove('active');
                header.classList.toggle('active');
                burgerArray.forEach(burgerElement => {
                    burgerElement.classList.remove('burger--active');
                });

                sap.to(navDecorRect, {
                    ease: "power1.inOut",
                    duration: 3,
                    repeat: 0,
                    motionPath: {
                        path: navDecorPath,
                        align: navDecorPath,
                        autoRotate: true,
                        start: .25,
                        end: 0,
                        alignOrigin: [0.5, 0.5]
                    },
                });
            }
        })
    }


    const decorArray = document.querySelectorAll(".decor");

    decorArray.forEach(decor => {
        const path = decor.querySelector('.path');
        const rect = decor.querySelector('.rect');
        const decorContainer = decor.closest('.decor-container');
        let animationTriggered = false;

        let start = decor.dataset.start || 0,
            end = decor.dataset.end || 1;

        console.log(decor.dataset.mStart)

        if(decor.dataset.mStart && decor.dataset.mEnd && window.innerWidth < 767){
            start = decor.dataset.mStart;
            end = decor.dataset.mEnd;
        }

        gsap.to(rect, {
            scrollTrigger: {
                trigger: decorContainer,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
            ease: "power1.inOut",
            duration: 5,
            repeat: 0,
            motionPath: {
                path: path,
                align: path,
                autoRotate: true,
                start: start,
                end: end,
                alignOrigin: [0.5, 0.5]
            },
            onComplete: () => {
                animationTriggered = true;
            }
        });
    });

    const overlaySection = document.querySelectorAll('.overlay-section');
    const overlayWrapper = document.querySelector('.overlay-wrapper');

    if (overlaySection.length && window.innerWidth >= 768) {
        overlaySection.forEach((section, i) => {
            gsap.to(section, {
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    pinSpacing: false,
                    start: "top top",
                    end: "bottom top",
                }
            });
            const sectionWrapper = section.querySelector('.section__wrapper');
            gsap.to(sectionWrapper, {
                ease: 'none',
                yPercent: -20,
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });
        })
    }


    const popupButtonArray = document.querySelectorAll('[data-popup]');

    if (popupButtonArray.length) {
        popupButtonArray.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                showPopup(`${button.dataset.popup}`);
            });
        });
    }


    const mapListLink = document.querySelectorAll('.map-list__link');
    const map = document.querySelector('.map');
    const mapIcons = document.querySelectorAll('.map-icon__item');

    if (mapListLink.length && map) {
        mapListLink.forEach(link => {
            const name = link.dataset.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (map.dataset.current === name) {
                    link.classList.remove('active');
                    map.dataset.current = '';
                    mapIcons.forEach(icon => icon.classList.remove('hidden'));
                } else {
                    map.dataset.current = name;
                    mapListLink.forEach(mapLink => {
                        mapLink !== link ? mapLink.classList.remove('active') : mapLink.classList.add('active');
                    });
                    if (map.dataset.current !== 'all') {
                        mapIcons.forEach(icon => {
                            icon.dataset.name === name ? icon.classList.remove('hidden') : icon.classList.add('hidden');
                        });
                    } else {
                        mapIcons.forEach(icon => icon.classList.remove('hidden'));
                    }

                }
            });
        });
    }



    const rangeArray = document.querySelectorAll('.js-range');
    if (rangeArray.length > 0) {
        rangeArray.forEach(range => {
            const rangeElement = range.querySelector('.range-slider'),
                rangeMax = rangeElement.dataset.max,
                rangeMin = rangeElement.dataset.min,
                rangeInputMin = range.querySelector('.js-range-from-input'),
                rangeInputMax = range.querySelector('.js-range-to-input');
            if(rangeInputMin && rangeInputMax){
                const rangeSliderElement = rangeSlider(rangeElement, {
                    min: rangeMin,
                    max: rangeMax,
                    step: .2,
                    value: [rangeMin,rangeMax],
                    disabled: false,
                    rangeSlideDisabled: false,
                    thumbsDisabled: [false, false],
                    orientation: 'horizontal',
                    onInput: function (valueSet) {
                        rangeInputMin.value = valueSet[0];
                        rangeInputMax.value = valueSet[1];
                    },
                });

                rangeInputMin.value = rangeSliderElement.value()[0];
                rangeInputMax.value = rangeSliderElement.value()[1];
            }
        });
    }
});

window.addEventListener('load',()=>{
    const decorArray = document.querySelectorAll(".decor");
    decorArray.forEach(decor=>{
       decor.querySelector('.rect').classList.add('visible')
    });
});

