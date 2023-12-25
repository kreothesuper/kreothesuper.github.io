const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup__wrapper') ||
        event.key === 'Escape' ||
        event.target.closest('.popup-close')
    ) {
        hideAllPopups();
    }
};
const showPopup = popupId => {
    const popup = document.querySelector(popupId);
    if (!popup) return

    const pageWrapper = document.querySelector('.page-wrapper');

    hideAllPopups();

    popup.classList.add('popup--active');
    pageWrapper.classList.add('no-scroll');

    document.addEventListener('click', checkTargetOrKey);
    document.addEventListener('keyup', checkTargetOrKey);
};
const hideAllPopups = () => {
    const popups = document.querySelectorAll('.popup'),
        pageWrapper = document.querySelector('.page-wrapper');

    popups.forEach(popup => {
        popup.classList.remove('popup--active');
    });
    pageWrapper.classList.remove('no-scroll');

    document.removeEventListener('click', checkTargetOrKey);
    document.removeEventListener('keyup', checkTargetOrKey);
};

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

        const observer = new IntersectionObserver(this.handleIntersection.bind(this));
        this.animationWrapperArray.forEach(animationWrapper => {
            observer.observe(animationWrapper);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    //animation init
    const animation = new Animations();
    animation.init();

    // buger init
    const burger = document.querySelector('.burger'),
        header = document.querySelector('.header');

    burger.addEventListener('click', (e) => {
        e.preventDefault();

        burger.classList.toggle('burger--active');
        header.classList.toggle('header--active');
    });


    // popup init
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


    // check and send form
    const formArray = document.querySelectorAll('.form');

    if (formArray.length) {
        formArray.forEach(form => {
            const formInputArray = form.querySelectorAll('input');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // TODO: write sender script
                showPopup('.popup-thanks');
            });
        });
    }

    // menu animation and navigation
    const menu = document.querySelector('.menu');
    const menuLink = document.querySelectorAll('.menu__link');
    const linkObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                menuLink.forEach((link, linkIndex) => {
                    if (link.hash === `#${id}`) {
                        const height = (link.getBoundingClientRect().height * linkIndex) + (17 * linkIndex);
                        link.classList.add('menu__link--active');
                        menu.style.setProperty('--size', `${height}px`);
                    } else {
                        link.classList.remove('menu__link--active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-1% 0% -99% 0%',
        threshold: 0,
    });
    if (menuLink.length) {
        menuLink.forEach(link => {
            const linkBlock = document.querySelector(`${link.hash}`)
            if (linkBlock) {
                linkObserver.observe(linkBlock);
            }
        });
    }


    // steps video animation
    const stepWrapper = document.querySelector('.steps');
    const videoElement = document.querySelector('.js-step-video'),
        fullStepHeight = stepWrapper.getBoundingClientRect().height - stepWrapper.querySelector('.steps-item:last-child').getBoundingClientRect().height,
        stepsCountArray = document.querySelectorAll('.steps-item__count');

    stepWrapper.style.setProperty('--full-size', `${fullStepHeight}px`);
    const stepVideoFunction = () => {
        const scrollFromTop = stepWrapper.getBoundingClientRect().top;
        const windowHeight = window.innerHeight / 2;
        const progresSize = -scrollFromTop + windowHeight;

        stepsCountArray.forEach(step => {
            step.classList.toggle('steps-item__count--active', (progresSize > step.offsetTop));;
        });

        stepWrapper.style.setProperty("--size", `${progresSize}px`);


        if(progresSize < fullStepHeight && progresSize > -100 ){
            stepWrapper.style.setProperty("--video-size",`${progresSize}px`);
            const videoSize = (-scrollFromTop + videoElement.getBoundingClientRect().height) / fullStepHeight;
            const percent = videoSize * 100;
            videoElement.currentTime = percent * (videoElement.duration / 100);
        }
    }

    const stepsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.addEventListener('scroll', stepVideoFunction, false);
            } else {
                document.removeEventListener('scroll', stepVideoFunction, false);
            }
        });
    });
    if (stepWrapper) {
        stepsObserver.observe(stepWrapper);
    }






    // document.addEventListener('scroll', function () {
    //     const posTop = elem.getBoundingClientRect().top;
    //     const windowHeight = window.innerHeight / 2;
    //     const size = -posTop + windowHeight;

    //     stepsCountArray.forEach(step => {
    //         if (size > step.offsetTop) {
    //             step.querySelector('.steps-item__count').classList.add('steps-item__count--active');
    //         } else {
    //             step.querySelector('.steps-item__count').classList.remove('steps-item__count--active');
    //         }
    //     });


    //     elem.style.setProperty("--size", `${size}px`);
    //     const percent = (-posTop) / windowHeight * 100;
    //     videoStep.currentTime = percent * (videoStep.duration / 100);
    // });
});