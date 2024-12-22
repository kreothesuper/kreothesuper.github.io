document.addEventListener('DOMContentLoaded',()=>{
    const lenis = typeof Lenis !== 'undefined' ? new Lenis({smoothWheel: true, duration: 1.2}) : null;

    if(lenis){
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }
    const cards = gsap.utils.toArray(".card");

    cards.forEach((card, index) => {
        const tween = gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: () => `top bottom-=100`,
                end: () => `top top+=40`,
                scrub: true,
                // markers: true,
                invalidateOnRefresh: true
            },
            ease: "none",
            scale: () => .9,

        });

        ScrollTrigger.create({
            trigger: card,
            start: "top top",
            pin: true,
            pinSpacing: false,
            // markers: true,
            id: 'pin',
            end: 'max',
            invalidateOnRefresh: true,
        });
    });

})