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

const initTabs = () => {
    const tabs = [...document.querySelectorAll(".tabs")];

    if (tabs.length > 0) {
        tabs.forEach((tab) => {
            const tabContent = [...tab.querySelectorAll(".tabs__content")];
            const tabLinks = [...tab.querySelectorAll(".tabs__link")];

            const openTab = (tabIndex = 0) => {
                tabContent.forEach((element, i) => {
                    const isActive = i === tabIndex;
                    element.classList.toggle("active", isActive);
                });

                tabLinks.forEach((element, i) => {
                    element.classList.toggle("active", i === tabIndex);
                });
            }

            openTab(0)

            tabLinks.forEach((link, i) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    openTab(i);
                });
            });
        });
    }
}


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

const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup__wrapper') ||
        event.key === 'Escape' ||
        event.target.closest('.popup__close')
    ) {
        event.preventDefault();
        hideAllPopups();
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const animation = new Animations();
    animation.init();

    initTabs();

    const languageArray = document.querySelectorAll('.language');

    if (languageArray.length) {
        languageArray.forEach(language => {
            const currentLanguage = language.querySelector('.language__current');

            currentLanguage.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('1243');
                language.classList.toggle('language--active');
            });

            language.addEventListener('change', (e) => {
                language.classList.remove('language--active');

                currentLanguage.textContent = e.target.value;
            });
        });
    }


    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    const targets = document.querySelectorAll('.video-section');

    targets.forEach(target => {
        observer.observe(target);
    });


    const videoArray = document.querySelectorAll('.js-video');

    if (videoArray.length) {
        videoArray.forEach(video => {
            const videoElement = video.querySelector('video');

            if (!videoElement) return;
            video.addEventListener('click', () => {
                if (videoElement.paused) {
                    videoElement.play(); // Play the video
                    video.classList.add('playing'); // Add the class when playing
                } else {
                    videoElement.pause(); // Pause the video
                    video.classList.remove('playing'); // Remove the class when paused
                }
            });
        });
    }


    const projectCatalog = document.querySelector('.project-catalog');

    if (projectCatalog) {
        const projectCatalogButton = document.querySelector('.project-catalog__button');

        if (projectCatalogButton) {
            projectCatalogButton.addEventListener('click', (e) => {
                e.preventDefault();

                projectCatalog.classList.toggle('expand');
            });
        }
    }


    const burger = document.querySelector('.burger');
    const headerNav = document.querySelector('.header__nav');

    if (burger && headerNav) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();

            burger.classList.toggle('burger--active');
            headerNav.classList.toggle('header__nav--active');
        });
    }


    const navSublist = document.querySelectorAll('.nav__sublist');

    if (navSublist.length) {
        navSublist.forEach(sublist => {
            const navItem = sublist.closest('.nav__item'),
                navLink = navItem.querySelector('.nav__link');

            navLink.addEventListener('click', (e) => {
                e.preventDefault();

                navItem.classList.toggle('expand')
            });
        });
    }


    const fileItemArray = document.querySelectorAll('.file-item__link');

    if (fileItemArray.length) {
        fileItemArray.forEach(fileItem => {
            fileItem.addEventListener('click', (e) => {
                e.preventDefault();

                const parent = fileItem.closest('.file-item');
                parent.classList.toggle('file-item--active');
            });
        });
    }

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


    const parallaxContainer = document.querySelector('.hero');
    const heroWrapper = document.querySelector('.hero-wrapper');

    const heroSlider = new Swiper('.hero-img', {
        effect: 'creative',
        grabCursor: true,
        speed: 1500,
        init: false,
        creativeEffect: {
            prev: {
                shadow: true,
                translate: ["-20%", 0, -1],
            },
            next: {
                translate: ["100%", 0, 0],
            },
        },
        navigation: {
            nextEl: '.hero-img-arrow-next',
            prevEl: '.hero-img-arrow-prev',
        },
    });

    heroSlider.on('slideChange', function () {
        const currentSlide = heroSlider.slides[heroSlider.activeIndex];

        heroWrapper.style.setProperty('--background', `${currentSlide.dataset.bg}`);
    });

    heroSlider.on('init', function () {
        const currentSlide = heroSlider.slides[heroSlider.activeIndex];

        heroWrapper.style.setProperty('--background', `${currentSlide.dataset.bg}`);
    });

    heroSlider.init();

    const heroSliderTitle = new Swiper('.hero-title', {
        effect: 'creative',
        grabCursor: true,
        speed: 1000,
        autoHeight: true,
        creativeEffect: {
            prev: {
                translate: [0, '100%', -1],
                opacity: 0,
            },
            next: {
                translate: [0, '-100%', 0],
            },
        },
        navigation: {
            nextEl: '.hero-img-arrow-next',
            prevEl: '.hero-img-arrow-prev',
        },
    });


    const partnershipSlider = new Swiper('.partnership-slider', {
        slidesPerView:1,
        spaceBetween:40,
        init:false,
        breakpoints:{
            992:{
                slidesPerView:3,
            }
        }
    });

    partnershipSlider.init();

    const boxSlider = new Swiper('.box-slider', {
        slidesPerView:'auto',
        spaceBetween:0,
        init:false,
        autoHeight:true,
        navigation: {
            nextEl: '.box-slider__button--next',
            prevEl: '.box-slider__button--prev',
        },
    });

    boxSlider.init();


    const dpkCursor = document.querySelector(".follower");
    // dpkCursor.classList.add("dpkCursor");
    // document.body.appendChild(dpkCursor);


    function initCursor(speedOption = 0.25) {

        let dpkCursorMouse = { x: -100, y: -100 };
        let dpkCursorPos = { x: 0, y: 0 };
        let speed = speedOption;

        //center the circle around cursor       

        window.addEventListener("mousemove", (e) => {
            dpkCursorMouse.x = e.x;
            dpkCursorMouse.y = e.y;
        });

        const updatePosition = () => {
            dpkCursorPos.x += (dpkCursorMouse.x - dpkCursorPos.x) * speed;
            dpkCursorPos.y += (dpkCursorMouse.y - dpkCursorPos.y) * speed;

            dpkCursor.style.transform = `translate3d(calc(${dpkCursorPos.x}px - 50%) ,calc(${dpkCursorPos.y}px - 50%),0)`;

        };

        function loop() {
            updatePosition();
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);

    }


    if (dpkCursor) {
        initCursor()
    }



    let lastX = 0; // Store the last X position for smoother animation
    const movementFactor = 0.1; // Adjust this for more or less movement
    const inactivityTimeoutDuration = 2000; // Duration to wait before adding the 'not-moved' class
    let inactivityTimeout; // Store the timeout ID
    
    if (parallaxContainer) {
        parallaxContainer.classList.add('not-moved'); // Initially add the 'not-moved' class
    
        parallaxContainer.addEventListener('mousemove', function (e) {
            const { clientX } = e; // Get the mouse's X position
            const width = parallaxContainer.offsetWidth; // Get the width of the container
            const midX = width / 2; // Calculate the middle of the container
            // Calculate the movement based on mouse position
            const xPos = (clientX - midX) * movementFactor;
            // Smoothly interpolate the movement
            const smoothX = lastX + (xPos - lastX) * 0.1; // Adjust the factor for smoothness
            lastX = smoothX; // Update lastX for the next event
            parallaxContainer.style.setProperty('--parallax', `${smoothX / 5}px`);
            parallaxContainer.style.setProperty('--parallax-second', `${-smoothX / 5}px`);
    
            // Remove the 'not-moved' class when the mouse moves
            parallaxContainer.classList.remove('not-moved');
    
            // Clear the previous timeout if the mouse is moving
            clearTimeout(inactivityTimeout);
    
            // Set a timeout to add the 'not-moved' class after inactivity
            inactivityTimeout = setTimeout(() => {
                parallaxContainer.classList.add('not-moved');
            }, inactivityTimeoutDuration);
        });
    }



    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


    gsap.to(".industries__img", {
        ease: "none",
        xPercent: 100,
        scrollTrigger: {
            scrub: true,
            trigger: ".industries",
            start: "top bottom",
            end: "bottom top",
        },
    });

    gsap.from(".video-section__item", {
        ease: "none",
        scale: 0,
        borderRadius: '500px',
        scrollTrigger: {
            scrub: true,
            trigger: ".video-section",
            start: "top bottom",
            end: "-30% top",
        },
    });


    function handleMarquee() {
        const marquee = document.querySelectorAll('.marquee');
        let lastScrollPos = 0;
        let timer;
    
        marquee.forEach(function (el) {
            const container = el.querySelector('.inner');
            const content = el.querySelector('.inner > *');
            // Get total width
            const speed = +el.dataset.speed || 4;
            const elWidth = content.offsetWidth;
            
            // Duplicate content
            let clone = content.cloneNode(true);
            container.appendChild(clone);
    
            let progress = 0; // Start from 0 for the initial position
            const direction = el.dataset.direction || 'left'; // Get the direction (default is 'left')
    
            function loop() {
                if (direction === 'left') {
                    progress = progress - speed;
                    if (progress <= elWidth * -1) {
                        progress = 0;
                    }
                } else if (direction === 'right') {
                    progress = progress + speed;
                    if (progress >= elWidth) {
                        progress = 0;
                    }
                }
    
                container.style.transform = 'translateX(' + progress + 'px)';
                container.style.transform += ' skewX(' + speed * 0.4 + 'deg)';
                window.requestAnimationFrame(loop);
            }
    
            loop();
        });
    }
    
    // handleMarquee();


    const marqueeList = document.querySelectorAll('.marquee');

    if(marqueeList.length){
        marqueeList.forEach(marque=>{
            new InfiniteMarquee({
                element: marque,
                speed: marque.dataset.speed || 25000,
                direction: marque.dataset.direction || 'left',
                gap: '20px',
                duplicateCount: 2,
            });
        });
    }


    const selectArray = document.querySelectorAll('.select');

    if(selectArray.length){
        document.addEventListener('click',(e)=>{
            if(!e.target.closest('.select')){
                selectArray.forEach(el=>el.classList.remove('active'));
            }
        });
        selectArray.forEach(select=>{
            const selectCurrent = select.querySelector('.select__current');

            selectCurrent.addEventListener('click',()=>{
                select.classList.toggle('active');
            });

            select.addEventListener('change',(e)=>{
                select.classList.remove('active');
                selectCurrent.querySelector('span').textContent = e.target.value;
            });
        });
    }
});