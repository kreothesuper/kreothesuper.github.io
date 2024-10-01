document.addEventListener('DOMContentLoaded', () => {
    var elems = document.querySelectorAll('.carousel');
    if (elems.length) {
        var instances = M.Carousel.init(elems, {
            dist:0,
        });
    }
});