document.addEventListener('DOMContentLoaded', () => {
    const videoSlider = document.querySelector('.video-slider');
    if (videoSlider) {
        const videoButtonArray = videoSlider.querySelectorAll('.video-slider__button'),
            videoSlidesArray = videoSlider.querySelectorAll('.video-slider__item'),
            popupVideo = document.querySelector('.popup-video');
        let startIndex = 0;

        if (!videoSlidesArray.length) return;

        const autoChangeSlide = () => {
            startIndex = (startIndex + 1) % videoSlidesArray.length;
            changeSlide();
        };

        const restartAnimation = () => {
            videoSlider.classList.remove('animate');
            void videoSlider.offsetWidth; // Trigger reflow
            videoSlider.classList.add('animate');
        };

        const changeSlide = () => {
            videoSlidesArray.forEach((slide, slideIndex) => {
                const slideVideo = slide.querySelector('.video-slider__frame');
                const player = videojs(slideVideo);

                if (slideIndex === startIndex) {
                    slide.classList.add('video-slider__item--active');
                    restartAnimation(); // Restart animation on active slide
                    player.currentTime(0); // Reset to start
                    player.play(); // Play active video
                } else {
                    slide.classList.remove('video-slider__item--active');
                    player.pause(); // Pause non-active videos
                }
            });
        };

        // Initialize the slider
        const initSlider = () => {
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

            if (popupVideo) {
                const videoElement = videoSlidesArray[startIndex].querySelector('video');
                const popupPlayer = videojs(popupVideo.querySelector('video'));

                popupVideo.addEventListener('click', (e) => {
                    if (e.target.classList.contains('popup')) {
                        popupVideo.classList.remove('active');
                        restartAnimation();
                        popupPlayer.currentTime(0);
                        popupPlayer.play();
                        slideInterval = setInterval(autoChangeSlide, 15000);
                    }
                });

                videoSlidesArray.forEach(video => {
                    video.addEventListener('click', () => {
                        const videoSrc = video.querySelector('video').dataset.big || video.querySelector('video').src;
                        popupPlayer.src({ type: 'video/mp4', src: videoSrc });
                        popupVideo.classList.add('active');
                        player.pause();
                        videoSlider.classList.remove('animate');
                        clearInterval(slideInterval);
                    });
                });
            }
        };

        // Start loading videos and checking if they are all loaded
        const videos = Array.from(videoSlidesArray).map(slide => slide.querySelector('.video-slider__frame'));
        let loadedVideosCount = 0;

        videos.forEach(video => {
            const player = videojs(video);
            player.ready(() => {
                loadedVideosCount++;
                console.log('loadVideo');

                // Check if all videos are loaded
                if (loadedVideosCount === videos.length) {
                    initSlider(); // Initialize the slider after all videos are loaded
                }
            });
        });

        // If all videos were already loaded initially, initialize the slider
        if (loadedVideosCount === videos.length) {
            initSlider();
        }
    }
});