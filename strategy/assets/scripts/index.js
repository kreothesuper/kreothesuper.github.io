class Animations {
    constructor() {
        this.animationWrapperArray = document.querySelectorAll('.animation-wrapper');
    }

    toggleAnimation(animationWrapperElement) {
        const animationItemArray = animationWrapperElement.querySelectorAll('.animation-item');
        animationItemArray.forEach((animationItemElement, animationItemIndex) => {
            // animationItemElement.style.animationDelay = `${animationItemIndex * 0.2}s`;
            animationItemElement.style.setProperty('--animation-delay', `${animationItemIndex * 0.2}s`);
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

        const observer = new IntersectionObserver(this.handleIntersection.bind(this),{
            // rootMargin:''

        });
        this.animationWrapperArray.forEach(animationWrapper => {
            observer.observe(animationWrapper);
        });
    }
}


document.addEventListener('DOMContentLoaded',()=>{
    //animation init
    const animation = new Animations();
    animation.init();

    const burger = document.querySelector('.burger'),
        menu = document.querySelector('.menu');

    if(burger && menu){
        burger.addEventListener('click',(e)=>{
            e.preventDefault();

            burger.classList.toggle('burger--active');
            menu.classList.toggle('menu--active');
            document.body.classList.toggle('no-scroll');
        });

        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        if(anchorLinks.length){
            anchorLinks.forEach(link => {
                if(link.hash.length > 0){
                    link.addEventListener('click',()=>{
                        burger.classList.remove('burger--active');
                        menu.classList.remove('menu--active');
                        document.body.classList.remove('no-scroll');
                    })
                }
            });
        }
    }




    const teamSliderElement = document.querySelector('.team-slider-element');

    if(teamSliderElement){
        const teamSlider = new Swiper('.team-slider-element', {
            slidesPerView:'auto',
            spaceBetween:10,
            grid: {
                fill:'column',
                rows:1,
                slidesOffsetAfter:50,
            },
            breakpoints:{
                1239:{
                    slidesPerView:4,
                    grid: {
                        fill:'row',
                        rows: 2,
                    },
                },
                767:{
                    slidesPerView:2,
                    grid: {
                        fill:'row',
                        rows: 4,
                    },
                }
            }
        });
    }

});