document.addEventListener('DOMContentLoaded',()=>{
    const burger = document.querySelector('.burger');
    const header = document.querySelector('.header')

    burger.addEventListener('click',(e)=>{
        e.preventDefault();

        header.classList.toggle('header--open')
        burger.classList.toggle('burger--active');
    });
});