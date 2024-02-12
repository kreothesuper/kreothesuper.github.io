document.addEventListener('DOMContentLoaded',()=>{
    const videoArray = document.querySelectorAll('.video');

    if(videoArray.length){
        videoArray.forEach(video=>{
            const videoPlay = video.querySelector('.video__play');
            const videoItem = video.querySelector('video');

            videoPlay.addEventListener('click',(e)=>{
                e.preventDefault();

                videoItem.paused ? (videoItem.play(), video.classList.add('video--active')) : (videoItem.pause(),video.classList.remove('video--active'));
            });
        });
    }
});