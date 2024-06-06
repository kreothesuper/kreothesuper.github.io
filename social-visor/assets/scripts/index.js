document.addEventListener('DOMContentLoaded', () => {
    const words = [{color:'#DF6C38',label:'правообладателей'}, {color:'#63B058',label:'аналитиков'}, {color:'#56BEEE',label:'таргетологов'},{color:'#D7348A',label:'маркетологов'}];
    let currentIndex = 0;

    const hero = document.querySelector('.hero'),
    heroTitle = document.querySelector('.js-hero-title');

    const switchWords = () => {
        hero.style.setProperty('--accent-color',words[currentIndex].color);
        heroTitle.textContent = words[currentIndex].label;
        currentIndex = (currentIndex + 1) % words.length;
    }

    setInterval(switchWords, 3000);

    const switchImgElement = document.querySelector('.js-img-toggle')

    const img = ['assets/images/analytics-img-2.png','assets/images/analytics-img-3.png','assets/images/analytics-img.png'];
    let currentIndexImg = 0;
    const switchImg = () => {
        switchImgElement.src = img[currentIndexImg];
        currentIndexImg = (currentIndexImg + 1) % img.length;
    }

    setInterval(switchImg, 3000);

    const headerNav = document.querySelector('.header__nav'),
    burger = document.querySelector('.burger');

    burger.addEventListener('click',(e)=>{
        e.preventDefault();

        headerNav.classList.toggle('header__nav--active');
        burger.classList.toggle('burger--active');
    });
});