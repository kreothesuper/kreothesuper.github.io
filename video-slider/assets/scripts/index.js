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
                if (slideIndex === startIndex) {
                    slide.classList.add('video-slider__item--active');
                    restartAnimation(); // Restart animation on active slide
                    slideVideo.play();
                    slideVideo.currentTime = 0;
                } else {
                    slide.classList.remove('video-slider__item--active');
                    slideVideo.pause(); // Pause non-active videos
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
                popupVideo.addEventListener('click', (e) => {
                    const videoElement = videoSlidesArray[startIndex].querySelector('video');
                    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
                        const popupVideoFrame = popupVideo.querySelector('video');
                        popupVideo.classList.remove('active');
                        restartAnimation();
                        videoElement.currentTime = 0;
                        videoElement.play();
                        popupVideoFrame.src = '';
                        slideInterval = setInterval(autoChangeSlide, 15000);
                    }
                });
                const popupVideoElement = popupVideo.querySelector('video');
                videoSlidesArray.forEach(video => {
                    video.addEventListener('click', (e) => {
                        const videoSrc = video.querySelector('video').dataset.big || video.querySelector('video').src,
                            videoFrame = video.querySelector('video');
                        popupVideoElement.src = videoSrc;
                        popupVideo.classList.add('active');
                        videoFrame.pause();
                        videoSlider.classList.remove('animate');
                        clearInterval(slideInterval);
                    });
                });
            }
        };

        // Start loading videos and checking if they are all loaded
        const videos = Array.from(videoSlidesArray).map(slide => slide.querySelector('.video-slider__frame'));
        let loadedCount = 0; // Counter for loaded videos

        videos.forEach(video => {
            video.src = video.dataset.src; // Set the video source
            video.load(); // Load the video

            // Add an event listener to detect when the video is loaded
            video.addEventListener('loadeddata', () => {
                loadedCount++; // Increment the loaded count

                // Check if all videos are loaded
                if (loadedCount === videos.length) {
                    initSlider(); // Call the function when all videos are loaded
                }
            });

            video.addEventListener('error', (event) => {
                console.error('Error loading video:', event);
            });
        });
    }
});