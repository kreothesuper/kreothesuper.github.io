document.addEventListener('DOMContentLoaded',()=>{
    const fileInputArray = document.querySelectorAll('.file-input');

    if(fileInputArray.length){
        fileInputArray.forEach(input=>{
            const inputText = input.querySelector('.file-input__checkmark');
            if(!inputText) return
            input.addEventListener('change',(e)=>{
                const file = e.target.files[0];
                inputText.textContent = file.name;
            });
        })
    }

    const blockArray = document.querySelectorAll('.js-block');

    if(blockArray.length){
        blockArray.forEach(block=>{
            const blockLink = block.querySelector('.js-block-toggle');
            const blockContent = block.querySelector('.js-block-content');
            block.style.setProperty('--height',`${blockContent.getBoundingClientRect().height}px`)
            blockLink.addEventListener('click',(e)=>{
                e.preventDefault();
                block.classList.toggle('active');
            });
        });
    }


    const nav = document.querySelector('.header__nav'),
        burger = document.querySelector('.burger');

    const header = document.querySelector('.header'),
        searchLinkArray = document.querySelectorAll('.js-header-link'),
        searchWrapper = document.querySelector('.js-search');

    if(nav && burger){
        burger.addEventListener('click',(e)=>{
            e.preventDefault();

            if(header.classList.contains('header--nav')){
                header.classList.remove('header--nav');
                header.classList.remove('header--overlay')
                burger.classList.remove('active');
            }else{
                header.classList.remove('header--search');
                header.classList.add('header--nav');
                header.classList.add('header--overlay');
                burger.classList.add('active');
            }
        });
    }

    if(header && searchLinkArray.length){
        searchLinkArray.forEach(link=>{
            link.addEventListener('click',e=>{
                e.preventDefault();
                if(header.classList.contains('header--search')){
                    header.classList.remove('header--search');
                    header.classList.remove('header--overlay');
                }else{
                    header.classList.add('header--search');
                    header.classList.add('header--overlay');
                    header.classList.remove('header--nav');
                }
            });
        })
    }


    const marquee = document.querySelectorAll('.marquee-left');

    if(marquee.length){
        let marqueeLeft = new Swiper('.marquee-left', {
            spaceBetween: 30,
            centeredSlides: true,
            speed: 3000,
            autoplay: {
                delay: 1,
            },
            loop: true,
            slidesPerView:'auto',
            allowTouchMove: false,
            disableOnInteraction: true,
            breakpoints:{
                600:{
                    spaceBetween:15
                }
            }
        });
    }

    const teamSlider = document.querySelector('.team-slider');

    if(teamSlider){
        let marqueeLeft = new Swiper('.team-slider', {
            slidesPerView:1,
            spaceBetween:20,
            pagination: {
                el: ".swiper-pagination",
              },
            breakpoints:{
                768:{
                    slidesPerView:3,
                }
            }
        });
    }
});