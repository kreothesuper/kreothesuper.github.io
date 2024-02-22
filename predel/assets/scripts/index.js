document.addEventListener('DOMContentLoaded',()=>{
    const burger = document.querySelector('.burger'),
        headerNav = document.querySelector('.header__nav');

    burger.addEventListener('click',(e)=>{
        e.preventDefault();

        burger.classList.toggle('burger--active')
        headerNav.classList.toggle('header__nav--active');
    })
});