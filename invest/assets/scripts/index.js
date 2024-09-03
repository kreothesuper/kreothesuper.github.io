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

    const languageArray = document.querySelectorAll('.language');

    console.log('1243');
    if (languageArray.length) {
        console.log('1243');
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


    const fileItemArray = document.querySelectorAll('.file-item');

    if (fileItemArray.length) {
        fileItemArray.forEach(fileItem => {
            fileItem.addEventListener('click', (e) => {
                e.preventDefault();

                fileItem.classList.toggle('file-item--active');
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


initCursor()

    // const featuresEl = document.querySelector(".features");
    // const featureEls = document.querySelectorAll(".feature");

    // featuresEl.addEventListener("pointermove", (ev) => {
    //     featureEls.forEach((featureEl) => {
    //         // Not optimized yet, I know
    //         const rect = featureEl.getBoundingClientRect();

    //         featureEl.style.setProperty("--x", ev.clientX - rect.left);
    //         featureEl.style.setProperty("--y", ev.clientY - rect.top);
    //     });
    // });




    let lastX = 0; // Store the last X position for smoother animation
    const movementFactor = 0.1; // Adjust this for more or less movement


    parallaxContainer.addEventListener('mousemove', function (e) {
        const { clientX } = e; // Get the mouse's X position
        const width = parallaxContainer.offsetWidth; // Get the width of the container
        const midX = width / 2; // Calculate the middle of the container

        // Calculate the movement based on mouse position
        const xPos = (clientX - midX) * movementFactor;

        // Smoothly interpolate the movement
        const smoothX = lastX + (xPos - lastX) * 0.1; // Adjust the factor for smoothness
        lastX = smoothX; // Update lastX for the next event

        parallaxContainer.style.setProperty('--parralax', `${smoothX / 5}px`)
        parallaxContainer.style.setProperty('--parralax-second', `${-smoothX / 5}px`)

        // // Apply the transformation to each layer
        // const layers = document.querySelectorAll('.parallax-layer');
        // layers.forEach((layer, index) => {
        //     const depth = index * 5; // Adjust depth for each layer
        //     layer.style.transform = `translateX(${smoothX / depth}px)`;
        // });
    });

    // parallaxContainer.addEventListener('mousemove', function (e) {
    //     const { clientX } = e; // Get the mouse's X position
    //     const width = parallaxContainer.offsetWidth; // Get the width of the container
    //     const midX = width / 2; // Calculate the middle of the container

    //     // Calculate the movement based on mouse position
    //     const movementFactor = 0.1; // Adjust this for more or less movement
    //     const xPos = (clientX - midX) * movementFactor;

    //     // Apply the transformation to each layer

    //     // const layers = document.querySelectorAll('.parallax-layer');
    //     // layers.forEach((layer, index) => {
    //     //     const depth = index * 10; // Adjust depth for each layer
    //     //     layer.style.transform = `translateX(${xPos / depth}px)`;
    //     // });
    // });
});