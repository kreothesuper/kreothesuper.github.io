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

class LanguageManager {
    constructor() {
        this.defaultLang = 'en';
        this.userPreferredLanguage = this.getLanguageFromQuery();
    }

    async fetchLanguageData(lang) {
        const response = await fetch(`languages/${lang}.json`);
        return response.json();
    }

    updateContent(langData) {
        const textElementArray = document.querySelectorAll('[data-language]');
        if (textElementArray.length) {
            textElementArray.forEach(element => {
                const key = element.getAttribute('data-language');
                element.innerHTML = langData[key] || key;
            });
        }

        this.updateImages(langData);
        document.body.style.opacity = '1';

    }

    getLanguageFromQuery() {
        const params = new URLSearchParams(window.location.search);
        return params.get('lang');
    }

    setLanguageInUrl(lang) {
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.location.href = url;
    }

    updateImages() {
        const isRussian = this.userPreferredLanguage === 'ru';
        const suffix = isRussian ? '-ru' : '';


        const imgElementArray = document.querySelectorAll('img.language-img'),
            pictureElementArray = document.querySelectorAll('picture.language-img');

        if (imgElementArray.length) {
            imgElementArray.forEach(img => {
                const src = img.getAttribute('data-src') || img.src;
                img.src = src.replace(/(-ru)?(\.[^.]+)$/, `${suffix}$2`);
            });
        }

        if (pictureElementArray.length) {
            pictureElementArray.forEach(picture => {
                picture.querySelectorAll('source').forEach(source => {
                    const srcset = source.srcset.replace(/(-ru)?(\.[^.]+)$/, `${suffix}$2`);
                    source.srcset = srcset;
                });
                const img = picture.querySelector('img');
                const imgSrc = img.getAttribute('data-src') || img.src;
                img.src = imgSrc.replace(/(-ru)?(\.[^.]+)$/, `${suffix}$2`);
            });
        }
    }

    async init() {
        if (!this.userPreferredLanguage) {
            this.setLanguageInUrl(this.defaultLang);
            return;
        }

        const langData = await this.fetchLanguageData(this.userPreferredLanguage);
        this.updateContent(langData);
    }
}




const languageManager = new LanguageManager();
window.addEventListener('DOMContentLoaded', () => {
    languageManager.init();
});

