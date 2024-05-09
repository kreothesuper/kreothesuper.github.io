
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

document.addEventListener('DOMContentLoaded', () => {
    const animation = new Animations();
    animation.init();


    const fileInputArray = document.querySelectorAll('.file-input');

    if (fileInputArray.length) {
        fileInputArray.forEach(input => {
            const inputText = input.querySelector('.file-input__checkmark');
            if (!inputText) return
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                inputText.textContent = file.name;
            });
        })
    }

    const blockArray = document.querySelectorAll('.js-block');

    if (blockArray.length) {
        blockArray.forEach(block => {
            const blockLink = block.querySelector('.js-block-toggle');
            const blockContent = block.querySelector('.js-block-content');
            block.style.setProperty('--height', `${blockContent.getBoundingClientRect().height}px`)
            blockLink.addEventListener('click', (e) => {
                e.preventDefault();
                block.classList.toggle('active');
            });
        });
    }


    const nav = document.querySelector('.header__nav'),
        burger = document.querySelector('.burger');

    const header = document.querySelector('.header'),
        searchLinkArray = document.querySelectorAll('.js-header-link'),
        searchWrapper = document.querySelector('.js-search');

    if (nav && burger) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();

            if (header.classList.contains('header--nav')) {
                header.classList.remove('header--nav');
                header.classList.remove('header--overlay')
                burger.classList.remove('active');
            } else {
                header.classList.remove('header--search');
                header.classList.add('header--nav');
                header.classList.add('header--overlay');
                burger.classList.add('active');
            }
        });
    }

    if (header && searchLinkArray.length) {
        searchLinkArray.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                if (header.classList.contains('header--search')) {
                    header.classList.remove('header--search');
                    header.classList.remove('header--overlay');
                } else {
                    header.classList.add('header--search');
                    header.classList.add('header--overlay');
                    header.classList.remove('header--nav');
                }
            });
        })
    }


    const marquee = document.querySelectorAll('.marquee-left');

    if (marquee.length) {
        let marqueeLeft = new Swiper('.marquee-left', {
            spaceBetween: 30,
            centeredSlides: true,
            speed: 3000,
            autoplay: {
                delay: 1,
            },
            loop: true,
            slidesPerView: 'auto',
            allowTouchMove: false,
            disableOnInteraction: true,
            breakpoints: {
                600: {
                    spaceBetween: 15
                }
            }
        });
    }

    const teamSlider = document.querySelector('.team-slider');

    if (teamSlider) {
        let marqueeLeft = new Swiper('.team-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            autoplay: {

                delay: 5000,
            },
            pagination: {
                el: ".swiper-pagination",
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                }
            }
        });
    }


    const counters = document.querySelectorAll('.counter');
    const speed = 2000;

    if(counters.length){
        counters.forEach(counter => {
            counter.dataset.current = 0;
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.dataset.current;
    
                const inc = target / speed;
        
                if (count < target) {
                    const newValue = count + inc;
                    counter.dataset.current = +newValue;
                    counter.innerText = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(newValue.toFixed(0));
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(target);
                }
            };
    
            updateCount();
        });
    }

    const filterBlockList = document.querySelectorAll('.js-filter-block-list');

    if(filterBlockList.length){
        filterBlockList.forEach(list=>{
            const filterBlockLink = list.querySelector('.js-filter-block-link');

            filterBlockLink.addEventListener('click',(e)=>{
                e.preventDefault();

                list.classList.toggle('active');
            });
        });
    }
});