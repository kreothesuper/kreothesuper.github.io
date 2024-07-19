class Animations {
    constructor() {
        this.animationWrapperArray = document.querySelectorAll('.animation-wrapper');
    }

    toggleAnimation(animationWrapperElement) {
        const animationItemArray = animationWrapperElement.querySelectorAll('.animation-item');
        animationItemArray.forEach((animationItemElement, animationItemIndex) => {
            animationItemElement.style.animationDelay = `${animationItemIndex * 0.2}s`;
            animationItemElement.classList.add('animation-item--animated');
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


document.addEventListener('DOMContentLoaded', () => {
    //animation init
    const animation = new Animations();
    animation.init();

    const videoArray = document.querySelectorAll('.video');

    if (videoArray.length) {
        videoArray.forEach(video => {
            const videoElement = document.querySelector('video');

            video.addEventListener('click', function (e) {
                if (!e.target.classList.contains('video__resize')) {
                    if (videoElement.paused) {
                        videoElement.play();
                        video.classList.add('play');
                    } else {
                        videoElement.pause();
                        video.classList.remove('play');
                        video.classList.remove('full');
                    }
                } else {
                    video.classList.toggle('full');
                }

            });
        })
    }

    const hero = document.querySelector('.hero');
    const heroWrapper = document.querySelector('.hero-wrapper');
    const header = document.querySelector('.header');

    var swiper = new Swiper('.hero', {
        spaceBetween: 30,
        effect: 'fade',
        speed: 1500,
        mousewheel: {
            invert: false,
            // forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
            thresholdTime: 500,
        },

        init: function () {
            hero.dataset.current = this.realIndex;
        },

        autoHeight: true,
    });

    swiper.on('init', function () {
    });

    swiper.on('slideChange', function () {
        hero.dataset.current = swiper.realIndex;
        swiper.update();
        hero.scrollIntoView();
        if (swiper.realIndex > 0) {
            header.classList.remove('active')
        } else {
            header.classList.add('active');
        }
    });

    const heroSection = document.querySelectorAll('.hero-section');

    heroSection.forEach(element => {
        const heroSectionText = element.querySelectorAll('.hero-section-text');

        if (heroSectionText.length) {
            heroSectionText.forEach((text, index) => {
                text.style.transitionDelay = `${index * .2}s`
            });
        }
    });


    const burger = document.querySelector('.burger');


    burger.addEventListener('click', (e) => {
        e.preventDefault();

        burger.classList.toggle('burger--active');
        header.classList.toggle('header--active');
    });

    const language = document.querySelector('.language');

    if (language) {
        const languageCurrent = language.querySelector('.language__current');

        languageCurrent.addEventListener('click', () => {
            language.classList.toggle('language--active');
        });
    }
});