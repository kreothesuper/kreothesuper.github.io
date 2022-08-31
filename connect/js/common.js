const setTranslate = (positionY, parallaxItem) => {
    parallaxItem.style.transform = "translate3d(0, " + positionY + "px, 0)";
}

const scrollLoop = (scrollTop, parallaxItems) => {
    let scrollSpeed = 50,
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

const wheelDistance = function (evt) {
    if (!evt) evt = event;
    const w = evt.wheelDelta, d = evt.detail;
    if (d) {
        if (w) return w / d / 40 * d > 0 ? 1 : -1;
        else return -d / 3;
    } else return w / 120;
};

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

    console.log(expandendBlockHeight, expandendBlock);


    if (expandendBlockHeight >= height) {
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


document.addEventListener('DOMContentLoaded', () => {
    const expandedBlocks = document.querySelectorAll('.expanded-wrapper'),
        tariffsList = document.querySelectorAll('.tariffs-item__list');

    if (tariffsList.length > 0) {
        tariffsList.forEach(element => {
            let height = 0;
            const tariffsListItem = document.querySelectorAll('.tariffs-item__list-block');

            tariffsListItem.forEach((tarifElement,tarifIndex)=>{
               tarifIndex <= 7 ? height += tarifElement.clientHeight : null;
            });

            element.closest('.expanded-wrapper').dataset.height = height;
        });
    }

    if (expandedBlocks.length > 0) {
        expandedBlocks.forEach(element => {
            expandedList(element, element.dataset.height);
        });
    }
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
            slidesPerView: 'auto',
            spaceBetween: 40,
            speed: 1000,
            navigation: {
                nextEl: ".capabilities-button-next",
                prevEl: ".capabilities-button-prev",
            },
            scrollbar: {
                el: ".capabilities-scrollbar",
            },
            mousewheel: {
                invert: false,
            },
        }),
        functionSlider = new Swiper(".function-slider", {
            slidesPerView: 'auto',
            spaceBetween: 40,
            speed: 1000,
            navigation: {
                nextEl: ".function-button-next",
                prevEl: ".function-button-prev",
            },
            scrollbar: {
                el: ".function-scrollbar",
            },
            mousewheel: {
                invert: false,
            },
        }),
        featureSlider = new Swiper(".feature-slider", {
            slidesPerView: 'auto',
            spaceBetween: 40,
            speed: 1000,
            navigation: {
                nextEl: ".feature-button-next",
                prevEl: ".feature-button-prev",
            },
            scrollbar: {
                el: ".feature-scrollbar",
            },
            mousewheel: {
                invert: false,
            },
        }),
        ecosystemSlider = new Swiper(".ecosystem-slider", {
            slidesPerView: 'auto',
            spaceBetween: 40,
            speed: 1000,
            scrollbar: {
                el: ".ecosystem-scrollbar",
            },
            mousewheel: {
                invert: false,
            },
        }),
        tariffsSlider = new Swiper(".tariffs", {
            slidesPerView: 1,
            freeMode: false,
            spaceBetween: 40,
            scrollbar: {
                el: ".tariffs-scrollbar",
            },
            breakpoints: {
                1100: {
                    slidesPerView: 3,
                }
            }
        }),
        reviewSlider = new Swiper(".review-slider", {
            slidesPerView: 'auto',
            spaceBetween: 40,
            speed: 1000,
            navigation: {
                nextEl: ".review-button-next",
                prevEl: ".review-button-prev",
            },
            scrollbar: {
                el: ".review-scrollbar",
            },
            mousewheel: {
                invert: false,
            },
        }),
        newsSlider = new Swiper(".news-slider", {
            slidesPerView: 'auto',
            spaceBetween: 40,
            speed: 1000,
            navigation: {
                nextEl: ".news-button-next",
                prevEl: ".news-button-prev",
            },
            scrollbar: {
                el: ".news-scrollbar",
            },
            mousewheel: {
                invert: false,
            },
        }),
        problemSlider = new Swiper(".problem-slider", {
            slidesPerView: 1,
            spaceBetween: 40,
            speed: 1000,
            scrollbar: {
                el: ".problem-scrollbar",
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
            }
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

    const dataAnchorLinks = document.querySelectorAll('*[data-anchor]');

    dataAnchorLinks.forEach(element => {
        const anchorBlock = document.querySelector(`.${element.dataset.anchor}`);
        let dataHeight = 0,
            parallaxIndex = findParallaxIndex(anchorBlock);

        parallaxItems.forEach((elementParallax, indexParallax) => {
            indexParallax < parallaxIndex ? dataHeight += elementParallax.clientHeight : null;
        });

        element.dataset.height = dataHeight;
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
            animateMarquee(element, 10000);
        })
    }


    if (window.innerWidth > 1100) {

        var scrollTop = 0;

        dataAnchorLinks.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();

                scrollTop = (+element.dataset.height) / (50 * .558);
                parallaxItems.forEach(element => {
                    element.classList.add('transition')
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

            let scrollDeep = parseFloat(-wheelDistance(event), 2);

            if (scrollDeep < 0) {
                header.classList.remove('hidden')
            } else {
                header.classList.add('hidden');
            }


            if ((scrollTop + scrollDeep) * 50 * .8 >= document.body.scrollHeight - window.innerHeight) {
                if (scrollDeep > 0) {
                    scrollTop = (document.body.scrollHeight - window.innerHeight) / (50 * .8);
                } else {
                    scrollTop += scrollDeep;
                }
            } else {
                scrollTop += scrollDeep;
            }


            scrollTop += scrollDeep;

            scrollTop <= 0 ? scrollTop = 0 : scrollTop;


            scrollLoop(scrollTop, parallaxItems);
        });
    }


    const oldWidth = window.innerWidth;

    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;

        newWidth != oldWidth ? location.reload() : null;
    });
});