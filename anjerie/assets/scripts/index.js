const checkTargetOrKeyNav = event => {
    console.log(event.target);
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
});