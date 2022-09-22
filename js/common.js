const setTranslate = (positionY, parallaxItem) => {
    parallaxItem.style.transform = "translate3d(0, " + positionY + "px, 0)";
}

const scrollLoop = (scrollTop, parallaxItems) => {
    let scrollSpeed = 2,
        yScrollPosition = scrollTop * scrollSpeed;
    parallaxItems.forEach(parallaxElement => {
        const parallaxElementCoefficient = +parallaxElement.dataset.coefficient;
        setTranslate(yScrollPosition * -parallaxElementCoefficient, parallaxElement);
    });
}

const findParallaxIndex = (el) => {
    const parallaxArray = [...document.querySelectorAll('.parallax')];

    return parallaxArray.indexOf(el);
}

function throttle(func, ms) {

    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

var PIXEL_STEP = 40;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = document.body.clientHeight;

function normalizeWheel(event) {
    var sX = 0, sY = 0,
        pX = 0, pY = 0;

    // Legacy
    if ('detail' in event) {
        sY = event.detail;
    }
    if ('wheelDelta' in event) {
        sY = -event.wheelDelta / 120;
    }
    if ('wheelDeltaY' in event) {
        sY = -event.wheelDeltaY / 120;
    }
    if ('wheelDeltaX' in event) {
        sX = -event.wheelDeltaX / 120;
    }

    // side scrolling on FF with DOMMouseScroll
    if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
    }

    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;

    if ('deltaY' in event) {
        pY = event.deltaY;
    }
    if ('deltaX' in event) {
        pX = event.deltaX;
    }

    if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode == 1) {          // delta in LINE units
            pX *= LINE_HEIGHT;
            pY *= LINE_HEIGHT;
        } else {                             // delta in PAGE units
            pX *= PAGE_HEIGHT;
            pY *= PAGE_HEIGHT;
        }
    }

    // Fall-back if spin cannot be determined
    if (pX && !sX) {
        sX = (pX < 1) ? -1 : 1;
    }
    if (pY && !sY) {
        sY = (pY < 1) ? -1 : 1;
    }

    return {py: pY, px: pX};
}

const counterAnim = (target, start = 0, end, duration = 1000) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        target.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const animateMarquee = (el, duration) => {
    const innerEl = el.querySelector('.marque-wrapper'),
        innerWidth = innerEl.offsetWidth,
        cloneEl = innerEl.cloneNode(true);

    el.appendChild(cloneEl);

    let start = performance.now(),
        progress,
        translateX;

    requestAnimationFrame(function step(now) {
        progress = (now - start) / duration;

        if (progress > 1) {
            progress %= 1;
            start = now;
        }

        translateX = innerWidth * progress;

        innerEl.style.transform = `translate3d(-${translateX}px, 0 , 0)`;
        cloneEl.style.transform = `translate3d(-${translateX}px, 0 , 0)`;
        requestAnimationFrame(step);
    });
};


const expandedList = (block, height) => {
    const expandendBlock = block.querySelector('.expanded-block'),
        expandendBlockHeight = block.clientHeight;

    if (expandendBlockHeight > height) {
        expandendBlock.style.height = `${height}px`;

        const link = document.createElement('span');
        link.classList.add('expanded-link');

        block.append(link);

        link.addEventListener('click', () => {
            link.classList.toggle('active');
            link.classList.contains('active') ? expandendBlock.style.height = `${expandendBlockHeight}px` : expandendBlock.style.height = `${height}px`;
        });
    }
}

const createScrollbarContent = (block) => {
    const newArrow = document.createElement('div'),
        newArrowText = document.createElement('p'),
        newArrowLabel = document.createElement('span');

    newArrow.classList.add('slider-scrollbar-wrapper');
    newArrowText.classList.add('slider-scrollbar-text');
    newArrowLabel.classList.add('slider-scrollbar-label');

    newArrowLabel.innerHTML = 'Потяните для навигации';

    newArrowText.append(newArrowLabel);
    newArrow.append(newArrowText);

    block.append(newArrow);
}

const calculateDistanceToBlock = () => {
    const parallaxItems = document.querySelectorAll('.parallax');
    const dataAnchorLinks = document.querySelectorAll('*[data-anchor]');

    dataAnchorLinks.forEach(element => {
        const anchorBlock = document.querySelector(`.${element.dataset.anchor}`);
        let dataHeight = 0,
            parallaxIndex = findParallaxIndex(anchorBlock);

        parallaxItems.forEach((elementParallax, indexParallax) => {
            indexParallax < parallaxIndex ? (elementParallax.dataset.height = dataHeight, dataHeight += elementParallax.clientHeight) : null;
        });

        element.dataset.coefficient = anchorBlock.dataset.coefficient;
        element.dataset.height = dataHeight;
    });
}

