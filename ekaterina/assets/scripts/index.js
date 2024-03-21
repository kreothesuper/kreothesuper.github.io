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
            // rootMargin:''

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

function init(){
    new SmoothScroll(document,80,20)
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

    target.addEventListener('mousewheel', scrolled, { passive: false })
    target.addEventListener('DOMMouseScroll', scrolled, { passive: false })

    function scrolled(e) {
        e.preventDefault(); // disable default scrolling

        var delta = normalizeWheelDelta(e)

        pos += -delta * speed
        pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

        if (!moving) update()
    }

    function normalizeWheelDelta(e){
        if(e.detail){
            if(e.wheelDelta)
                return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
            else
                return -e.detail/3 // Firefox
        }else
            return e.wheelDelta/120 // IE,Safari,Chrome
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

    var requestFrame = function() { // requestAnimationFrame cross browser
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(func) {
                window.setTimeout(func, 1000 / 50);
            }
        );
    }()
}


document.addEventListener('DOMContentLoaded', () => {
    const animation = new Animations();
    animation.init();

    initTabs();

    init();

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
        pagination:{
            type:'fraction',
            el:'.slider-pagination'
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

    gsap.to(".hero-img__item", {
        backgroundPosition: `${-innerHeight / 100}px 50%`,
        ease: "none",
        scrollTrigger: {
            scrub: true,
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
        },
    });



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

    const heroParallaxArray = document.querySelectorAll('.hero-parallax');

    heroParallaxArray.forEach(heroParallax => {
        gsap.to(heroParallax, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                scrub: true,
                trigger: ".hero",
                start: "top top",
                end: "bottom  top",
            },
        });
    })

    let panelsSection = document.querySelector("#about"),
        panelsContainer = document.querySelector("#about-container .section__wrapper"),
        tween;

    const panels = gsap.utils.toArray("#about-container .section__wrapper");
    tween = gsap.to(panels, {
        xPercent: -100 * ( panels.length - 1 ),

        ease: "none",
        scrollTrigger: {
            trigger: "#about-container",
            pin: true,
            start: "top top",
            end:'center bottom',
            scrub: 1,
            anticipatePin: 1,
            snap: {
                snapTo: 1 / (panels.length - 1),
                inertia: false,
                duration: {min: 0.1, max: 0.1}
            },
        }
    });




    const burgerArray = document.querySelectorAll('.burger');
    const nav = document.querySelector('.nav');

    if (burgerArray.length && nav) {
        burgerArray.forEach(burger => {
            burger.addEventListener('click', (e) => {
                e.preventDefault();

                nav.classList.toggle('active');
                burgerArray.forEach(burgerElement => {
                    burgerElement.classList.toggle('burger--active');

                })
            });
        });

        nav.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav')) {
                burgerArray.forEach(burgerElement => {
                    burgerElement.classList.remove('burger--active');
                    nav.classList.remove('active');
                })
            }
        })
    }


    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


    const decorArray = document.querySelectorAll(".decor");

    decorArray.forEach(decor => {
        const path = decor.querySelector('.path');
        const rect = decor.querySelector('.rect');
        const decorContainer = decor.closest('.decor-container');
        let animationTriggered = false;

        const start = decor.dataset.start || 0,
            end = decor.dataset.end || 1;

        gsap.to(rect, {
            scrollTrigger: {
                trigger: decorContainer,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            ease: "power1.inOut",
            duration: 50,
            repeat: 1,
            motionPath: {
                path,
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


    gsap.to("#panels", {
        scrollTrigger: {
            trigger: "#panels",
            pin: true,
            pinSpacing: false,
            start: "top top",
            end: "bottom top",
  
            id: "hero"
        }
    });


    const popupButtonArray = document.querySelectorAll('[data-popup]');

    if (popupButtonArray.length) {
        popupButtonArray.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                showPopup(`${button.dataset.popup}`);
            });
        });
    }
})