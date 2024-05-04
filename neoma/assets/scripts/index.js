document.addEventListener('DOMContentLoaded',()=>{
    const burger = document.querySelector('.burger'),
    header = document.querySelector('.header');

    if(burger && header){
        burger.addEventListener('click',(e)=>{
            e.preventDefault();

            header.classList.toggle('header--active');
            burger.classList.toggle('burger--active');
        });
    }
});