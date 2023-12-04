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

class Animations {
    constructor() {
        this.animationWrapperArray = document.querySelectorAll('.animation-wrapper');
    }

    toggleAnimation(animationWrapperElement) {
        const animationItemArray = animationWrapperElement.querySelectorAll('.animation-item');
        animationItemArray.forEach((animationItemElement, animationItemIndex) => {
            animationItemElement.style.animationDelay = `${animationItemIndex * 0.2}s`;
            animationItemElement.classList.add('animation-item--animated');
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.toggleAnimation(entry.target);
            }
        });
    }

    init() {
        if (!this.animationWrapperArray.length) return;

        const observer = new IntersectionObserver(this.handleIntersection.bind(this));
        this.animationWrapperArray.forEach(animationWrapper => {
            observer.observe(animationWrapper);
        });
    }
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


const rankArray= {
    "herald-1": {
        value: 0,
    },
    "herald-2": {
        value: 300,
    },
    "herald-3": {
        value: 450,
    },
    "herald-4": {
        value: 600,
    },
    "herald-5": {
        value: 750,
    },
    "guardian-1": {
        value: 900,
    },
    "guardian-2": {
        value: 1050,
    },
    "guardian-3": {
        value: 1200,
    },
    "guardian-4": {
        value: 1350,
    },
    "guardian-5": {
        value: 1500,
    },
    "crusader-1": {
        value: 1750,
    },
    "crusader-2": {
        value: 1900,
    },
    "crusader-3": {
        value: 2050,
    },
    "crusader-4": {
        value: 2200,
    },
    "crusader-5": {
        value: 2400,
    },
    "archon-1": {
        value: 2650,
    },
    "archon-2": {
        value: 2800,
    },
    "archon-3": {
        value: 2950,
    },
    "archon-4": {
        value: 3050,
    },
    "archon-5": {
        value: 3200,
    },
    "legend-1": {
        value: 3350,
    },
    "legend-2": {
        value: 3550,
    },
    "legend-3": {
        value: 3750,
    },
    "legend-4": {
        value: 3900,
    },
    "legend-5": {
        value: 4050,
    },
    "ancient-1": {
        value: 4250,
    },
    "ancient-2": {
        value: 4400,
    },
    "ancient-3": {
        value: 4650,
    },
    "ancient-4": {
        value: 4800,
    },
    "ancient-5": {
        value: 4950,
    },
    "divine-1": {
        value: 5100,
    },
    "divine-2": {
        value: 5350,
    },
    "divine-3": {
        value: 5500,
    },
    "divine-4": {
        value: 5650,
    },
    "divine-5": {
        value: 5780,
    },
    "immortal-1": {
        value: 6000,
    },
}

const findRank = (value) => {
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

///////////////////////

//animation init
const animation = new Animations();
animation.init();

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

const rankItemArray = document.querySelectorAll('.rank-wrapper');

if (rankItemArray.length) {
    rankItemArray.forEach(rankItem => {
        const rankItemInput = rankItem.querySelector('.rank-value'),
            rankItemLabel = rankItem.querySelector('.rank-item'),
            rankItemName = rankItem.querySelector('.rank-item__name');

        const inputValue = parseInt(rankItemInput.value);
        const newRank = findRank(inputValue);
        rankItemName.textContent = newRank;

        rankItemLabel.style.setProperty('--bg-name', `url('../images/ranks/${newRank}.png')`);

        rankItemInput.addEventListener('change', () => {
            const inputValue = parseInt(rankItemInput.value);
            const newRank = findRank(inputValue);
            rankItemName.textContent = newRank;

            rankItemLabel.style.setProperty('--bg-name', `url('../images/ranks/${newRank}.png')`);
        });
    });
}


const languageSelect = document.querySelectorAll('.language-select');

if(languageSelect.length){
    languageSelect.forEach(element=>{
        const languageSelectLink = element.querySelector('.language-select__current'),
            languageSelectList = element.querySelector('.language-select__list');

        languageSelectLink.addEventListener('click',(e)=>{
            e.preventDefault();
            languageSelectList.classList.toggle('language-select__list--active');
        });
    });
}

const tipArray = document.querySelectorAll('.tip')

tipArray.forEach(tip=>{
    const tipLabel = tip.querySelector('.tip-content');
    const tipLabelContent = tip.querySelector('.calculator-checkbox__label');

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let tipOffset = tip.getBoundingClientRect().left;

    if(tipLabelContent){
        tipOffset = tipLabelContent.getBoundingClientRect().left - 8;
    }

    tip.style.setProperty('--left-offset', `${-(tipOffset)}px`);
});