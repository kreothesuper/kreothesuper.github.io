const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup__wrapper') ||
        event.key === 'Escape' ||
        event.target.closest('.popup-close')
    ) {
        event.preventDefault();
        hideAllPopups();
    }
};
const showPopup = popupId => {
    const popup = document.querySelector(popupId);
    if (!popup) return

    hideAllPopups();

    popup.classList.add('popup--active');
    document.body.classList.add('no-scroll');

    document.addEventListener('click', checkTargetOrKey);
    document.addEventListener('keyup', checkTargetOrKey);
};

const hideAllPopups = () => {
    const popups = document.querySelectorAll('.popup');

    popups.forEach(popup => {
        popup.classList.remove('popup--active');
    });
    document.body.classList.remove('no-scroll');

    document.removeEventListener('click', checkTargetOrKey);
    document.removeEventListener('keyup', checkTargetOrKey);
};

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


    const blockArray = document.querySelectorAll('.toggle-block');

    if(blockArray){
        blockArray.forEach(block=>{
            const blockLink = block.querySelector('.toggle-block-link');

            blockLink.addEventListener('click',(e)=>{
                e.preventDefault();

                block.classList.toggle('active');
            });
        });
    }

    const popupButtons = document.querySelectorAll('[data-popup]');
    const popups = document.querySelectorAll('.popup');

    if (popups.length) {
        popupButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const popupId = button.dataset.popup
                showPopup(popupId);
            });
        });
    }
});