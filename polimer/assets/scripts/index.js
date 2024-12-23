document.addEventListener('DOMContentLoaded',()=>{
    const objectSlider = document.querySelectorAll('.object-slider');

    objectSlider.forEach(object=>{
        const objectNav = object.closest('.object-item').querySelector('.object-nav');
        var swiper = new Swiper(objectNav, {
            spaceBetween: 10,
            slidesPerView: 'auto',
            // freeMode: true,
            watchSlidesProgress: true,
        });
        var swiper2 = new Swiper(object, {
            spaceBetween: 10,
            slidesPerView: 'auto',
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
                swiper: swiper,
            },
        });
    });


    var employesNav = new Swiper(".employees-slider__nav", {
        spaceBetween: 10,
        slidesPerView: 'auto',
        // freeMode: true,
        watchSlidesProgress: true,
    });
    var employesSlider = new Swiper(".employees-slider__element", {
        spaceBetween: 10,
        slidesPerView: 'auto',
        autoHeight:true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: employesNav,
        },
    });


    var documentSlider = new Swiper(".document-slider-element", {
        effect: 'coverflow',
        slidesPerView:"auto",
        centeredSlides: true,
        loopAdditionalSlides:3,
        loop:true,
        init:false,
        initialSlide: 2,
        spaceBetween:30,
        coverflowEffect: {
            depth:108,
            modifier:1,
            scale:.8,
            stretch:125,
            rotate:0,
            slideShadows: false,
        },
        breakpoints:{
            768:{
                spaceBetween:0,
                slidesPerView:3,
                coverflowEffect: {
                    depth:0,
                    modifier:2,
                    scale:.9,
                    stretch:80,
                    rotate:0,
                    slideShadows: false,
                },
            }
        },
        navigation: {
            nextEl: '.document-slider-button-next',
            prevEl: '.document-slider-button-prev',
        },
    });

    const documentSliderElement = document.querySelector('.document-slider');

    if(documentSliderElement){
        const documentSliderText = documentSliderElement.querySelector('.document-slider-text');
        documentSliderElement.style.setProperty('--height',`${documentSliderElement.getBoundingClientRect().height}px`)
        if(documentSliderText){
            documentSlider.on("slideChange",()=>{
                const currentText = documentSlider.slides[documentSlider.realIndex].querySelector('[data-text]');

                if(currentText){
                    documentSliderText.textContent = currentText.dataset.text;
                }

            });

            documentSlider.on("init",()=>{
                const currentText = documentSlider.slides[documentSlider.realIndex].querySelector('[data-text]');

                if(currentText){
                    documentSliderText.textContent = currentText.dataset.text;
                }
            });
        }

        documentSlider.init();
    }


    // Get the modal
    var modal = document.getElementById("myModal");

    if(modal){
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var imgArray = document.querySelectorAll(".popup-img");
        var modalImg = document.getElementById("img01");
        if(imgArray.length){
            imgArray.forEach(img=>{
                img.onclick = function(){
                    modal.style.display = "flex";
                    modalImg.src = this.src;
                    document.body.classList.add('no-scroll');
                }
            })
        }

        var span = document.getElementsByClassName("close")[0];

        span.onclick = function() {
            modal.style.display = "none";
            document.body.classList.remove('no-scroll');
        }

        modal.onclick = function (e){
            if(e.target.classList.contains('modal')){
                modal.style.display = "none";
                document.body.classList.remove('no-scroll');
            }
        }
    }
});