document.addEventListener('DOMContentLoaded', () => {
    const lenis = typeof Lenis !== 'undefined' ? new Lenis({smoothWheel: true, duration: 1.2}) : null;

    if (lenis) {
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
                    if (lenis) {
                        e.preventDefault();
                        lenis.scrollTo(`${link.hash}`, {duration: 4});
                    }
                })
            }
        });
    }

    const backLink = document.querySelector('.back-anchor');

    if (backLink) {
        lenis.on('scroll', () => {
            const scrollPercentage = (lenis.scroll / lenis.limit) * 100;

            scrollPercentage > 5 ? backLink.classList.add('active') : backLink.classList.remove('active');

            const circle = document.querySelector('.progress-circle-fill');
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;

            const offset = circumference - (scrollPercentage / 100 * circumference);

            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
        });

    }

    const cards = document.querySelectorAll('.card');
    const animation = gsap.timeline();
    let cardHeight;

    function initCards() {
        animation.clear();
        cardHeight = cards[0].offsetHeight;

        cards.forEach((card, index) => {
            if (index > 0) {
                gsap.set(card, {y: index * (cardHeight + 30), scale: 1});
                animation.to(card, {
                    y: index * 10,
                    scale: 0.9,
                    duration: 1 * index,
                    ease: "none"
                }, 0);
            } else {
                gsap.set(card, {y: (index * cardHeight), scale: 1});
                animation.to(card, {
                    scale: 0.9,
                    duration: 1,
                    ease: "none"
                }, 0);
            }
        });
    }

    initCards();

    ScrollTrigger.create({
        trigger: ".card-grid",
        start: "top top",
        pin: true,
        end: () => `+=${(cards.length * cardHeight)}`,
        scrub: true,
        animation: animation,
        invalidateOnRefresh: true
    });

    // Reinitialize cards on refresh
    ScrollTrigger.addEventListener("refreshInit", initCards);

    const targetNode = document.querySelector('.hero');
    const observer = new MutationObserver(() => ScrollTrigger.refresh());
    observer.observe(targetNode, {attributes: true, childList: true, subtree: true});

    const burger = document.querySelector('[name="burger"]');

    burger.addEventListener('change', () => {
        burger.checked ? lenis.stop() : lenis.start();
    });

    const textExpandArray = document.querySelectorAll('.js-text-expand');

    if (textExpandArray.length) {
        textExpandArray.forEach(textExpand => {
            const textExpandElement = textExpand.querySelector('.js-text-expand-item');
            textExpand.style.setProperty('--text-height', `${textExpandElement.clientHeight}px`)
            textExpand.addEventListener('change', () => {
                const textExpandElement = textExpand.querySelector('.js-text-expand-item');
                textExpand.style.setProperty('--text-height', `${textExpandElement.clientHeight}px`)
            });
        });
    }

    let currentIndex = 1;
    const totalImages = 9;
    const imageElement = document.querySelector('.quote-person-img');

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

    const currentYearArray = document.querySelectorAll('.current-year');

    if (currentYearArray.length) {
        currentYearArray.forEach(year => {
            year.textContent = new Date().getFullYear();
        })
    }
})