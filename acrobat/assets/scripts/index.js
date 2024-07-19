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

            openTab(1)

            tabLinks.forEach((link, i) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    openTab(i);
                });
            });
        });
    }
}


const closeAllSelect = (select) => {
    const selectContentArray = document.querySelectorAll('.select__content'),
        selectLabelArray = document.querySelectorAll('.select__label');

    selectLabelArray.forEach((element, index) => {
        // element !== select ? (element.classList.remove('select__label--active'), selectContentArray[index].classList.add('select__content--hidden')) : null;
    });
}

const copyText = (text) => {
    const tempElement = document.createElement("textarea");
    tempElement.value = text;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);
}

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

    const pageWrapper = document.querySelector('body'),
        popupGroup = document.querySelector('.popup-group');

    hideAllPopups();

    popup.classList.add('popup--active');
    pageWrapper.classList.add('no-scroll');

    if (popupGroup) popupGroup.classList.add('popup-group--active')

    document.addEventListener('click', checkTargetOrKey);
    document.addEventListener('keyup', checkTargetOrKey);
};

const hideAllPopups = () => {
    const popups = document.querySelectorAll('.popup'),
        pageWrapper = document.querySelector('body'),
        popupGroup = document.querySelector('.popup-group');

    popups.forEach(popup => {
        popup.classList.remove('popup--active');
    });
    pageWrapper.classList.remove('no-scroll');

    if (popupGroup) popupGroup.classList.remove('popup-group--active');


    document.removeEventListener('click', checkTargetOrKey);
    document.removeEventListener('keyup', checkTargetOrKey);
};

