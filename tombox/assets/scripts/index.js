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

const selectInit = () => {
    const selectArray = document.querySelectorAll('.custom-select');

    if (selectArray.length > 0) {
        selectArray.forEach((element, index) => {
            const selectTag = element.querySelector('select'),
                selectOption = selectTag.querySelectorAll('option');

            const selectWrapper = document.createElement('div'),
                selectLabel = document.createElement('div'),
                selectItemList = document.createElement('div'),
                selectLabelSpan = document.createElement('span');

            selectWrapper.classList.add('select__wrapper');

            selectLabel.classList.add('select__label');
            selectLabelSpan.classList.add('select__name');

            selectLabelSpan.textContent = selectTag[selectTag.selectedIndex].textContent;
            selectLabel.append(selectLabelSpan);

            selectItemList.classList.add('select__content', 'select__content--hidden')

            selectWrapper.append(selectLabel);
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

            // Check if the click event is properly handled
            selectLabel.addEventListener('click', (e) => {
                e.stopPropagation();

                closeAllSelect(selectLabel);
                window.innerHeight - selectItemList.getBoundingClientRect().bottom < 100 ? (selectItemList.classList.add('select__content--top'), selectLabel.classList.add('select__label--top')) : (selectItemList.classList.remove('select__content--top'), selectLabel.classList.remove('select__label--top'))

                selectItemList.classList.toggle('select__content--hidden');
                selectLabel.classList.toggle('select__label--active');
            });

            selectTag.addEventListener('change', () => {
                const selectItemOptions = selectTag.options,
                    selectedItem = selectItemOptions[selectTag.selectedIndex];

                selectLabelSpan.textContent = selectedItem.textContent;
            })
        });

        document.addEventListener('click', closeAllSelect);
    }
}

const closeAllSelect = (select) => {
    const selectContentArray = document.querySelectorAll('.select__content'),
        selectLabelArray = document.querySelectorAll('.select__label');

    selectLabelArray.forEach((element, index) => {
        element !== select ? (element.classList.remove('select__label--active'), selectContentArray[index].classList.add('select__content--hidden')) : null;
    });
}

