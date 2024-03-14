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

        const observer = new IntersectionObserver(this.handleIntersection.bind(this),{
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

    //form init
    const form = new Form();
    form.init();

    //roadmap button
    const roadmapButton = document.querySelector('.roadmap-button');
    const roadmap = document.querySelector('.roadmap');

    if (roadmap && roadmapButton) {
        const roadmapHeight = roadmap.getBoundingClientRect().height;
        roadmap.style.setProperty('--height', '600px');

        roadmapButton.addEventListener('click', (e) => {
            e.preventDefault();

            roadmap.classList.add('roadmap--active');
            roadmap.style.setProperty('--height', `${roadmapHeight}px`);
            roadmapButton.remove();
        });
    }

    //fixed form
    const fixedForm = document.querySelector('.fixed-form'),
        formArray = [...document.querySelectorAll('.form')].filter(form => !form.closest('.fixed-form'));

    if (fixedForm) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const entryHeight = entry.boundingClientRect.height;
                const scrollTop = document.documentElement.scrollTop;
                (!entry.isIntersecting) && (scrollTop > entryHeight) ? fixedForm.classList.add('fixed-form--active') : fixedForm.classList.remove('fixed-form--active');
            });
        });

        formArray.forEach(formElement => {
            const formElementSection = formElement.closest('section');

            !formElementSection ? observer.observe(formElement) : observer.observe(formElementSection);
        });
    }

    //range slider
    const rangeSliderArray = document.querySelectorAll("[type='range']");

    if (rangeSliderArray.length) {
        const rangeSliderChange = (element) => {
            const tempSliderValue = Number(element.value);
            const progress = (tempSliderValue / element.max) * 100;
            element.style.background = `linear-gradient(to right, #1A1A1A ${progress}%, #E6E6E6 ${progress}%)`;

            const rangeWrapper = element.closest('.range-wrapper');
            if (!rangeWrapper) return
            const rangeValue = rangeWrapper.querySelector('.range-value');
            if (!rangeWrapper) return;
            rangeValue.textContent = element.value;

            const rangeValueLink = rangeWrapper.querySelector('.range-value-link');
            if (!rangeValueLink) return;
            // TODO: check calc
            rangeValueLink.textContent = (+element.value * .5).toFixed()
        }
        rangeSliderArray.forEach(element => {
            rangeSliderChange(element)
            element.addEventListener("input", (e) => rangeSliderChange(element))
        });
    }
});