const onTapOrClick = (element, cb) => {
    let debounce;
    element.addEventListener("touchstart", (event) => {
        if (debounce) {
            clearTimeout(debounce);
        }
        debounce = setTimeout(() => debounce = undefined, 2000);  // debounce is 1000ms, could easily be longer
        cb(event);
    });
    element.addEventListener("click", (event) => {
        event.preventDefault();
        if (debounce) {
            return;
        }
        cb(event);
    });
}

const onTapOrHover = (element, cb) => {
    let onlongtouch;
    let timer;
    const touchduration = 500,
        touchDurationLong = 800;

    function touchstart(e) {
        if (!timer) {
            timer = setTimeout(onlongtouch, touchduration);
        }
    }

    function touchend() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    onlongtouch = function () {
        timer = null;
        throttle(cb(),1000);
    };
    element.addEventListener("touchstart", touchstart);
    element.addEventListener("touchend", touchend);


    element.addEventListener('mouseenter', () => {
        if (!timer) {
            timer = setTimeout(() => element.classList.add('active'), touchduration);
        }
    });
    element.addEventListener('mouseleave', () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        setTimeout(() => {
            element.classList.remove('active');
        }, 2000);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const expandedBlocks = document.querySelectorAll('.expanded-wrapper'),
            tariffsList = document.querySelectorAll('.tariffs-item__list');

        if (tariffsList.length > 0) {
            tariffsList.forEach(element => {
                let height = 0;
                const tariffsListItem = document.querySelectorAll('.tariffs-item__list-block');

                tariffsListItem.forEach((tarifElement, tarifIndex) => {


                    tarifIndex <= 9 ? height += tarifElement.getBoundingClientRect().height : null;
                });

                element.closest('.expanded-wrapper').dataset.height = height;
            });
        }

        if (expandedBlocks.length > 0) {
            expandedBlocks.forEach(element => {
                expandedList(element, element.dataset.height);
            });
        }
    }, 300);

    // SLIDERS INITS
    const advantagesSlider = new Swiper(".advantages", {
            slidesPerView: 'auto',
            freeMode: false,
            scrollbar: {
                el: ".advantages-scrollbar",
                draggable: true,
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
        }),
        indicatorsSlider = new Swiper('.indicators', {
            slidesPerView: 'auto',
            spaceBetween: 15,
            breakpoints: {
                600: {
                    spaceBetween: 25,
                },
                1100: {
                    spaceBetween: 0,
                }
            }
        }),
        capabilitiesSlider = new Swiper(".capabilities-slider", {
            slidesPerView: 1,
            spaceBetween: 40,
            speed: 1000,
            navigation: {
                nextEl: ".capabilities-button-next",
                prevEl: ".capabilities-button-prev",
            },
            mousewheel: {
                invert: false,
                forceToAxis: true,
            },
            scrollbar: {
                el: ".capabilities-scrollbar",
                draggable: true,
                snapOnRelease: true,
            },
            breakpoints: {
                440: {
                    slidesPerView: 'auto'
                }
            },
            on: {
                init: function () {
                    const scrollbar = document.querySelector('.capabilities-scrollbar'),
                        scrollbarDrag = scrollbar.querySelector('.swiper-scrollbar-drag');

                    createScrollbarContent(scrollbarDrag);
                },
            },
        }),
        functionSlider = new Swiper(".function-slider", {
            slidesPerView: 1,
            spaceBetween: 40,
            speed: 1000,
            navigation: {
                nextEl: ".function-button-next",
                prevEl: ".function-button-prev",
            },
            breakpoints: {
                440: {
                    slidesPerView: 'auto'
                }
            },
            mousewheel: {
                invert: false,
                forceToAxis: true,
            },
            scrollbar: {
                el: ".function-scrollbar",
                draggable: true,
            },
            on: {
                init: function () {
                    const scrollbar = document.querySelector('.function-scrollbar'),
                        scrollbarDrag = scrollbar.querySelector('.swiper-scrollbar-drag');

                    createScrollbarContent(scrollbarDrag);
                },
            },
        }),
        featureSlider = new Swiper(".feature-slider", {
            slidesPerView: 1,
            spaceBetween: 40,
            speed: 1000,
            navigation: {
                nextEl: ".feature-button-next",
                prevEl: ".feature-button-prev",
            },
            mousewheel: {
                invert: false,
                forceToAxis: true,
            },
            breakpoints: {
                750: {
                    slidesPerView: 'auto'
                }
            },
            scrollbar: {
                el: ".feature-scrollbar",
                draggable: true,
            },
            on: {
                init: function () {
                    const scrollbar = document.querySelector('.feature-scrollbar'),
                        scrollbarDrag = scrollbar.querySelector('.swiper-scrollbar-drag');

                    createScrollbarContent(scrollbarDrag);
                },
            },
        }),
        ecosystemSlider = new Swiper(".ecosystem-slider", {
            slidesPerView: 1,
            spaceBetween: 40,
            speed: 1000,
            scrollbar: {
                el: ".ecosystem-scrollbar",
                draggable: true,
            },
            breakpoints: {
                600: {
                    slidesPerView: 'auto'
                }
            },
            mousewheel: {
                invert: false,
                forceToAxis: true,
            },
            navigation: {
                nextEl: ".ecosystem-button-next",
                prevEl: ".ecosystem-button-prev",
            },
            on: {
                init: function () {
                    const scrollbar = document.querySelector('.ecosystem-scrollbar'),
                        scrollbarDrag = scrollbar.querySelector('.swiper-scrollbar-drag');

                    createScrollbarContent(scrollbarDrag);
                },
            },
        }),
        tariffsSlider = new Swiper(".tariffs", {
            slidesPerView: 1,
            freeMode: false,
            spaceBetween: 40,
            speed: 1000,
            scrollbar: {
                el: ".tariffs-scrollbar",
                draggable: true,
            },
            breakpoints: {
                1100: {
                    slidesPerView: 3,
                }
            },
            on: {
                init: function () {
                    const scrollbar = document.querySelector('.tariffs-scrollbar'),
                        scrollbarDrag = scrollbar.querySelector('.swiper-scrollbar-drag');

                    createScrollbarContent(scrollbarDrag);
                },
            },
        }),
        reviewSlider = new Swiper(".review-slider", {
            slidesPerView: 1,
            spaceBetween: 40,
            speed: 1000,
            navigation: {
                nextEl: ".review-button-next",
                prevEl: ".review-button-prev",
            },
            mousewheel: {
                invert: false,
                forceToAxis: true,
            },
            breakpoints: {
                600: {
                    slidesPerView: 'auto'
                }
            },
            scrollbar: {
                el: ".review-scrollbar",
                draggable: true,
            },
            on: {
                init: function () {
                    const scrollbar = document.querySelector('.review-scrollbar'),
                        scrollbarDrag = scrollbar.querySelector('.swiper-scrollbar-drag');

                    createScrollbarContent(scrollbarDrag);
                },
            },
        }),
        newsSlider = new Swiper(".news-slider", {
            slidesPerView: 1,
            spaceBetween: 40,
            speed: 1000,
            breakpoints: {
                600: {
                    slidesPerView: 'auto'
                }
            },
            mousewheel: {
                invert: false,
                forceToAxis: true,
            },
            navigation: {
                nextEl: ".news-button-next",
                prevEl: ".news-button-prev",
            },
            scrollbar: {
                el: ".news-scrollbar",
                draggable: true,
            },
            on: {
                init: function () {
                    const scrollbar = document.querySelector('.news-scrollbar'),
                        scrollbarDrag = scrollbar.querySelector('.swiper-scrollbar-drag');

                    createScrollbarContent(scrollbarDrag);
                },
            },
        }),
        problemSlider = new Swiper(".problem-slider", {
            slidesPerView: 1,
            spaceBetween: 40,
            speed: 1000,
            scrollbar: {
                el: ".problem-scrollbar",
            },
            mousewheel: {
                invert: false,
                forceToAxis: true,
            },
            breakpoints: {
                1150: {
                    spaceBetween: 60,
                    slidesPerView: 2
                },
                1300: {
                    spaceBetween: 140,
                    slidesPerView: 2,
                }
            },
            on: {
                init: function () {
                    const scrollbar = document.querySelector('.problem-scrollbar'),
                        scrollbarDrag = scrollbar.querySelector('.swiper-scrollbar-drag');

                    createScrollbarContent(scrollbarDrag);
                },
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

    // PARALLAX SETTINGS
    const parallaxItems = document.querySelectorAll('.parallax');

    let height = 0;
    parallaxItems.forEach(element => {
        height += element.clientHeight;
    });

    // COUNTER SETTINGS
    const counter = document.querySelectorAll('.counter');

    if (counter.length > 0) {
        counter.forEach(element => {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counterAnim(element, 0, element.dataset.end, 1000);

                        observer.unobserve(element);
                    }
                })
            }, {threshold: 0.5});
            observer.observe(element);
        });
    }

    // ANIMATION LINE SETTINGS


    const marque = document.querySelectorAll('.marque');

    if (marque.length > 0) {
        marque.forEach(element => {
            animateMarquee(element, 20000);
        })
    }

    if (window.innerWidth > 991) {
        const heroVideoBlock = document.querySelector('.hero__video');

        const heroVideo = document.createElement('video');

        heroVideo.classList.add('hero__video-item');
        heroVideo.autoplay = true;
        heroVideo.muted = true;
        heroVideo.loop = true;

        const heroVideoSourceMp4 = document.createElement('source'),
            heroVideoSourceWebm = document.createElement('source');

        heroVideoSourceMp4.classList.add('hero-video-source-mp4');
        heroVideoSourceWebm.classList.add('hero-video-source-webm');

        heroVideoSourceWebm.src = 'img/home-video.webm';
        heroVideoSourceWebm.type = 'video/webm'

        heroVideoSourceMp4.src = 'img/home-video.mp4';
        heroVideoSourceMp4.type = 'video/mp4'

        heroVideo.append(heroVideoSourceWebm);
        heroVideo.append(heroVideoSourceMp4);

        heroVideoBlock.append(heroVideo)
    }

    if (window.innerWidth > 1100) {
        const dataAnchorLinks = document.querySelectorAll('*[data-anchor]');

        let scrollTop = 0,
            scrollSpeed = 2,
            lastBlockParallaxCoefficient = +parallaxItems[parallaxItems.length - 1].dataset.coefficient + 0.001;

        dataAnchorLinks.forEach(element => {
            const popup = document.querySelectorAll('.popup');

            element.addEventListener('click', (e) => {
                e.preventDefault();

                calculateDistanceToBlock();

                popup.forEach(element => {
                    element.classList.remove('active');
                });

                scrollTop = (+element.dataset.height) / (scrollSpeed * element.dataset.coefficient);

                if (element.dataset.anchor === 'footer') {
                    scrollTop = (document.body.scrollHeight - window.innerHeight) / (scrollSpeed * lastBlockParallaxCoefficient);
                }

                if (element.dataset.slider === 'dropshipping') {
                    ecosystemSlider.slideTo(3);
                }

                parallaxItems.forEach(element => {
                    element.classList.add('transition')
                });
                scrollLoop(scrollTop, parallaxItems, scrollSpeed)
                setTimeout(() => {
                    parallaxItems.forEach(element => {
                        element.classList.remove('transition')
                    });
                }, 500)
            });
        });

        document.addEventListener('wheel', (event) => {

            let scrollNormalized = normalizeWheel(event);
            let scrollDeep = scrollNormalized.py;

            if (Math.abs(scrollNormalized.px) < 10) {
                if ((scrollTop + scrollDeep) * scrollSpeed * lastBlockParallaxCoefficient >= document.body.scrollHeight - window.innerHeight) {
                    if (scrollDeep > 0) {
                        scrollTop = (document.body.scrollHeight - window.innerHeight) / (scrollSpeed * lastBlockParallaxCoefficient);
                        scrollLoop(scrollTop, parallaxItems, scrollSpeed);
                        return false
                    }
                }

                scrollTop += scrollDeep;

                if (scrollDeep > 0 && scrollTop > 500) {
                    header.classList.add('hidden')
                } else {
                    header.classList.remove('hidden');
                }

                scrollTop <= 0 ? scrollTop = 0 : scrollTop;


                scrollLoop(scrollTop, parallaxItems, scrollSpeed);
            }
        });
    } else {
        const dataAnchorLinks = document.querySelectorAll('*[data-anchor]');

        dataAnchorLinks.forEach(element => {
            const popup = document.querySelectorAll('.popup');

            element.addEventListener('click', (e) => {
                e.preventDefault();


                popup.forEach(element => {
                    element.classList.remove('active');
                });

                const block = document.querySelector(`.${element.dataset.anchor}`);

                block.scrollIntoView({
                    block: 'start',
                    behavior: 'smooth',
                    inline: "center"
                });

                if (element.dataset.anchor === 'footer') {
                    const footer = document.querySelector('.footer');

                    footer.scrollIntoView({
                        block: 'end',
                        behavior: 'smooth',
                        inline: "center"
                    });
                }

                if (element.dataset.slider === 'dropshipping') {
                    ecosystemSlider.slideTo(2);
                }
            });
        });
    }
    const flipCardTriggers = document.querySelectorAll('.flip-card-trigger');

    if (flipCardTriggers.length > 0) {
        flipCardTriggers.forEach(element => {
            onTapOrClick(element, () => element.closest('.flip-card').classList.toggle('active'));
        });
    }

    const flipCardHover = document.querySelectorAll('.flip-card-hover');

    flipCardHover.forEach(element => {
        onTapOrHover(element, () => element.classList.toggle('active'));
    });


    const oldWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;

        newWidth != oldWidth ? location.reload() : null;
    });
});