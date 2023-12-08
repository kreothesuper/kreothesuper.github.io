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

const checkTargetOrKeyNav = event => {

    if (
        event.target.classList.contains('nav__sublist') || 
        event.key === 'Escape'
    ) {
        hideAllNavItems();
    }
};
const showNavItem = navItem => {
    const header = document.querySelector('.header');

    if (navItem.classList.contains('nav__item--active')) return;

    hideAllNavItems();

    document.addEventListener('click', checkTargetOrKeyNav);
    document.addEventListener('keyup', checkTargetOrKeyNav);

    header.classList.add('header--open');
    navItem.classList.add('nav__item--active');
};

const hideAllNavItems = () => {
    const header = document.querySelector('.header'),
        navItemArray = document.querySelectorAll('.nav__item');

    header.classList.remove('header--open');

    navItemArray.forEach(element => {
        element.classList.remove('nav__item--active')
    });

    document.removeEventListener('click', checkTargetOrKeyNav);
    document.removeEventListener('keyup', checkTargetOrKeyNav);
};

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const header = document.querySelector('.header');

    burger.addEventListener('click', (e) => {
        e.preventDefault();

        header.classList.toggle('header--open');
        burger.classList.toggle('burger--active');
    });


    const gallerySlider = new Swiper('.js-gallery-slider', {
        slidesPerView: 'auto',
        spaceBetween: 22,
        loop: true,
        speed: 500,
    });


    const sublistArray = document.querySelectorAll('.nav__sublist');

    if (sublistArray.length) {
        sublistArray.forEach(sublist => {
            const navItem = sublist.closest('.nav__item'),
                navLink = navItem.querySelector('.nav__link');

            navLink.addEventListener('click', (e) => {
                e.preventDefault();

                showNavItem(navItem);
            });
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting ) {
            document.querySelector('header').classList.remove('header--white');
          } else {
            document.querySelector('header').classList.add('header--white');
          }
        });
      }, {
        rootMargin: '-1% 0% -99% 0%',
        threshold: 0,
      });
      const blocks = document.querySelectorAll('.js-black');
      for (let i = blocks.length - 1; i >= 0; i--) {
        const block = blocks[i];
        observer.observe(block);
      }

      const animation = new Animations();
      animation.init();
});