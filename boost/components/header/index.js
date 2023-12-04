const burger = document.querySelector('.burger'),
    mobileMenu = document.querySelector('.mobile-menu'),
    headerSupport = document.querySelector('.header__support');

burger.addEventListener('click', (e) => {
    e.preventDefault();

    mobileMenu.classList.toggle('mobile-menu--active');
    headerSupport.classList.toggle('header__support--active')
    burger.classList.toggle('burger--active');
});

const navCatalogLink = document.querySelector('.nav-catalog-link');

if(navCatalogLink){
    const navCatalogBlock = document.querySelector('.nav-catalog-block');
    navCatalogLink.addEventListener('click',(e)=>{
        e.preventDefault();

        navCatalogLink.classList.toggle('nav-catalog-link--active');
        navCatalogBlock.classList.toggle('nav-catalog-block--active');
    });
}