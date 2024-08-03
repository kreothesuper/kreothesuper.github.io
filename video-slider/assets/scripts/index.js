document.addEventListener('DOMContentLoaded', () => {
    const videoSlider = document.querySelector('.video-slider');

    if (videoSlider) {
 
        const videoButtonArray = videoSlider.querySelectorAll('.video-slider__button'),
            videoSlidesArray = videoSlider.querySelectorAll('.video-slider__item');
        let startIndex = 0;



        const autoChangeSlide = () => {
            startIndex = (startIndex + 1) % videoSlidesArray.length;
            changeSlide();
        }

        const restartAnimation = () => {
            videoSlider.classList.remove('animate');
            void videoSlider.offsetWidth;
            videoSlider.classList.add('animate');
        }

        const changeSlide = () => {
            videoSlidesArray.forEach((slide, slideIndex) => {
                const slideVideo = slide.querySelector('.video-slider__frame');
                if (slideIndex === startIndex) {
                    slide.classList.add('video-slider__item--active');
                    restartAnimation(); // Restart animation on active slide

                    if (slideVideo.classList.contains('js-youtube-video')) {
                        if(player){
                            stopVideo();
                        }
                    } else {
                        slideVideo.play();
                        slideVideo.currentTime = 0;
                    }
                } else {
                    slide.classList.remove('video-slider__item--active');
                }
            });
        }

        changeSlide();

        let slideInterval = setInterval(autoChangeSlide, 15000);

        videoButtonArray.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                clearInterval(slideInterval);

                startIndex = (startIndex + +button.dataset.slide + videoSlidesArray.length) % videoSlidesArray.length;
                changeSlide();

                slideInterval = setInterval(autoChangeSlide, 15000);
            });
        });
    }
});