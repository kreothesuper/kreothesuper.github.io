document.addEventListener('DOMContentLoaded', () => {
    var elems = document.querySelectorAll('.carousel');
    if (elems.length) {
        var instances = M.Carousel.init(elems, {

        });
    }



    const navLinkArray = document.querySelectorAll('.nav-list__link');

    if (navLinkArray.length) {
        navLinkArray.forEach(link => {
            const linkImg = link.querySelector('.nav-list__img');
            link.addEventListener('touchstart', (e) => {
                linkImg.src = linkImg.dataset.hover;
            });
        });
    }
});