class Animations {
    constructor() {
        this.animationWrapperArray = document.querySelectorAll('.animation-wrapper');
    }

    toggleAnimation(animationWrapperElement) {
        const animationItemArray = animationWrapperElement.querySelectorAll('.animation-item');

        // if preloader present need to set value (preloader animation end + 0.5) if(preloader transition .5s) 1
        const counter = 0;

        animationItemArray.forEach((animationItemElement, animationItemIndex) => {
            animationItemElement.style.setProperty('--animation-delay', `${animationItemIndex * 0.2 + counter}s`);
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

const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup__wrapper') ||
        event.key === 'Escape' ||
        event.target.closest('.popup__close')
    ) {
        hideAllPopups();
    }
};
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

document.addEventListener('DOMContentLoaded',()=>{
    const animation = new Animations();
    animation.init();

    const popupButtons = document.querySelectorAll('[data-popup]');
    const popups = document.querySelectorAll('.popup');

    if (popups.length) {
        popupButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const popupId = button.dataset.popup
                showPopup(popupId);
            });
        });
    }

    const burger = document.querySelector('.burger'),
        headerNav = document.querySelector('.header__nav');

    burger.addEventListener('click',(e)=>{
        e.preventDefault();

        burger.classList.toggle('burger--active');
        headerNav.classList.toggle('header__nav--active');
        document.body.classList.toggle('no-scroll');
    });

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    if (anchorLinks.length) {
        anchorLinks.forEach(link => {
            if (link.hash.length > 0) {
                link.addEventListener('click', (e) => {
                    burger.classList.remove('burger--active');
                    headerNav.classList.remove('header__nav--active');
                    document.body.classList.remove('no-scroll');
                })
            }
        });
    }

    const stickyElm = document.querySelector('.header')

    const observer = new IntersectionObserver(
        ([e]) => e.target.classList.toggle('header--sticky', e.intersectionRatio < 1),
        {threshold: [1]}
    );

    observer.observe(stickyElm)

    function type(text, outputElement) {
        let index = 0; // Initialize index here
        const duration = 4000; // Total duration for the typing effect in milliseconds
        const delay = duration / text.length; // Calculate delay per character

        function typeCharacter() {

            if (index < text.length) {
                outputElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeCharacter, delay); // Pass the function itself as a callback
            }
        }

        typeCharacter(); // Start typing
    }

    const personsInfoArray = document.querySelectorAll('.persons-info');
    if (personsInfoArray.length) {
        personsInfoArray.forEach(personsInfo => {
            const personsInfoButton = personsInfo.querySelector('.persons-info__button'),
                personsInfoValue = personsInfo.querySelector('.persons-info__value').value.trim(),
                personsInfoText = personsInfo.querySelector('.persons-info-text');

            let typingInProgress = false;

            personsInfoButton.addEventListener('click', e => {
                e.preventDefault();
                if (typingInProgress) return;

                typingInProgress = true;
                personsInfoButton.classList.toggle('active');
                personsInfo.classList.toggle('active');
                personsInfoText.innerHTML = '';
                type(personsInfoValue, personsInfoText);

                setTimeout(() => {
                    typingInProgress = false;
                }, 4000);
            });
        });
    }
});