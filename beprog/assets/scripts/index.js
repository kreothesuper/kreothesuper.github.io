document.addEventListener('DOMContentLoaded', () => {
    const videoArray = document.querySelectorAll('.video');

    if (videoArray.length) {
        videoArray.forEach(video => {
            const videoElement = document.querySelector('video');

            video.addEventListener('click', function (e) {
                if (!e.target.classList.contains('video__resize')) {
                    if (videoElement.paused) {
                        videoElement.play();
                        video.classList.add('play');
                    } else {
                        videoElement.pause();
                        video.classList.remove('play');
                        video.classList.remove('full');
                    }
                } else {
                    video.classList.toggle('full');
                }

            });
        })
    }

    const burger = document.querySelector('.burger');
    const header = document.querySelector('.header');

    burger.addEventListener('click', (e) => {
        e.preventDefault();

        burger.classList.toggle('burger--active');
        header.classList.toggle('header--active');
    });

    const language = document.querySelector('.language');

    if (language) {
        const languageCurrent = language.querySelector('.language__current');

        languageCurrent.addEventListener('click', () => {
            language.classList.toggle('language--active');
        });
    }
});