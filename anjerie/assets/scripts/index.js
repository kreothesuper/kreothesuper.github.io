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

const formatExpiry = (event) => {
    var inputChar = String.fromCharCode(event.keyCode);
    var code = event.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }
  
    event.target.value = event.target.value.replace(
      /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(
      /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(
      /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
      /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
      /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(
      /\/\//g, '/' // Prevent entering more than 1 `/`
    );
  }
  

const checkTargetOrKeyNav = event => {

    if (
        event.target.classList.contains('nav__sublist') || event.target.classList.contains('page-wrapper') ||
        event.key === 'Escape'
    ) {
        hideAllNavItems();
    }
};
const showNavItem = navItem => {
    const header = document.querySelector('.header'),
    pageWrapper = document.querySelector('.page-wrapper');

    if (navItem.classList.contains('nav__item--active')) return;

    hideAllNavItems();

    document.addEventListener('click', checkTargetOrKeyNav);
    document.addEventListener('keyup', checkTargetOrKeyNav);

    header.classList.add('header--open');
    navItem.classList.add('nav__item--active');
    pageWrapper.classList.add('page-wrapper--hidden')
};

const hideAllNavItems = () => {
    const header = document.querySelector('.header'),
        navItemArray = document.querySelectorAll('.nav__item'),
        pageWrapper = document.querySelector('.page-wrapper');


        header.classList.remove('header--open');
        pageWrapper.classList.remove('page-wrapper--hidden')

    navItemArray.forEach(element => {
        element.classList.remove('nav__item--active')
    });

    document.removeEventListener('click', checkTargetOrKeyNav);
    document.removeEventListener('keyup', checkTargetOrKeyNav);
};

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const header = document.querySelector('.header');

    if (header && burger) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();

            header.classList.toggle('header--open');
            burger.classList.toggle('burger--active');
        });
    }

    const __sliderPaginationParams = {
        el: '.slider-pagination',
        hiddenClass: 'slider-pagination--hidden',
        bulletClass: 'slider-pagination__bullet',
        bulletActiveClass: 'slider-pagination__bullet--active',
        lockClass: 'slider-pagination--lock'
    }


    const gallerySlider = new Swiper('.js-gallery-slider', {
        slidesPerView: 'auto',
        spaceBetween: 22,
        loop: true,
        speed: 500,
    });

    const productSlider = new Swiper('.js-product-slider', {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 500,
        pagination: __sliderPaginationParams,
        grid: {
            rows: 1,
            fill: 'row',
        },
        breakpoints: {
            992: {
                slidesPerView: 2,

                grid: {
                    rows: 2,
                }
            }
        }
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
            if (entry.isIntersecting) {
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


    const productFilter = document.querySelector('.product-filter');

    if (productFilter) {
        const productFilterLink = productFilter.querySelector('.product-filter__button');

        productFilterLink.addEventListener('click', (e) => {
            e.preventDefault();

            productFilter.classList.toggle('product-filter--active');
        });
    }

    const formArray = document.querySelectorAll('.form');

    if(formArray.length){
        formArray.forEach(form=>{
            const inputArray = form.querySelectorAll('.input');
            
            if(inputArray.length){
                inputArray.forEach(input=>{
                    input.addEventListener('input',()=>{
                        const inputItem = input.querySelector('input');
                        if(inputItem.value.trim().length > 0){
                            input.classList.add('input--filled')
                        }else{
                            input.classList.remove('input--filled')
                        }
                        if(inputItem.checkValidity()){
                            input.classList.remove('input--error')
                        
                        }else{
                            input.classList.add('input--error')
                        }
                    })
                });
            }
        });
    }

    const jsCart = document.querySelector('.js-cart-popup');

    if(jsCart){
        const jsCartLinkArray = document.querySelectorAll('.js-cart-link');

        if(jsCartLinkArray.length){
            jsCart.addEventListener('click',(e)=>{
                if(e.target.classList.contains('cart-popup')){
                    jsCart.classList.remove('cart-popup--active');
                }
            });
            jsCartLinkArray.forEach(link=>{
                link.addEventListener('click',(e)=>{
                    e.preventDefault();

                    jsCart.classList.toggle('cart-popup--active');
                });
            });
        }
    }

    const expiryInputArray = document.querySelectorAll('.js-expiry');

    if(expiryInputArray.length){
        expiryInputArray.forEach(input=>{
            input.addEventListener('input',(e)=>{
                formatExpiry(e)
            });
        });
    }
});