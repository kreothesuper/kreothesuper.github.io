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

document.addEventListener('DOMContentLoaded',()=>{
    initTabs();
    const swiper = new Swiper('.slider-advantages', {
        speed: 400,
        spaceBetween: 0,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.slider-button--next',
            prevEl: '.slider-button--prev',
        },
    });

    gsap.to(".hero-img__item", {
        backgroundPosition: `${-innerHeight / 3}px 50%`,
        scrollTrigger: {
            trigger: ".hero",
            scrub: true
        },
    });
    gsap.to(".hero-img", {
        scrollTrigger: {
            scrub: true
        },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
        ease: "none"
    });

    let panelsSection = document.querySelector("#panels"),
        panelsContainer = document.querySelector("#panels-container"),
        tween;

    const panels = gsap.utils.toArray("#panels-container .panel");
     tween = gsap.to(panels, {
        xPercent: -100 * ( panels.length - 1 ),
        ease: "none",
        scrollTrigger: {
            trigger: "#panels-container",
            pin: true,
            start: "top top",
            scrub: 1,
            anticipatePin: 1,
            snap: {
                snapTo: 1 / (panels.length - 1),
                inertia: false,
                duration: {min: 0.1, max: 0.1}
            },
            end: () =>  "+=" + (panelsContainer.offsetWidth - innerWidth)
        }
    });

    gsap.utils.toArray(".text-container").forEach((container) => {
        gsap.set(container, { opacity: 0 });
        gsap.to(container, {
            opacity: 1,
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "restart none none none",
            }
        });

        gsap.utils.toArray(container.querySelectorAll(".line")).forEach((line, index) => {
            gsap.to(line, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power1.out",
                delay: index * 0.5,
                scrollTrigger: {
                    trigger: container,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "restart none none none",
                }
            });
        });
    });


    const burgerArray = document.querySelectorAll('.burger');
    const nav = document.querySelector('.nav');

    if(burgerArray.length && nav){
        burgerArray.forEach(burger=>{
            burger.addEventListener('click',(e)=>{
                e.preventDefault();

                nav.classList.toggle('active');
                burgerArray.forEach(burgerElement=>{
                    burgerElement.classList.toggle('burger--active');

                })
            });
        });

        nav.addEventListener('click',(e)=>{
            if(e.target.classList.contains('nav')){
                burgerArray.forEach(burgerElement=>{
                    burgerElement.classList.remove('burger--active');
                    nav.classList.remove('active');
                })
            }
        })
    }
})