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

    const burger = document.querySelector('.burger');
    const aside = document.querySelector('.aside');

    if (burger && aside) {
        burger.addEventListener('click',(e)=>{
            e.preventDefault();

            burger.classList.toggle('burger--active');
            aside.classList.toggle('aside--active');
        });
    }

    const filter = document.querySelector('.filter');

    if(filter){
        filter.addEventListener('click',(e)=>{
            if(e.target.classList.contains('filter__link') || e.target.classList.contains('filter')){
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

});