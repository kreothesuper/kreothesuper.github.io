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

    const pageWrapper = document.querySelector('.page-wrapper');

    hideAllPopups();

    popup.classList.add('popup--active');
    pageWrapper.classList.add('no-scroll');

    document.addEventListener('click', checkTargetOrKey);
    document.addEventListener('keyup', checkTargetOrKey);
};

const hideAllPopups = () => {
    const popups = document.querySelectorAll('.popup'),
        pageWrapper = document.querySelector('.page-wrapper');

    popups.forEach(popup => {
        popup.classList.remove('popup--active');
    });
    pageWrapper.classList.remove('no-scroll');

    document.removeEventListener('click', checkTargetOrKey);
    document.removeEventListener('keyup', checkTargetOrKey);
};


const rankArray = {
    "herald-1":{
        value:0,
    },
    "herald-2":{
        value:300,
    },
    "herald-3":{
        value:450,
    },
    "herald-4":{
        value:600,
    },
    "herald-5":{
        value:750,
    },
    "guardian-1":{
        value:900,
    },
    "guardian-2":{
        value:1050,
    },
    "guardian-3":{
        value:1200,
    },
    "guardian-4":{
        value:1350,
    },
    "guardian-5":{
        value:1500,
    },
    "crusader-1":{
        value:1750,
    },
    "crusader-2":{
        value:1900,
    },
    "crusader-3":{
        value:2050,
    },
    "crusader-4":{
        value:2200,
    },
    "crusader-5":{
        value:2400,
    },
    "archon-1":{
        value:2650,
    },
    "archon-2":{
        value:2800,
    },
    "archon-3":{
        value:2950,
    },
    "archon-4":{
        value:3050,
    },
    "archon-5":{
        value:3200,
    },
    "legend-1":{
        value:3350,
    },
    "legend-2":{
        value:3550,
    },
    "legend-3":{
        value:3750,
    },
    "legend-4":{
        value:3900,
    },
    "legend-5":{
        value:4050,
    },
    "ancient-1":{
        value:4250,
    },
    "ancient-2":{
        value:4400,
    },
    "ancient-3":{
        value:4650,
    },
    "ancient-4":{
        value:4800,
    },
    "ancient-5":{
        value:4950,
    },
    "divine-1":{
        value:5100,
    },
    "divine-2":{
        value:5350,
    },
    "divine-3":{
        value:5500,
    },
    "divine-4":{
        value:5650,
    },
    "divine-5":{
        value:5780,
    },
    "immortal-1":{
        value:6000,
    },
}

const selectInit = () => {
    const selectArray = document.querySelectorAll('.custom-select');

    if (selectArray.length > 0) {
        selectArray.forEach((element, index) => {
            const selectTag = element.querySelector('select'),
                selectOption = selectTag.querySelectorAll('option');
            const selectWrapper = document.createElement('div'),
                selectLabel = document.createElement('div'),
                selectItemList = document.createElement('div'),
                selectLabelSpan = document.createElement('span'),
                selectLabelArea = document.createElement('span');

            selectWrapper.classList.add('select__wrapper');

            selectLabel.classList.add('select__label');
            selectLabelSpan.classList.add('select__name');
            selectLabelArea.classList.add('select__area');

            selectLabelSpan.textContent = selectTag[selectTag.selectedIndex].textContent;
            element.style.setProperty('--bg-name', `url('../images/ranks/${selectTag.value}.png')`);
            selectLabel.append(selectLabelSpan);

            selectItemList.classList.add('select__content', 'select__content--hidden')

            selectWrapper.append(selectLabel);
            element.append(selectLabelArea);
            element.append(selectWrapper);

            selectOption.forEach((element, index) => {
                const selectItem = document.createElement('div');

                selectItem.classList.add('select__item');
                selectItem.textContent = element.textContent;

                // Check if the delegated event is triggered properly
                selectItem.addEventListener('click', (e) => {
                    const selectItemTag = e.target.closest('.select').querySelector('select'),
                        selectItemOptions = selectItemTag.querySelectorAll('option');

                    selectItemOptions.forEach((element, index) => {
                        if (element.textContent === selectItem.textContent) {
                            selectItemTag.selectedIndex = index;
                            selectLabelSpan.textContent = element.textContent;

                            // Trigger change event when selectIndex is changed
                            const event = new Event('change', {bubbles: true});
                            selectItemTag.dispatchEvent(event);
                        }
                    });

                    selectLabel.click();
                });

                selectItemList.append(selectItem);
            });

            selectWrapper.append(selectItemList);

            if (selectOption.length < 2) {
                element.classList.add('non-active');
                return false
            }

            // Check if the click event is properly handled
            selectLabelArea.addEventListener('click', (e) => {
                e.stopPropagation();

                closeAllSelect(selectLabel);
                window.innerHeight - selectItemList.getBoundingClientRect().bottom < 100 ? (selectItemList.classList.add('select__content--top'), selectLabel.classList.add('select__label--top')) : (selectItemList.classList.remove('select__content--top'), selectLabel.classList.remove('select__label--top'))

                selectItemList.classList.toggle('select__content--hidden');
                selectLabel.classList.toggle('select__label--active');
                element.classList.toggle('active');
            });

            selectTag.addEventListener('change', () => {
                const selectItemOptions = selectTag.options,
                    selectedItem = selectItemOptions[selectTag.selectedIndex];

                selectLabelSpan.textContent = selectedItem.textContent;
                element.style.setProperty('--bg-name', `url('../images/ranks/${selectTag.value}.png')`);
            })
        });

        document.addEventListener('click', closeAllSelect);
    }
}

