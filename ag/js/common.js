document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger'),
        mainNav = document.querySelector('.main-nav');

    burger.addEventListener('click', function () {
        this.classList.contains('active') ? (this.classList.remove('active'), mainNav.classList.remove('active'), document.body.classList.remove('no-scroll')) : (this.classList.add('active'), mainNav.classList.add('active'), document.body.classList.add('no-scroll'));
    });

    const toTopButton = document.querySelector('.to-top');

    toTopButton.addEventListener('click', () => {
        document.body.scrollIntoView({
            behavior: 'smooth'
        });
    })
});