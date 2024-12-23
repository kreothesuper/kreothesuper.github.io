document.addEventListener('DOMContentLoaded',()=>{
    const lenis = typeof Lenis !== 'undefined' ? new Lenis({smoothWheel: true, duration: 1.2}) : null;

    if(lenis){
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }


    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    if (anchorLinks.length) {
        anchorLinks.forEach(link => {
            if (link.hash.length > 0) {
                link.addEventListener('click', (e) => {
                    if(lenis){
                        e.preventDefault();
                        lenis.scrollTo(`${link.hash}`);
                    }
                })
            }
        });
    }

    const backLink = document.querySelector('.back-anchor');

    if(backLink){
        lenis.on('scroll',()=>{
            const scrollPercentage = (lenis.scroll / lenis.limit) * 100;

            scrollPercentage > 5 ? backLink.classList.add('active') : backLink.classList.remove('active');

            const circle = document.querySelector('.progress-circle-fill');
            const radius = circle.r.baseVal.value; // Get the radius of the circle
            const circumference = 2 * Math.PI * radius; // Calculate the circumference

            // Calculate the offset based on the percentage
            const offset = circumference - (scrollPercentage / 100 * circumference);

            // Set the stroke-dasharray and stroke-dashoffset
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
        });

    }
    // cards.forEach((card, index) => {
    //     const tween = gsap.to(card, {
    //         scrollTrigger: {
    //             trigger: card,
    //             start: () => `top bottom-=100`,
    //             end: () => `top top+=40`,
    //             scrub: true,
    //             // markers: true,
    //             invalidateOnRefresh: true,
    //         },
    //         ease: "none",
    //         scale: () => .9,
    //         yPercent: () => index * 1,
    //     });
    //
    //     ScrollTrigger.create({
    //         trigger: card,
    //         start: "top 5%",
    //         pin: true,
    //         pinSpacing: false,
    //         markers:true,
    //         id: 'pin',
    //         end: "max",
    //         invalidateOnRefresh: true,
    //     });
    // });

    // const overlaySection = document.querySelectorAll('.card');
    // const overlayWrapper = document.querySelector('.overlay-wrapper');

    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll('.card');
    const animation = gsap.timeline();
    let cardHeight;

    function initCards() {
        animation.clear();
        cardHeight = cards[0].offsetHeight; // Get the height of the first card

        cards.forEach((card, index) => {
            // Set initial position and scale for each card
            if(index > 0){
                gsap.set(card, { y: index * (cardHeight + 30), scale: 1 });

                // Animate each card
                animation.to(card, {
                    y: index * 10,
                    scale: 0.9,
                    duration: 1 * index, // Set a fixed duration for visibility
                    ease: "none"
                }, 0); // Start all animations at the same time
            }else{
                gsap.set(card, { y: (index * cardHeight), scale: 1 });

                // Animate each card
                animation.to(card, {
                    scale: 0.9,
                    duration: 1, // Set a fixed duration for visibility
                    ease: "none"
                }, 0); // Start all animations at the same time
            }
        });
    }

    initCards();

    ScrollTrigger.create({
        trigger: ".card-grid", // The container that holds the cards
        start: "top top", // Start when the top of the card grid hits the top of the viewport
        pin: true, // Pin the card grid in place
        end: () => `+=${(cards.length * cardHeight)}`, // End after all cards have been scrolled through
        scrub: true, // Smoothly animate the changes
        animation: animation, // Attach the timeline animation
        // markers: true, // Show markers for debugging
        invalidateOnRefresh: true // Recalculate on refresh
    });

// Reinitialize cards on refresh
    ScrollTrigger.addEventListener("refreshInit", initCards);



    const burger = document.querySelector('[name="burger"]');

    burger.addEventListener('change',()=>{
        burger.checked ? lenis.stop() : lenis.start();
    });



    const textExpandArray = document.querySelectorAll('.js-text-expand');

    if(textExpandArray.length){
        textExpandArray.forEach(textExpand=>{
            const textExpandElement = textExpand.querySelector('.js-text-expand-item');
            textExpand.style.setProperty('--text-height', `${textExpandElement.getBoundingClientRect().height}px`)

            textExpand.addEventListener('change',()=>{
                const textExpandElement = textExpand.querySelector('.js-text-expand-item');
                textExpand.style.setProperty('--text-height', `${textExpandElement.getBoundingClientRect().height}px`)
            });
        });
    }


    let currentIndex = 1; // Start with the first image
    const totalImages = 9; // Total number of images
    const imageElement = document.querySelector('.quote-person-img'); // Get the image element

    function changeImage() {
        imageElement.style.opacity = 0;

        setTimeout(() => {
            currentIndex++;
            if (currentIndex > totalImages) {
                currentIndex = 1;
            }
            imageElement.src = `assets/images/quote/${currentIndex}.jpg`;

            imageElement.style.opacity = 1;
        }, 500);
    }
    setInterval(changeImage, 3000);
})