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


const initTabs = () => {
    const tabs = [...document.querySelectorAll(".tabs")];

    if (tabs.length > 0) {
        tabs.forEach((tab) => {
            const tabContent = [...tab.querySelectorAll(".tabs-content__item")];
            const tabLinks = [...tab.querySelectorAll(".tabs-nav__item:not(.tabs-nav__item--all)")],
                tabAllLink = tab.querySelector('.tabs-nav__item--all');

            const openTab = (tabIndex = 0) => {
                if(tabIndex === 'all'){
                    tabContent.forEach((element, i) => {
                        element.classList.add("tabs-content__item--active");
                    });
                    tabLinks.forEach((element, i) => {
                        element.classList.remove("tabs-nav__item--active");
                    });
                    tabAllLink.classList.add('tabs-nav__item--active');
                }else{
                    tabContent.forEach((element, i) => {
                        const isActive = i === tabIndex;
                        element.classList.toggle("tabs-content__item--active", isActive);
                    });
    
                    tabLinks.forEach((element, i) => {
                        element.classList.toggle("tabs-nav__item--active", i === tabIndex);
                        tabAllLink.classList.remove('tabs-nav__item--active');
                    });
                }
            }

            openTab('all');

            tabLinks.forEach((link, i) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    openTab(i);
                });
            });

            tabAllLink.addEventListener('click',(e)=>{
                e.preventDefault();

                openTab('all');
            });
        });
    }
}


document.addEventListener("DOMContentLoaded", () => {
    initTabs();

    const expandedArray = document.querySelectorAll('.expanded');

    if (expandedArray.length) {
        expandedArray.forEach(expanded => {
            const expandedLink = expanded.querySelector('.expanded-link'),
                expandedBlock = expanded.querySelector('.expanded-block');

            expandedLink.addEventListener('click', (e) => {
                e.preventDefault();

                expandedBlock.classList.toggle('active');
                expandedLink.classList.toggle('active');
            });
        });
    }

    const cardArray = document.querySelectorAll('.card');

    if(cardArray.length){
        cardArray.forEach(card=>{
            card.addEventListener('click',(e)=>{
                e.preventDefault();

                const categoryBlock = card.closest('[data-name]');

                if(categoryBlock) showPopup(`.popup-${categoryBlock.dataset.name}`)
            });
        })
    }
});