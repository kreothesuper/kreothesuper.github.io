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


document.addEventListener('DOMContentLoaded',()=>{
    initTabs();

    const burger = document.querySelector('.burger'),
        headerNav = document.querySelector('.header__nav');

    burger.addEventListener('click',(e)=>{
        e.preventDefault();

        burger.classList.toggle('burger--active')
        headerNav.classList.toggle('header__nav--active');
    })


    const gallerySlider = new Swiper('.gallery-slider', {
        centeredSlides:true,
        slidesPerView:'auto',
        spaceBetween:15,
        loop:true,
        breakpoints:{
            640:{
                spaceBetween:20,
            }
        }
    });


    const scanItemArray = document.querySelectorAll('.scan');

    if(scanItemArray.length){
        const setScanStyle = (scanBlock, scanItem) =>{
            scanBlock.style.setProperty('--top-offset',`-${scanBlock.offsetTop}px`);
            scanBlock.style.setProperty('--left-offset',`-${scanBlock.offsetLeft}px`);
            scanBlock.style.setProperty('--width',`${scanItem.getBoundingClientRect().width}px`);
            scanBlock.style.setProperty('--height',`${scanItem.getBoundingClientRect().height}px`);
        }
        scanItemArray.forEach(scanItem=>{
            const scanBlock = scanItem.querySelector('.scan-item');
            setScanStyle(scanBlock,scanItem);

            window.addEventListener('resize',()=>{
                setScanStyle(scanBlock,scanItem);
            })
        });
    }
});