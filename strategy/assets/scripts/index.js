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

        const observer = new IntersectionObserver(this.handleIntersection.bind(this), {
            // rootMargin:''
        });
        this.animationWrapperArray.forEach(animationWrapper => {
            observer.observe(animationWrapper);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    //animation init
    const animation = new Animations();
    animation.init();

    const burger = document.querySelector('.burger'),
        menu = document.querySelector('.menu');

    if (burger && menu) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();

            burger.classList.toggle('burger--active');
            menu.classList.toggle('menu--active');
            document.body.classList.toggle('no-scroll');
        });

        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        if (anchorLinks.length) {
            anchorLinks.forEach(link => {
                if (link.hash.length > 0) {
                    link.addEventListener('click', () => {
                        burger.classList.remove('burger--active');
                        menu.classList.remove('menu--active');
                        document.body.classList.remove('no-scroll');
                    })
                }
            });
        }
    }


    const principlesCardList = document.querySelectorAll('.principles-card'),
        principlesCardGrid = document.querySelector('.principles-grid');

    if (principlesCardList.length) {
        principlesCardList[principlesCardList.length - 1].classList.add('principles-card--big');
        principlesCardList[principlesCardList.length - 2].classList.add('principles-card--middle');

        const targetElements = document.querySelectorAll('.principles');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    principlesCardList.forEach((card,cardIndex)=>{
                        setTimeout(()=>{
                            card.classList.remove('principles-card--animated');
                        }, cardIndex * 1000)
                    })
                }
            });
        }, {
            threshold: 0.1
        });

        targetElements.forEach(element => {
            observer.observe(element);
        });

        principlesCardList.forEach((card, cardIndex) => {
            card.classList.add('principles-card--animated')

            card.addEventListener('click', (e) => {
                e.preventDefault();

                if (card.classList.contains('principles-card--big')) return;

                principlesCardList.forEach(otherCard => {
                    otherCard.classList.remove('principles-card--active');
                    otherCard.classList.remove('principles-card--middle');
                    if (otherCard.classList.contains('principles-card--big')) otherCard.classList.add('principles-card--middle');

                    otherCard.classList.remove('principles-card--big');
                });

                card.classList.add('principles-card--big');
            });
        });
    }


    const teamSliderElement = document.querySelector('.team-slider-element');

    if (teamSliderElement) {
        const teamSlider = new Swiper('.team-slider-element', {
            slidesPerView: 'auto',
            spaceBetween: 10,
        });
    }

});