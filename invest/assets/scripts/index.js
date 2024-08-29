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


document.addEventListener('DOMContentLoaded', () => {
    const animation = new Animations();
    animation.init();
    
    const languageArray = document.querySelectorAll('.language');

    console.log('1243');
    if (languageArray.length) {
        console.log('1243');
        languageArray.forEach(language => {
            const currentLanguage = language.querySelector('.language__current');

            currentLanguage.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('1243');
                language.classList.toggle('language--active');
            });

            language.addEventListener('change', (e) => {
                language.classList.remove('language--active');

                currentLanguage.textContent = e.target.value;
            });
        });
    }


    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    const targets = document.querySelectorAll('.video-section');

    targets.forEach(target => {
        observer.observe(target);
    });


    const videoArray = document.querySelectorAll('.js-video');

    if (videoArray.length) {
        videoArray.forEach(video => {
            const videoElement = video.querySelector('video');

            if(!videoElement) return;
            video.addEventListener('click', () => {
                if (videoElement.paused) {
                    videoElement.play(); // Play the video
                    video.classList.add('playing'); // Add the class when playing
                } else {
                    videoElement.pause(); // Pause the video
                    video.classList.remove('playing'); // Remove the class when paused
                }
            });
        });
    }


    const projectCatalog = document.querySelector('.project-catalog');

    if(projectCatalog){
        const projectCatalogButton = document.querySelector('.project-catalog__button');

        if(projectCatalogButton){
            projectCatalogButton.addEventListener('click',(e)=>{
                e.preventDefault();

                projectCatalog.classList.toggle('expand');
            });
        }
    }


    const burger = document.querySelector('.burger');
    const headerNav = document.querySelector('.header__nav');

    if(burger && headerNav){
        burger.addEventListener('click',(e)=>{
            e.preventDefault();

            burger.classList.toggle('burger--active');
            headerNav.classList.toggle('header__nav--active');
        });
    }


    const navSublist = document.querySelectorAll('.nav__sublist');

    if(navSublist.length){
        navSublist.forEach(sublist=>{
            const navItem = sublist.closest('.nav__item'),
            navLink = navItem.querySelector('.nav__link');

            navLink.addEventListener('click',(e)=>{
                e.preventDefault();
                
                navItem.classList.toggle('expand')
            });
        });
    }


    const fileItemArray = document.querySelectorAll('.file-item');

    if(fileItemArray.length){
        fileItemArray.forEach(fileItem=>{
            fileItem.addEventListener('click',(e)=>{
                e.preventDefault();

                fileItem.classList.toggle('file-item--active');
            });
        });
    }

    const popupButtons = document.querySelectorAll('[data-popup]');
    const popups = document.querySelectorAll('.popup');

    if (popups.length && popupButtons.length) {
        popupButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const popupId = button.dataset.popup
                showPopup(popupId);
            });
        });
    }
});