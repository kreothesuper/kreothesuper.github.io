const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup__wrapper') ||
        event.key === 'Escape' ||
        event.target.closest('.popup-close')
    ) {
        hideAllPopups();
    }
};
const showPopup = popupId => {
    const popup = document.querySelector(popupId);
    if (!popup) return

    const pageWrapper = document.querySelector('body');

    hideAllPopups();

    popup.classList.add('popup--active');
    pageWrapper.classList.add('no-scroll');

    document.addEventListener('click', checkTargetOrKey);
    document.addEventListener('keyup', checkTargetOrKey);
};

const hideAllPopups = () => {
    const popups = document.querySelectorAll('.popup'),
        pageWrapper = document.querySelector('body');

    popups.forEach(popup => {
        popup.classList.remove('popup--active');
    });
    pageWrapper.classList.remove('no-scroll');

    document.removeEventListener('click', checkTargetOrKey);
    document.removeEventListener('keyup', checkTargetOrKey);
};

document.addEventListener('DOMContentLoaded',()=>{
    const burger = document.querySelector('.burger');
    const header = document.querySelector('.header')

    if(burger && header){
        burger.addEventListener('click',(e)=>{
            e.preventDefault();

            burger.classList.toggle('burger--active');
            header.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }


    const fileInputArray = document.querySelectorAll('.file-input');

    if(fileInputArray.length){
        fileInputArray.forEach(input=>{
            const fileInputName = input.querySelector('.file-input__name');

            input.addEventListener('change',(event)=>{
                const file = event.target.files[0];
                if (file && fileInputName) {
                    fileInputName.textContent = file.name;
                }
            });
        });
    }

    const pageNav = document.querySelector('.page-nav');

    if(pageNav){
        const pageNavLink = pageNav.querySelectorAll('.page-nav__item');

        if(pageNavLink.length){
            pageNavLink.forEach(link=>{
                if(!link.classList.contains('active')) return
                link.addEventListener('click',(e)=>{
                    e.preventDefault();

                    pageNav.classList.toggle('active');
                });
            });
        }
    }

    const cardArray = document.querySelectorAll('.card-item');

    if(cardArray.length){
        cardArray.forEach(card=>{
            const cardLink = card.querySelector('.card-item__link');

            cardLink.addEventListener('click',(e)=>{
                e.preventDefault();

                card.classList.toggle('active');
            });
        });
    }


    const accountList = document.querySelector('.account-list');

    if(accountList){
        const accountSettingsArray = accountList.querySelectorAll('.account-settings');
        if(accountSettingsArray.length){
            document.body.addEventListener('click',(e)=>{
                if(!(e.target.closest('.account-settings'))){
                    console.log('2');
                    accountSettingsArray.forEach(settings=>{
                        settings.classList.remove('active');
                    });
                }
                if(e.target.closest('.account-settings__link')){
                    e.preventDefault();

                    e.target.closest('.account-settings').classList.toggle('active');
                }
            });
        }
    }

    const passwordArray = document.querySelectorAll('.js-password');

    if(passwordArray.length){
        passwordArray.forEach(password=>{
            const passwordLink = password.querySelector('.js-password-icon'),
                passwordInput = password.querySelector('.js-password-input');

            passwordLink.addEventListener('click',(e)=>{
                e.preventDefault();

                passwordLink.classList.toggle('active');
                if(passwordLink.classList.contains('active')){
                    passwordInput.type = 'text';
                }else{
                    passwordInput.type = 'password';
                }
            });
        });
    }


    const partnersSlider = new Swiper('.partners-slider', {
        loop: true,
        slidesPerView:3,
        spaceBetween:30,
        grid:{
            rows:2,
            fill:'rows',
        },
        breakpoints:{
            768:{
                grid:{
                    rows: 1
                },
                slidesPerView: 'auto',
            }
        },
        pagination: {
            el: '.partners-slider-pagination',
            bulletClass: 'slider-pagination__bullet',
            bulletActiveClass: 'slider-pagination__bullet--active',
        },

        navigation: {
            nextEl: '.partners-slider-button-next',
            prevEl: '.partners-slider-button-prev',
        },
    });

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
})