const getCurrentLanguage = () => {
    const currentUrl = window.location.search;
    return new URLSearchParams(currentUrl).get('lang');
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
    const header = document.querySelector('.header');

    if (hero) {
        const heroSection = document.querySelectorAll('.hero-section');

        if (heroSection.length) {
            heroSection.forEach(element => {
                const heroSectionText = element.querySelectorAll('.hero-section-text');
                if (heroSectionText.length) {
                    heroSectionText.forEach((text, index) => {
                        text.style.transitionDelay = `${index * .2}s`
                    });
                }
            });
        }

        const heroSlider = new Swiper('.hero', {
            direction: "vertical",
            effect: 'fade',
            crossFade: true,
            speed: 500,
            touchReleaseOnEdges: true,
            preventInteractionOnTransition: false,
            hashNavigation: {
                watchState: true,
            },
            mousewheel: {
                invert: false,
                sensitivity: 1,
                releaseOnEdges: true,
                thresholdTime: 1500,
            },

            touchRatio: 0.5,
            resistanceRatio: 0,

            init: function () {
                hero.dataset.current = this.realIndex;
            },
        });

        const heroColumn = new Swiper('.hero-section-column', {
            direction: "vertical",
            slidesPerView: "auto",
            freeMode: true,
            nested: true,
            init: false,
            spaceBetween: 30,
            slidesOffsetAfter: 1,
            touchMoveStopPropagation: true,
            shortSwipes: false,
            mousewheel: {
                invert: false,
                sensitivity: 1,
                releaseOnEdges: true,
            },
            touchReleaseOnEdges: true,
            observer: true,
        });

        if (window.screen.width >= 1280) {
            heroSlider.on('slideChange', function () {
                hero.scrollIntoView({ behavior: 'smooth' });
                heroSlider.params.mousewheel.releaseOnEdges = false;
                heroSlider.params.touchReleaseOnEdges = false;
            });
            heroColumn[heroColumn.length - 1].on('reachEnd', function () {
                setTimeout(function () {
                    heroSlider.params.mousewheel.releaseOnEdges = true;
                    heroSlider.params.touchReleaseOnEdges = true;
                }, 500);
            });
        }

        heroColumn[1].on('init', function () {
            const heroHeader = this.el.querySelector('.hero__header');
            hero.style.setProperty('--offsetTop-second', `${heroHeader.getBoundingClientRect().height}px`);
        });
        heroColumn[0].on('init', function () {
            const heroHeader = this.el.querySelector('.hero__header');
            hero.style.setProperty('--heroHeaderHeight', `${heroHeader.getBoundingClientRect().height}px`);
            hero.style.setProperty('--offsetTop', `${heroHeader.getBoundingClientRect().height}px`);
        });

        heroColumn.forEach(slider => {
            slider.init();
        })

        heroSlider.on('slideChange', function () {
            hero.dataset.current = heroSlider.realIndex;
            heroSection.forEach((element, index) => {
                const heroSectionText = element.querySelectorAll('.hero-section-text');

                if (heroSectionText.length) {
                    if (index == heroSlider.realIndex) {
                        heroSectionText.forEach((text, index) => {
                            text.style.transitionDelay = `${index * .2 + 1}s`
                        });
                    } else {
                        heroSectionText.forEach((text, index) => {
                            text.style.transitionDelay = `${index * .2}s`
                        });
                    }
                }
            });
            if (heroSlider.realIndex > 0) {
                header.classList.remove('active')
            } else {
                header.classList.add('active');
            }
        });

        heroSlider.on('hashChange', function () {
            if (windowHash.length && !windowHash.includes('hero')) {
                heroSlider.slideTo(heroSlider.slides.length - 1);
            }
        });


        heroSlider.on('hashSet', function () {
            hero.dataset.current = heroSlider.realIndex;
            heroSection.forEach((element, index) => {
                const heroSectionText = element.querySelectorAll('.hero-section-text');

                if (heroSectionText.length) {
                    if (index == heroSlider.realIndex) {
                        heroSectionText.forEach((text, index) => {
                            text.style.transitionDelay = `${index * .2 + 1}s`
                        });
                    } else {
                        heroSectionText.forEach((text, index) => {
                            text.style.transitionDelay = `${index * .2}s`
                        });
                    }
                }
            });
            if (heroSlider.realIndex > 0) {
                header.classList.remove('active')
            } else {
                header.classList.add('active');
            }
        });

        const windowHash = window.location.hash;

        if (windowHash.length && !windowHash.includes('hero')) {
            heroSlider.slideTo(heroSlider.slides.length - 1);
        }


        if (windowHash.length && windowHash.includes('hero')) {
            hero.dataset.current = heroSlider.realIndex;
            heroSection.forEach((element, index) => {
                const heroSectionText = element.querySelectorAll('.hero-section-text');

                if (heroSectionText.length) {
                    if (index == heroSlider.realIndex) {
                        heroSectionText.forEach((text, index) => {
                            text.style.transitionDelay = `${index * .2 + 1}s`
                        });
                    } else {
                        heroSectionText.forEach((text, index) => {
                            text.style.transitionDelay = `${index * .2}s`
                        });
                    }
                }
            });
            if (heroSlider.realIndex > 0) {
                header.classList.remove('active')
            } else {
                header.classList.add('active');
            }
        }
    }

    const navLinkArray = document.querySelectorAll('.nav__link');

    if (navLinkArray.length) {
        navLinkArray.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('burger--active');
                header.classList.remove('header--active');
                scrollLock.enablePageScroll();

                if (!link.hash.includes('hero')) header.classList.remove('active');
            })
        });
    }

    const windowHash = window.location.hash;

    if (windowHash.length && !windowHash.includes('hero')) {
        header.classList.remove('active');
    }


    const burger = document.querySelector('.burger');

    burger.addEventListener('click', (e) => {
        e.preventDefault();

        burger.classList.toggle('burger--active');
        header.classList.toggle('header--active');

        if (header.classList.contains('header--active')) {
            scrollLock.disablePageScroll();
        } else {
            scrollLock.enablePageScroll();
        }
    });

    const languageList = document.querySelectorAll('.language');

    if (languageList.length) {
        languageList.forEach(language => {
            const languageCurrent = language.querySelector('.language__current'),
                languageCurrentText = languageCurrent.querySelector('.language__text'),
                languageInput = language.querySelectorAll('input');

            languageInput.forEach(element => {
                if (element.value == getCurrentLanguage()) {
                    element.checked = true;
                }
            });

            const languageChecked = language.querySelector(':checked');

            languageCurrent.addEventListener('click', () => {
                language.classList.toggle('language--active');
            });

            language.addEventListener('change', (e) => {
                languageCurrentText.textContent = e.target.closest('.language-input').querySelector('.language-input__text').textContent;
                language.classList.remove('language--active');

                const urlParams = new URLSearchParams(window.location.search);
                urlParams.set('lang', e.target.value);
                window.location.search = urlParams;
            });

            languageCurrentText.textContent = languageChecked.closest('.language-input').querySelector('.language-input__text').textContent;
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language')) {
                // language.classList.remove('lanuguage--active');
                languageList.forEach(language => {
                    language.classList.remove('language--active');
                });
            }
        });
    }

    const headerButton = document.querySelector('.header__button'),
        headerQr = document.querySelector('.header__qr'),
        languageQr = document.querySelector('.qr-language');

    headerButton.addEventListener('click', (e) => {
        e.preventDefault();

        headerQr.classList.toggle('active');
        headerButton.classList.toggle('active');
        languageQr.classList.toggle('white');

        if (headerQr.classList.contains('active')) {
            scrollLock.disablePageScroll();
        } else {
            scrollLock.enablePageScroll();
        }
    });
});
