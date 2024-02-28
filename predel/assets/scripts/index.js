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


const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup__wrapper') ||
        event.key === 'Escape' ||
        event.target.closest('.popup__close')
    ) {
        event.preventDefault();
        hideAllPopups();
    }
};

const getCurrentDate = () => {
    const currentDate = new Date();
    let day = currentDate.getDate(),
        month = currentDate.getMonth() + 1,
        year = currentDate.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return `${day}.${month}.${year}`;
}


class Animations {
    constructor() {
        this.animationWrapperArray = document.querySelectorAll('.animation-wrapper');
    }

    toggleAnimation(animationWrapperElement) {
        const animationItemArray = animationWrapperElement.querySelectorAll('.animation-item');
        animationItemArray.forEach((animationItemElement, animationItemIndex) => {
            animationItemElement.style.animationDelay = `${animationItemIndex * 0.2}s`;
            animationItemElement.classList.toggle('animation-item--animated');
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            const animationItemArray = entry.target.querySelectorAll('.animation-item');
            if (entry.isIntersecting) {
                animationItemArray.forEach((animationItemElement, animationItemIndex) => {
                    animationItemElement.classList.add('visible');
                });
            } else {
                animationItemArray.forEach((animationItemElement, animationItemIndex) => {
                    animationItemElement.classList.remove('visible');
                });
            }
        });
    }

    init() {
        if (!this.animationWrapperArray.length) return;

        const observer = new IntersectionObserver(this.handleIntersection.bind(this), {});
        this.animationWrapperArray.forEach(animationWrapper => {
            observer.observe(animationWrapper);
        });
    }
}

const centerElementVertically = (element) => {
    const parentHeight = element.parentNode.clientHeight;
    const elementHeight = element.querySelector('.popup__container').clientHeight;

    console.log(element.querySelector('.popup__container').getBoundingClientRect().height,)
    const topMargin = (parentHeight - elementHeight) / 2;
    return `${0}px`
}

const showPopup = popupId => {
    const popup = document.querySelector(popupId);
    if (!popup) return

    hideAllPopups();

    popup.style.setProperty('--popup-margin', `${centerElementVertically(popup)}`)

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
    initTabs();

    //animation init
    const animation = new Animations();
    animation.init();

    const burger = document.querySelector('.burger'),
        headerNav = document.querySelector('.header__nav');

    burger.addEventListener('click', (e) => {
        e.preventDefault();

        burger.classList.toggle('burger--active')
        headerNav.classList.toggle('header__nav--active');
    })


    const gallerySlider = new Swiper('.gallery-slider', {
        spaceBetween: 15,
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
                spaceBetween: 20
            }
        }
    });


    const scanItemArray = document.querySelectorAll('.scan');

    if (scanItemArray.length) {
        const setScanStyle = (scanBlock, scanItem) => {
            scanBlock.style.setProperty('--top-offset', `-${scanBlock.offsetTop}px`);
            scanBlock.style.setProperty('--left-offset', `-${scanBlock.offsetLeft}px`);
            scanBlock.style.setProperty('--width', `${scanItem.getBoundingClientRect().width}px`);
            scanBlock.style.setProperty('--height', `${scanItem.getBoundingClientRect().height}px`);
        }
        scanItemArray.forEach(scanItem => {
            const scanBlock = scanItem.querySelector('.scan-item');
            setScanStyle(scanBlock, scanItem);

            window.addEventListener('resize', () => {
                setScanStyle(scanBlock, scanItem);
            })
        });
    }

    const jsFileArray = document.querySelectorAll('.js-file');

    if (jsFileArray.length) {
        jsFileArray.forEach(file => {
            const fileInput = file.querySelector('.js-file-input'),
                fileImg = file.querySelector('.js-file-img'),
                fileName = file.querySelector('.js-file-name');


            fileInput.addEventListener('change', () => {
                const file = fileInput.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    fileImg.src = event.target.result
                }
                reader.readAsDataURL(file);
                fileName.innerHTML = file.name;
            })
        });
    }

    const formArray = document.querySelectorAll('.form');

    if (formArray.length) {
        formArray.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                showPopup('.popup-thanks')
            });
        });
    }


    // popup init
    const popupButtons = document.querySelectorAll('[data-popup]');
    const popups = document.querySelectorAll('.popup');

    if (popups.length && popupButtons.length) {
        popupButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const popupId = button.dataset.popup
                showPopup(popupId);
            });
        });
    }

    const dateArray = document.querySelectorAll('.js-date');

    if (dateArray.length) {
        const currentDate = getCurrentDate();
        dateArray.forEach(date => {
            date.innerHTML = currentDate;
        })
    }
});