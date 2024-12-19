class Animations {
    constructor() {
        this.animationWrapperArray = document.querySelectorAll('.animation-wrapper');
    }

    toggleAnimation(animationWrapperElement) {
        const animationItemArray = animationWrapperElement.querySelectorAll('.animation-item');

        // if preloader present need to set value (preloader animation end + 0.5) if(preloader transition .5s) 1
        const counter = animationWrapperElement.closest('.hero') && document.querySelector('.preloader') ? 1.5 : 0;

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

document.addEventListener('DOMContentLoaded',()=>{
    const animation = new Animations();
    animation.init();

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
});