const initTabs = () => {
    const tabs = [...document.querySelectorAll(".tabs")];

    if (tabs.length > 0) {
        tabs.forEach((tab) => {
            const tabContent = [...tab.querySelectorAll(".tabs__content")];
            const tabLinks = [...tab.querySelectorAll(".tabs__link")];

            const openTab = (tabIndex = 0) => {
                tabContent.forEach((element, i) => {
                    const isActive = i === tabIndex;
                    element.classList.toggle("active", isActive);
                });

                tabLinks.forEach((element, i) => {
                    element.classList.toggle("active", i === tabIndex);
                });
            }

            openTab(0)

            tabLinks.forEach((link, i) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    openTab(i);
                });
            });
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    initTabs();

    selectInit();

    const jsToggleWrapperArray = document.querySelectorAll('.js-toggle-wrapper');

    if (jsToggleWrapperArray.length) {
        jsToggleWrapperArray.forEach(jsToggleWrapper => {
            const jsToggleLink = jsToggleWrapper.querySelector('.js-toggle-link');

            jsToggleLink.addEventListener('click', (e) => {
                e.preventDefault();

                jsToggleWrapperArray.forEach(element => element !== jsToggleWrapper ? element.classList.remove('active') : null);
                jsToggleWrapper.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.js-toggle-wrapper')) {
                    jsToggleWrapperArray.forEach(element => element.classList.remove('active'));
                }
            })
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


    const burger = document.querySelector('.burger'),
        headerNav = document.querySelector('.header__nav');

    if (burger && headerNav) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();

            burger.classList.toggle('burger--active');
            headerNav.classList.toggle('header__nav--active')
            document.body.classList.toggle('no-scroll');
        });

        const navLinkArray = document.querySelectorAll('.nav__link');

        if (navLinkArray.length) {
            navLinkArray.forEach(link => {
                link.addEventListener('click', () => {
                    burger.classList.remove('burger--active');
                    headerNav.classList.remove('header__nav--active');
                    document.body.classList.remove('no-scroll');
                });
            });
        }
    }

    const accountInputArray = document.querySelectorAll('.js-account-wrapper');

    if (accountInputArray.length) {
        accountInputArray.forEach(accountInput => {
            const accountInputButton = accountInput.querySelector('.js-account-button');
            accountInputButton.addEventListener('click', (e) => {
                e.preventDefault();

                accountInput.classList.toggle('active');
            })
        });
    }

    const passwordInputArray = document.querySelectorAll('.js-password-wrapper');

    if (passwordInputArray.length) {
        passwordInputArray.forEach(passwordElement => {
            const passwordLink = passwordElement.querySelector('.js-password-link'),
                passwordInput = passwordElement.querySelector('.js-password-input');

            passwordLink.addEventListener('click', (e) => {
                e.preventDefault();

                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                } else {
                    passwordInput.type = 'password'
                }
            })
        })
    }

    const loginInputArray = document.querySelectorAll('.login-input__item');

    if (loginInputArray.length) {
        const createError = (text = 'You entered incorrect data') => {
            const errorElement = document.createElement('div');
            errorElement.classList.add('login-input__error');
            errorElement.textContent = text;

            return errorElement;
        }
        loginInputArray.forEach(input => {
            const inputWrapper = input.closest('.login-input');
            input.addEventListener('change', (e) => {
                const oldError = inputWrapper.querySelector('.login-input__error');
                if (oldError) oldError.remove();

                if (input.checkValidity()) {
                    input.classList.add('login-input__item--success')
                } else {
                    inputWrapper.prepend(createError(input.dataset.error));
                }
            })
        })
    }

    const productFilter = document.querySelector('.product__filter');

    const headerHeight = document.querySelector('.header').getBoundingClientRect().height,
        footerHeight = document.querySelector('.footer').getBoundingClientRect().height;

    document.body.style.setProperty('--header-height', `${headerHeight}px`);
    document.body.style.setProperty('--footer-height', `${footerHeight}px`);


    if (productFilter) {
        const filterButton = document.querySelector('.filter-button'),
            filterClose = document.querySelector('.filter__close');

        document.addEventListener('click',(e)=>{
            if(!e.target.closest('.filter') && !e.target.closest('.filter-button')){
                productFilter.classList.remove('product__filter--active');
                filterButton.classList.remove('filter-button--active');
            }
        });

        if(filterButton){
            filterButton.addEventListener('click',(e)=>{
                e.preventDefault();

                productFilter.classList.toggle('product__filter--active');
                filterButton.classList.toggle('filter-button--active')
            });
        }

        if(filterClose){
            filterClose.addEventListener('click',(e)=>{
                e.preventDefault();

                productFilter.classList.remove('product__filter--active');
                filterButton.classList.remove('filter-button--active');
            });
        }
    }


    const filterBlockArray = document.querySelectorAll('.filter-block');

    if (filterBlockArray.length) {
        filterBlockArray.forEach(filterBlock => {
            const filterBlockHeader = filterBlock.querySelector('.filter-block__header');

            filterBlockHeader.addEventListener('click', (e) => {
                e.preventDefault();

                filterBlock.classList.toggle('filter-block--active');
            })
        });
    }

    const filterTypeArray = document.querySelectorAll('.filter-type');

    if (filterTypeArray.length) {
        filterTypeArray.forEach(filterType => {
            const filterTypeInput = filterType.querySelector('.filter-type__input');

            filterTypeInput.addEventListener('change', () => {
                filterTypeArray.forEach(input => {
                    const inputElement = input.querySelector('input');
                    if (inputElement.checked) {
                        input.classList.add('active')
                    } else {
                        input.classList.remove('active');
                    }
                })
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

            const rangeSliderElement = rangeSlider(rangeElement, {
                min: rangeMin,
                max: rangeMax,
                step: 1,
                value: [rangeMin, rangeMax],
                disabled: false,
                rangeSlideDisabled: false,
                thumbsDisabled: [false, false],
                orientation: 'horizontal',
                onInput: function (valueSet) {
                    rangeInputMin.value = valueSet[0];
                    rangeInputMax.value = valueSet[1];
                },
            });

            rangeInputMin.addEventListener('change', () => {
                rangeSliderElement.value([rangeInputMin.value, rangeInputMax.value])
            });
            rangeInputMax.addEventListener('change', () => {
                rangeSliderElement.value([rangeInputMin.value, rangeInputMax.value])
            });
        });
    }


    const horizontalScrollElementArray = document.querySelectorAll('.js-horizontal-scroll');

    if(horizontalScrollElementArray.length){
        horizontalScrollElementArray.forEach(element=>{
            element.addEventListener('wheel',(evt)=>{
                evt.preventDefault();
                element.scrollLeft += evt.deltaY;
            },{passive:true})
        })
    }

    const jsBoxButton = document.querySelector('.js-box-button'),
        jsBox = document.querySelector('.js-box');

    if(jsBox && jsBoxButton){
        jsBoxButton.addEventListener('click',(e)=>{
            e.preventDefault();

            jsBox.classList.add('box--active');
        })
    }
});