const closeAllSelect = (select) => {
    const selectContentArray = document.querySelectorAll('.select__content'),
        selectLabelArray = document.querySelectorAll('.select__label');
    const customSelect = document.querySelectorAll('.custom-select');

    selectLabelArray.forEach((element, index) => {
        element !== select ? (element.classList.remove('select__label--active'), selectContentArray[index].classList.add('select__content--hidden'), customSelect[index].classList.remove('active')) : null;
    });
}

const findRank = (value) =>{
    let hero = null;
    for (const h in rankArray) {
        if (value >= rankArray[h].value) {
            hero = h;
        } else {
            break;
        }
    }

    return hero;
}

document.addEventListener('DOMContentLoaded',()=>{
    let marqueeLeft = new Swiper('.marquee-left', {
        spaceBetween: 16,
        centeredSlides: true,
        speed: 5000,
        autoplay: {
            delay: 1,
        },
        loop: true,
        slidesPerView: 'auto',
        allowTouchMove: false,
        disableOnInteraction: true,
        breakpoints: {
            600: {
                spaceBetween: 15
            }
        }
    });
    let marqueeRight = new Swiper('.marquee-right', {
        spaceBetween: 16,
        centeredSlides: true,
        speed: 5000,
        autoplay: {
            delay: 1,
            reverseDirection: true
        },
        loop: true,
        loopedSlides: 6,
        slidesPerView: 'auto',
        allowTouchMove: false,
        disableOnInteraction: true,
        breakpoints: {
            600: {
                spaceBetween: 15
            }
        }
    });
    const nav = document.querySelector('.aside'),
        navBurger = document.querySelector('.nav-item--burger');
    if(nav && navBurger){
        navBurger.addEventListener('click',(e)=>{
           e.preventDefault();

           nav.classList.toggle('aside--active');
           navBurger.classList.toggle('nav-item--burger--active');

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

    const fileInputArray = document.querySelectorAll('.file-input');

    if(fileInputArray.length){
        fileInputArray.forEach(fileInput=>{
            const fileInputItem = fileInput.querySelector('.file-input__item'),
                fileInputLabel = fileInput.querySelector('.file-input__label');

            fileInputItem.addEventListener('change',(e)=>{
                const fileName = e.target.files[0].name;

                console.log(fileName);

                fileInputLabel.textContent = fileName;
            });
        });
    }

    const orderItemLinkArray = document.querySelectorAll('.order-item-link');

    orderItemLinkArray.forEach(orderItemLink=>{
        const  orderItemContent = orderItemLink.closest('.order-item').querySelector('.order-item-toggle');
        if(orderItemContent){
            orderItemLink.addEventListener('click',(e)=>{
                e.preventDefault();

                orderItemLink.classList.toggle('order-item-link--active');
                orderItemContent.classList.toggle('order-item-toggle--active');
            })
        }
    });

    const profileCardLink = document.querySelector('.profile-card-link');

    if(profileCardLink){
        const profileCardList = document.querySelector('.profile-card-list');
        document.addEventListener('click',(e)=>{
            if(!e.target.closest('.profile-card')){
                profileCardList.classList.remove('profile-card-list--active');
            }
        });

        profileCardLink.addEventListener('click',(e)=>{
            e.preventDefault();
            profileCardList.classList.toggle('profile-card-list--active');
        });
    }

    const navCatalogLink = document.querySelector('.nav-catalog-link');

    if(navCatalogLink){
        const navCatalogBlock = document.querySelector('.nav-catalog-block');
        navCatalogLink.addEventListener('click',(e)=>{
            e.preventDefault();

            navCatalogLink.classList.toggle('nav-catalog-link--active');
            navCatalogBlock.classList.toggle('nav-catalog-block--active');
        });
    }

    const calculatorArray = document.querySelectorAll('.calculator-content');

    if (calculatorArray.length) {
        calculatorArray.forEach(calculator => {
            calculator.addEventListener('submit', (e) => {
                e.preventDefault();

                showPopup(".popup-calculator");
            });
        });
    }

    const rangeArray = document.querySelectorAll('.js-range');

    if (rangeArray.length > 0) {
        rangeArray.forEach(range => {
            const rangeElement = range.querySelector('.range-slider'),
                rangeMax = rangeElement.dataset.max,
                rangeMin = rangeElement.dataset.min,
                rangeInputMin = range.querySelector('.js-range-from-input'),
                rangeInputMax = range.querySelector('.js-range-to-input');
            const newEvent = new Event('change', {bubbles: true});
            if(rangeInputMin && rangeInputMax){
                const rangeSliderElement = rangeSlider(rangeElement, {
                    min: rangeMin,
                    max: rangeMax,
                    step: 1,
                    value: [rangeMin,rangeMax],
                    disabled: false,
                    rangeSlideDisabled: false,
                    thumbsDisabled: [false, false],
                    orientation: 'horizontal',
                    onInput: function (valueSet) {
                        rangeInputMin.value = valueSet[0];
                        rangeInputMax.value = valueSet[1];

                        rangeInputMin.dispatchEvent(newEvent);
                        rangeInputMax.dispatchEvent(newEvent);
                    },
                });

                rangeInputMin.addEventListener('change', () => {
                    rangeSliderElement.value([rangeInputMin.value, rangeInputMax.value])
                });
                rangeInputMax.addEventListener('change', () => {
                    rangeSliderElement.value([rangeInputMin.value, rangeInputMax.value])
                });

                rangeInputMax.dispatchEvent(newEvent);
                rangeInputMin.dispatchEvent(newEvent);
            }else{
                const rangeSliderElement = rangeSlider(rangeElement, {
                    min: rangeMin,
                    max: rangeMax,
                    step: 1,
                    value: rangeMin,
                    disabled: false,
                    rangeSlideDisabled: false,
                    thumbsDisabled: [true, false],
                    orientation: 'horizontal',
                    onInput: function (valueSet) {
                        rangeInputMax.value = valueSet[1];

                        rangeInputMax.dispatchEvent(newEvent);
                    },
                });

                rangeInputMax.addEventListener('change', () => {
                    rangeSliderElement.value([0, rangeInputMax.value])
                });

                rangeInputMax.dispatchEvent(newEvent);
            }
        });
    }

    const navListItemArray = document.querySelectorAll('.nav-list__item');

    navListItemArray.forEach(navListItem=>{
        const navSubList = navListItem.querySelector('.nav__sublist');

        if(navSubList){
            const asideBlock = document.querySelector('.aside__block');
            const navLink = navListItem.querySelector('.nav-item');
            const navBurger = asideBlock.querySelector('.nav-list__item--burger');
            navLink.classList.add('nav-item--sublist');

            document.addEventListener('click',(e)=>{
                if(!e.target.closest('.aside__block')){
                    asideBlock.classList.remove('aside__block--active');
                    navSubList.classList.remove('nav__sublist--active');
                }
            });

            navBurger.addEventListener('click',(e)=>{
                e.preventDefault();
                asideBlock.classList.toggle('aside__block--active');
            });

            navLink.addEventListener('click',(e)=>{
                e.preventDefault();
                asideBlock.classList.add('aside__block--active')
                navLink.classList.toggle('nav-item--sublist--active');
                navSubList.classList.toggle('nav__sublist--active');
            });
        }
    });

    const gamesItemArray = document.querySelectorAll('.game-item');

    if(gamesItemArray.length){
        gamesItemArray.forEach(item=>{
            const gameItemHeader = item.querySelector('.game-item-toggler'),
                gameItemContent = item.querySelector('.game-item__content');

            gameItemHeader.addEventListener('click',(e)=>{
                e.preventDefault();

                gameItemContent.classList.toggle('game-item__content--active');
                gameItemHeader.classList.toggle('game-item-toggler--active');
            });
        });
    }

    const rangeControl = document.querySelectorAll('.range-control');

    if (rangeControl.length) {
        rangeControl.forEach(element => {
            const rangeButtonMinus = element.querySelector('.range-control__button--minus'),
                rangeButtonPlus = element.querySelector('.range-control__button--plus'),
                rangeControlValue = element.querySelector('.range-control__input');

            rangeButtonMinus.addEventListener('click', (e) => {
                e.preventDefault();

                if (rangeControlValue.value - 30 < 0) return
                rangeControlValue.value -= 30;

                const event = new Event('change', {bubbles: true});
                rangeControlValue.dispatchEvent(event);
            });
            rangeButtonPlus.addEventListener('click', (e) => {
                e.preventDefault();

                console.log(+rangeControlValue.value, +rangeControlValue.max)
                if (+rangeControlValue.value + 30 > +rangeControlValue.max) return
                rangeControlValue.value = parseInt(rangeControlValue.value) + 30;

                const event = new Event('change', {bubbles: true});
                rangeControlValue.dispatchEvent(event);
            });
        });
    }

    const rankItemArray = document.querySelectorAll('.rank-wrapper');

    if(rankItemArray.length){
        rankItemArray.forEach(rankItem=>{
            const rankItemInput = rankItem.querySelector('.rank-value'),
                rankItemLabel = rankItem.querySelector('.rank-item'),
                rankItemName = rankItem.querySelector('.rank-item__name');

            const inputValue = parseInt(rankItemInput.value);
            const newRank = findRank(inputValue);
            rankItemName.textContent = newRank;

            rankItemLabel.style.setProperty('--bg-name', `url('../images/ranks/${newRank}.png')`);

            rankItemInput.addEventListener('change',()=>{
                const inputValue = parseInt(rankItemInput.value);
                const newRank = findRank(inputValue);
                rankItemName.textContent = newRank;

                rankItemLabel.style.setProperty('--bg-name', `url('../images/ranks/${newRank}.png')`);
            });
        });
    }

    const jsRankSelectArray = document.querySelectorAll('.js-rank-select');

    if(jsRankSelectArray.length){
        console.log('234');
        jsRankSelectArray.forEach(select=>{
            select.innerHTML = '';

            for (let rankArrayKey in rankArray) {
                const option = document.createElement('option');

                option.value = rankArrayKey;
                option.text = rankArrayKey;

                select.append(option)
            }

            selectInit();
        });
    }else{
        selectInit();
    }



    const burger = document.querySelector('.burger'),
        mobileMenu = document.querySelector('.mobile-menu'),
        headerSupport = document.querySelector('.header__support');



    burger.addEventListener('click', (e) => {
        e.preventDefault();

        mobileMenu.classList.toggle('mobile-menu--active');
        headerSupport.classList.toggle('header__support--active')
        burger.classList.toggle('burger--active');

        if(burger.classList.contains('burger--active')){

        }else{

        }
    });

    const chat = document.querySelector('.chat-menu');

    if(chat){
        const chatHeader = document.querySelectorAll('.chat__header');

        console.log(chatHeader);

        chatHeader.forEach(element=>{
            element.addEventListener('click',(e)=>{
                e.preventDefault();

                chat.classList.toggle('chat--active');
            });
        })
    }

    const inputElements = [...document.querySelectorAll('input.code-input')]

    inputElements.forEach((ele,index)=>{
        ele.addEventListener('keydown',(e)=>{

            if(e.keyCode === 8 && e.target.value==='') inputElements[Math.max(0,index-1)].focus()
        })
        ele.addEventListener('input',(e)=>{

            const [first,...rest] = e.target.value
            e.target.value = first ?? '';
            const lastInputBox = index===inputElements.length-1
            const didInsertContent = first!==undefined
            if(didInsertContent && !lastInputBox) {
                inputElements[index+1].focus()
                inputElements[index+1].value = rest.join('')
                inputElements[index+1].dispatchEvent(new Event('input'))
            }
        })
    })
});