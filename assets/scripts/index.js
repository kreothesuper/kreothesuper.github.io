document.addEventListener('DOMContentLoaded',()=>{

    const sliderScrollbar = {
        el:'.slider-scrollbar',
        dragClass:'slider-scrollbar__drag'
    }
    const partnersSlider = new Swiper('.js-partners-slider',{
        slidesPerView:'auto',
        spaceBetween:50,
        breakpoints:{
            769:{
                spaceBetween:86,
            }
        }
    });
    const roadmapSlider = new Swiper('.js-roadmap-slider',{
        slidesPerView:'auto',
        spaceBetween:20,
        scrollbar:sliderScrollbar,
    });
    const teamSlider = new Swiper('.js-team-slider',{
        slidesPerView:'auto',
        spaceBetween:20,
        scrollbar:sliderScrollbar,
    });


    const faq = document.querySelector('.faq');

    if(faq){
        const faqItemArray = faq.querySelectorAll('.faq-item');

        if(faqItemArray.length){
            faqItemArray.forEach(faqItem=>{
                const faqItemHeader = faqItem.querySelector('.faq-item__header');

                faqItemHeader.addEventListener("click",(e)=>{
                    e.preventDefault();

                    faqItem.classList.toggle('faq-item--active');
                })
            })
        }
    }

    const burger = document.querySelector('.burger');
    const headerNav = document.querySelector('.header__nav');

    if(burger && headerNav){
        const navLinkArray = document.querySelectorAll('.nav__link');

        if(navLinkArray.length){
            navLinkArray.forEach(navLink=>{
                navLink.addEventListener('click',()=>{
                    burger.classList.remove('burger--active');
            headerNav.classList.remove('header__nav--active');    
                })
            })
        }

        burger.addEventListener('click',(e)=>{
            e.preventDefault();

            burger.classList.toggle('burger--active');
            headerNav.classList.toggle('header__nav--active')
        });
    }


  
});