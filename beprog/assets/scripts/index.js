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

const languageObject = {
    en: [
        ['hero-title', ' '],
        ['hero-text', ' '],
        ['hero-block', 'No phone number and registration required.'],
        ['hero-title-second', 'In order to chat with someone, you need only a <span class="password-img"><img src="assets/images/password-img.svg" alt=""></span>password'],
        ['hero-list-first', 'All chats are protected by <span>«one-time pad»</span> <span>symmetric</span> encryption, i.e. each message is encrypted with a new never repeating key.'],
        ['hero-list-second', 'Use passwords to <span>make calls</span>, not your phone number.'],
        ['how-title', 'How it works in practice:'],
        ['about-title', 'BeProg is a truly anonymous communication app'],
        ['about-card-title-first', 'There is no need for <br> a phone number'],
        ['about-card-text-first', 'Instead of exchanging phone numbers - exchange passwords.'],
        ['about-card-title-second', ' '],
        ['about-card-text-second', 'Come up with a password, share it with the other person and create one private chat for both of you.'],
        ['about-card-title-third', 'Create a channel'],
        ['about-card-text-third', 'Publish protected messages'],
        ['about-card-title-fourth', 'For an unlimited audience'],
        ['about-card-text-fourth', 'BeProg app is ad-free and spam-free'],
        ['anonymity-text', 'We have strived to achieve maximum anonymity combined with ease of use.'],
        ['simplicity-text', 'The app has a minimal set of intuitive functions. Creating a chat is simple and done in two steps.'],
        ['capability-text', 'The app does not request permission from other user applications such as: Contacts, Location, Phone, etc.'],
        ['banner-text', 'The BeProg messaging app will give you that <br> peace of <img src="assets/images/icons/like-in-text.svg" alt=""> mind, that can only be provided by anonymity.'],
        ['nav-link-first', 'About the app'],
        ['nav-link-second', 'How it works        '],
        ['nav-link-third', 'Benefits'],
        ['nav-link-fourth', 'Description'],
    ],
    it: [
        ['hero-title', ' '],
        ['hero-text', ' '],
        ['hero-block', ' '],
        ['hero-title-second', ' '],
        ['hero-list-first', 'All chats are protected by <span>«one-time pad»</span> <span>symmetric</span> encryption, i.e. each message is encrypted with a new never repeating key.'],
        ['hero-list-second', ' '],
        ['how-title', ' '],
        ['about-title', ' '],
        ['about-card-title-first', ' '],
        ['about-card-text-first', ' '],
        ['about-card-title-second', ' '],
        ['about-card-text-second', ' '],
        ['about-card-title-third', ' '],
        ['about-card-text-third', ' '],
        ['about-card-title-fourth', ' '],
        ['about-card-text-fourth', ' '],
        ['banner-text', 'The BeProg messaging app will give you that peace of mind, that can only be provided by anonymity.'],
    ],
    fr: [
        ['hero-title', ' '],
        ['hero-text', ' '],
        ['hero-block', ' '],
        ['hero-title-second', ' '],
        ['hero-list-first', 'All chats are protected by <span>«one-time pad»</span> <span>symmetric</span> encryption, i.e. each message is encrypted with a new never repeating key.'],
        ['hero-list-second', ' '],
        ['how-title', ' '],
        ['about-title', ' '],
        ['about-card-title-first', ' '],
        ['about-card-text-first', ' '],
        ['about-card-title-second', ' '],
        ['about-card-text-second', ' '],
        ['about-card-title-third', ' '],
        ['about-card-text-third', ' '],
        ['about-card-title-fourth', ' '],
        ['about-card-text-fourth', ' '],
        ['banner-text', 'The BeProg messaging app will give you that peace of mind, that can only be provided by anonymity.'],
    ],
}


const getCurrentLanguage = () => {
    const currentUrl = window.location.search;
    return new URLSearchParams(currentUrl).get('lang');
}

const changeLanguage = (langArray) => {
    if(!langArray) return;
    langArray.forEach(lang=>{
        const element = document.querySelector(`.${lang[0]}`);

        if(element) element.innerHTML = lang[1];
    });
}


document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(languageObject[getCurrentLanguage()]);
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

    // var swiper = new Swiper('.hero', {
    //     spaceBetween: 30,
    //     effect: 'fade',
    //     speed: 1500,
    //     mousewheel: {
    //         invert: false,
    //         // forceToAxis: true,
    //         sensitivity: 1,
    //         releaseOnEdges: true,
    //         thresholdTime: 500,
    //     },

    //     init: function () {
    //         hero.dataset.current = this.realIndex;
    //     },

    // });

    // swiper.on('init', function () {
    // });

    // swiper.on('slideChange', function () {
    //     hero.dataset.current = swiper.realIndex;
    //     swiper.update();
    //     hero.scrollIntoView();
    //     if (swiper.realIndex > 0) {
    //         header.classList.remove('active')
    //     } else {
    //         header.classList.add('active');
    //     }
    // });

    // scrollLock.disablePageScroll();

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

    const heroSectionArray = document.querySelectorAll('.hero-section');
    const testBlock = document.querySelector('.test');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroSectionArray.forEach(block => {
                    block.classList.remove('visible');
                });
                entry.target.classList.add('visible');
                const id = Array.from(heroSectionArray).indexOf(entry.target)

                heroSectionArray.forEach((el, index) => {
                    el.classList.remove('prev');
                    if (id === index) {
                        el.classList.add('visible')
                    } else {
                        el.classList.remove('visible')
                    }
                });

                // heroSectionArray[id - 1 || 0].classList.add('prev');
                testBlock.dataset.current = id;
                if (id > 0) {
                    header.classList.remove('active');
                } else {
                    header.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });

    heroSectionArray.forEach(block => {
        observer.observe(block);
    });



    // let scrollTimer;

    // scrollableElement.addEventListener('scroll', function() {
    //     clearTimeout(scrollTimer);
    //     scrollTimer = setTimeout(function() {
    //         // Your scroll action goes here
    //         console.log('Scrolled after delay');
    //     }, 3000); // Delay in milliseconds (e.g., 500ms)
    // });


    const languageList = document.querySelectorAll('.language');

    if (languageList.length) {
        languageList.forEach(language => {
            const languageCurrent = language.querySelector('.language__current'),
                languageCurrentText = languageCurrent.querySelector('.language__text'),
                languageInput = language.querySelectorAll('input');

                languageInput.forEach(element=>{
                    if(element.value == getCurrentLanguage()){
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
});