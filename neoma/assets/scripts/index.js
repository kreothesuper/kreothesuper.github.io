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
                selectLabelIcon = document.createElement('span');

            const selectItemArray = [];

            selectWrapper.classList.add('select__wrapper');

            selectLabel.classList.add('select__label');
            selectLabelIcon.classList.add('icon');
            selectLabelSpan.classList.add('select__name');

            selectLabelSpan.textContent = selectTag[selectTag.selectedIndex].textContent;
            selectLabel.append(selectLabelSpan);
            selectLabel.append(selectLabelIcon)

            if (selectTag[selectTag.selectedIndex].hidden) {
                selectLabel.classList.add('select__label--disabled')
            } else {
                selectLabel.classList.remove('select__label--disabled')
            }

            selectItemList.classList.add('select__content', 'select__content--hidden')

            selectWrapper.append(selectLabel);
            element.append(selectWrapper);

            selectOption.forEach((element, index) => {
                const selectItem = document.createElement('div');
                const selectSpan = document.createElement('span');

                selectItem.classList.add('select__item');
                selectSpan.textContent = element.textContent;

                selectItem.append(selectSpan);

                if (element.hidden) {
                    selectItem.classList.add('select__item--disabled');
                }

                // Check if the delegated event is triggered properly
                selectItem.addEventListener('click', (e) => {
                    const selectItemTag = e.target.closest('.select').querySelector('select'),
                        selectItemOptions = selectItemTag.querySelectorAll('option'),
                        selectItems = e.target.closest('.select').querySelectorAll('.select__item');


                    selectItemOptions.forEach((element, index) => {
                        if (element.textContent === selectItem.textContent) {
                            selectItemTag.selectedIndex = index;
                            selectLabelSpan.textContent = element.textContent;


                            selectItems.forEach((item, itemIndex) => {
                                if (itemIndex === index) {
                                    item.classList.add('select__item--hidden')
                                } else {
                                    item.classList.remove('select__item--hidden');
                                }
                            });

                            // Trigger change event when selectIndex is changed
                            const event = new Event('change', {bubbles: true});
                            selectItemTag.dispatchEvent(event);
                        }
                    });
                    selectLabel.click();
                });

                selectItemArray.push(selectItem);
                const selectItems = selectItemList.querySelectorAll('.select__item');
                selectItems.forEach((item, itemIndex) => {
                    if (itemIndex === selectTag.selectedIndex) {
                        item.classList.add('select__item--hidden');
                    } else {
                        item.classList.remove('select__item--hidden');
                    }
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
                element.classList.toggle('select--active');
            });

            selectTag.addEventListener('change', () => {
                const selectItemOptions = selectTag.options,
                    selectedItem = selectItemOptions[selectTag.selectedIndex];

                selectLabelSpan.textContent = selectedItem.textContent;
                if (selectedItem.hidden) {
                    selectLabel.classList.add('select__label--disabled')
                } else {
                    selectLabel.classList.remove('select__label--disabled')

                }
            })
            selectTag.addEventListener('reset', () => {
                const selectItemOptions = selectTag.options,
                    selectedItem = selectItemOptions[0];

                selectLabelSpan.textContent = selectedItem.textContent;
                if (selectedItem.hidden) {
                    selectLabel.classList.add('select__label--disabled')
                } else {
                    selectLabel.classList.remove('select__label--disabled')

                }
            })
        });

        document.addEventListener('click', closeAllSelect);
    }
}

const closeAllSelect = (select) => {
    const selectContentArray = document.querySelectorAll('.select__content'),
        selectLabelArray = document.querySelectorAll('.select__label');

    selectLabelArray.forEach((element, index) => {
        element !== select ? (element.classList.remove('select--active'), selectContentArray[index].classList.add('select__content--hidden')) : null;
    });
}

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

    selectInit();

    const reviewSlider = document.querySelector('.review-slider');

    if(reviewSlider){
        const review = new Swiper(reviewSlider,{
            slidesPerView:1,
            spaceBetween:20,
            speed:500,
            breakpoints:{
                768:{
                    slidesPerView:3,
                }
            },
            navigation: {
                nextEl: '.review-slider__button--next',
                prevEl: '.review-slider__button--prev',
              },
        });
    }
});