document.addEventListener('DOMContentLoaded', () => {
    const __sliderPaginationParams = {
        el: '.slider-pagination',
        hiddenClass: 'slider-pagination--hidden',
        bulletClass: 'slider-pagination__bullet',
        bulletActiveClass: 'slider-pagination__bullet--active',
        lockClass: 'slider-pagination--lock'
    }

    const photoSlider = new Swiper('.photo-slider', {
        slidesPerView: 'auto',
        spaceBetween: 5,
        speed: 500,
        freeMode: true,
        pagination: __sliderPaginationParams,
    });

   

    const partnersSlider = new Swiper('.partners-slider__swiper', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        speed: 500,
        loop: true,
        navigation: {
            prevEl: '.partners-slider__button--prev',
            nextEl: '.partners-slider__button--next',
        },
        
    });

    const postsSlider = new Swiper('.posts-slider', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        speed: 500,
        navigation: {
            prevEl: '.posts-slider__button--prev',
            nextEl: '.posts-slider__button--next',
        },
        pagination: __sliderPaginationParams,
 
        
    });
   
    const popupButtons = document.querySelectorAll('[data-popup]');
    const popups = document.querySelectorAll('.popup');

    if (popups.length) {
        popupButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const popupId = button.dataset.popup
                showPopup(popupId);

                if(popupId === '.popup-image' && document.querySelector('.popup-image__item')){
                    document.querySelector('.popup-image__item').src = button.dataset.popupSrc;
                }
            });
        });
    }

    const burger = document.querySelector('.burger');
    const aside = document.querySelector('.aside');

    if (burger && aside) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();

            burger.classList.toggle('burger--active');
            aside.classList.toggle('aside--active');
        });
    }

    const filter = document.querySelector('.filter');

    if (filter) {
        filter.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter__link') || e.target.classList.contains('filter')) {
                e.preventDefault();
                filter.classList.toggle('filter--active');
            }
        });
    }


    // gallery slider
    const galleryArray = document.querySelectorAll('.gallery');
    if (galleryArray.length) {
        const galleryPopup = document.createElement('div'),
            galleryWrapper = document.createElement('div'),
            galleryContainer = document.createElement('div'),
            galleryContent = document.createElement('div'),
            galleryButtonNext = document.createElement('div'),
            galleryButtonPrev = document.createElement('div'),
            galleryClose = document.createElement('div');

        galleryPopup.classList.add('popup', 'popup-gallery');
        galleryWrapper.classList.add('popup__wrapper');
        galleryContainer.classList.add('popup__container');
        galleryContent.classList.add('popup__content');

        galleryButtonNext.classList.add('popup__button', 'popup__button--next');
        galleryButtonPrev.classList.add('popup__button', 'popup__button--prev');
        galleryClose.classList.add('popup__close', 'popup-close');


        galleryContainer.append(galleryButtonPrev);
        galleryContainer.append(galleryContent);
        galleryContainer.append(galleryButtonNext);
        galleryContainer.append(galleryClose);

        galleryPopup.append(galleryWrapper);
        galleryContainer.append(galleryContent);
        galleryWrapper.append(galleryContainer);
        galleryPopup.append(galleryWrapper);

        document.body.append(galleryPopup);

        const createGalleryBlock = (tag = 'img', source) => {
            const galleryBlock = document.createElement(tag);
            galleryBlock.setAttribute('src', source);
            galleryBlock.setAttribute('autoplay', '');
            galleryBlock.setAttribute('controls', '');


            return galleryBlock;
        }

        const changeGallerySlide = (value) => {
            const galleryName = galleryPopup.dataset.name,
                galleryItemIndex = galleryPopup.dataset.index;

            const galleryBlock = document.querySelector(`[data-gallery=${galleryName}]`);
            if (!galleryBlock) return false;

            const galleryBlockItems = galleryBlock.querySelectorAll('.gallery-item');
            if (!galleryBlockItems.length) return false;

            const newValue = +galleryItemIndex + value;

            if (newValue < 0 || newValue > galleryBlockItems.length - 1) return false;

            galleryContent.innerHTML = '';
            galleryContent.append(createGalleryBlock(galleryBlockItems[newValue].dataset.tag, galleryBlockItems[newValue].getAttribute('href')))

            galleryPopup.dataset.index = newValue;
        }

        galleryButtonNext.addEventListener('click', (e) => {
            e.preventDefault();
            changeGallerySlide(1)
        });
        galleryButtonPrev.addEventListener('click', (e) => {
            e.preventDefault();
            changeGallerySlide(-1)
        });

        galleryArray.forEach(gallery => {
            const galleryItemArray = gallery.querySelectorAll('.gallery-item');
            if (galleryArray.length) {
                galleryItemArray.forEach((galleryItem, galleryIndex) => {
                    galleryItem.addEventListener('click', (e) => {
                        e.preventDefault();

                        galleryContent.innerHTML = '';
                        galleryContent.append(createGalleryBlock(galleryItem.dataset.tag, galleryItem.getAttribute('href')));
                        galleryPopup.dataset.index = `${galleryIndex}`;
                        galleryPopup.dataset.name = `${gallery.dataset.gallery}`;
                        showPopup('.popup-gallery');
                    })
                });
            }
        });
    }


    const editorBlockArray = document.querySelectorAll('.js-editor');

    if (editorBlockArray.length) {
        editorBlockArray.forEach(editorBlock => {
            const editorLinkArray = editorBlock.querySelectorAll('.js-editor-link');
            const formMessage = editorBlock.querySelector('.form-message');

            editorLinkArray.forEach(editorLink => {
                editorLink.addEventListener('click', (e) => {
                    e.preventDefault();

                    editorBlock.classList.toggle('active');
                });
            });

            editorBlock.addEventListener('submit', (e) => {
                e.preventDefault();

                editorBlock.classList.remove('active');
                if (formMessage) {
                    formMessage.classList.add('form-message--success');
                    setTimeout(() => {
                        formMessage.classList.remove('form-message--success');
                    }, 1000)
                }
            });
        });
    }

    selectInit();

    initTabs();

    const copyArray = document.querySelectorAll('.copy');

    if (copyArray.length) {
        copyArray.forEach(copy => {
            const copyText = copy.querySelector('.copy-text').textContent.trim().replace(/\s+/g, ' ');
            const copyLink = copy.querySelector('.copy__link');
            const copySuccess = copy.querySelector('.form-message');

            copyLink.addEventListener('click', (e) => {
                e.preventDefault();

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(copyText).then(() => {
                    });
                } else {
                    copyText(copyText);
                }

                if (copySuccess) {
                    copySuccess.classList.add('form-message--success');
                    setTimeout(() => {
                        copySuccess.classList.remove('form-message--success');
                    }, 1000)
                }

            });
        });
    }

    const listArray = document.querySelectorAll('.js-list');

    if (listArray.length) {
        listArray.forEach(list => {
            const listChildArray = list.querySelectorAll('li');
            const listLimit = list.dataset.count || 3;

            if (listChildArray.length) {
                if (listChildArray.length >= listLimit + 1) {
                    const cloneElement = listChildArray[0].cloneNode();
                    cloneElement.dataset.linkText = `еще ${listChildArray.length - listLimit + 1}`;
                    cloneElement.classList.add('link');
                    list.append(cloneElement);

                    cloneElement.addEventListener('click', (e) => {
                        e.preventDefault();
                        list.classList.toggle('active');
                    });

                    listChildArray.forEach((listChild, listChildIndex) => {
                        if (listChildIndex >= listLimit - 1) {
                            listChild.classList.add('hidden');
                        }
                    });
                }
            }
        });
    }

    const adminFilterArray = document.querySelectorAll('.admin-filter');

    if (adminFilterArray.length) {
        function isAnyInputFilled(inputs) {
            for (let input of inputs) {
                console.log(input.tagName)
                if ((input.type === 'checkbox' || input.type === 'radio') && input.checked) {
                    return true;
                } else if (input.tagName === 'SELECT' && input.value !== '') {
                    return true;
                } else if (input.tagName === 'INPUT' && input.value.trim() !== '') {
                    return true;
                } else if (input.tagName === 'TEXTAREA' && input.value.trim() !== '') {
                    return true;
                }
            }
            return false;
        }

        adminFilterArray.forEach(adminFilter => {
            const inputs = adminFilter.querySelectorAll('input, select');
            const submit = adminFilter.querySelector("[type='submit']");

            isAnyInputFilled(inputs) ? submit.classList.remove('button--disabled') : submit.classList.add('button--disabled');

            adminFilter.addEventListener('change', () => {
                isAnyInputFilled(inputs) ? submit.classList.remove('button--disabled') : submit.classList.add('button--disabled');
            })


            adminFilter.addEventListener('reset', () => {
                const selectArray = adminFilter.querySelectorAll('select');

                if (selectArray.length) {
                    selectArray.forEach(select => {
                        const event = new Event('reset', {bubbles: true});
                        select.dispatchEvent(event);
                    });
                }
            })
        });
    }


    function calcHeight(value) {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        return numberOfLineBreaks;
    }

    let textareaArray = document.querySelectorAll(".js-resize-input");
    if (textareaArray.length) {
        textareaArray.forEach(textarea => {
            textarea.style.setProperty('--input-height', `${calcHeight(textarea.value)}px`)
            textarea.addEventListener("keyup", () => {
                textarea.style.setProperty('--input-height', `${calcHeight(textarea.value)}px`)
            });
        });
    }


    const tableExpandArray = document.querySelectorAll('.js-table-expanded');

    if (tableExpandArray.length) {
        tableExpandArray.forEach(table => {
            const tableLink = table.querySelector('.js-table-expanded-link');

            tableLink.addEventListener('click', (e) => {
                e.preventDefault();

                table.classList.toggle('active');
            });
        });
    }

    const fileArray = document.querySelectorAll('.js-file');

    if(fileArray.length){
        const getFileName =  (fileInput,fileLabel,fileDownload,file) =>{
            const fileList = fileInput.files[0];
            if(fileList){
                const fileName = fileList.name;
                fileLabel.textContent = fileName;
                file.classList.remove('empty')

                if(fileDownload){
                    const fileURL = URL.createObjectURL(fileList);
                    fileDownload.href = fileURL;
                }
            }
        }
        fileArray.forEach(file=>{
            const fileInput = file.querySelector('.js-file-input'),
                fileLabel = file.querySelector('.js-file-label'),
                fileReset = file.querySelector('.js-file-reset'),
                fileDownload = file.querySelector('.js-file-download');

            if(fileInput){
                file.classList.add('empty')
                getFileName(fileInput,fileLabel,fileDownload,file);
                fileInput.addEventListener('change', function() {
                    getFileName(fileInput,fileLabel,fileDownload,file);
                });
                if(fileReset){
                    fileReset.addEventListener('click',(e)=>{
                        e.preventDefault();
                        file.classList.add('empty')
                        fileLabel.textContent = "загрузите файл";
                    });
                }
            }
        });
    }

    const asideButton = document.querySelector('.aside__button');
    const asideElement = document.querySelector('.aside');

    if (asideButton && asideElement) {
        asideButton.addEventListener('click', (e) => {
            e.preventDefault();

            asideElement.classList.toggle('hidden');
        });
    }
});