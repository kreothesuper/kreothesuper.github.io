const setTranslate = (positionY, parallaxItem) => {
    parallaxItem.style.transform = "translate3d(0, " + positionY + "px, 0)";
}

const scrollLoop = (scrollTop, parallaxItems, scrollSpeed = 1) => {
    let yScrollPosition = scrollTop * scrollSpeed;
    parallaxItems.forEach(parallaxElement => {
        const parallaxElementCoefficient = +parallaxElement.dataset.coefficient;
        setTranslate(yScrollPosition * -parallaxElementCoefficient, parallaxElement);
    });
}

const findParallaxIndex = (el) => {
    const parallaxArray = [...document.querySelectorAll('.parallax')];

    return parallaxArray.indexOf(el);
}

var PIXEL_STEP  = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = document.body.clientHeight;

function normalizeWheel(/*object*/ event) {
    var sX = 0, sY = 0,       // spinX, spinY
        pX = 0, pY = 0;       // pixelX, pixelY

    // Legacy
    if ('detail'      in event) { sY = event.detail; }
    if ('wheelDelta'  in event) { sY = -event.wheelDelta / 120; }
    if ('wheelDeltaY' in event) { sY = -event.wheelDeltaY / 120; }
    if ('wheelDeltaX' in event) { sX = -event.wheelDeltaX / 120; }

    // side scrolling on FF with DOMMouseScroll
    if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
        sX = sY;
        sY = 0;
    }

    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;

    if ('deltaY' in event) { pY = event.deltaY; }
    if ('deltaX' in event) { pX = event.deltaX; }

    if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode == 1) {          // delta in LINE units
            pX *= LINE_HEIGHT;
            pY *= LINE_HEIGHT;
        } else {                             // delta in PAGE units
            pX *= PAGE_HEIGHT;
            pY *= PAGE_HEIGHT;
        }
    }

    // Fall-back if spin cannot be determined
    if (pX && !sX) { sX = (pX < 1) ? -1 : 1; }
    if (pY && !sY) { sY = (pY < 1) ? -1 : 1; }

    return pY;
}

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};


const createSearchResultBlock = (data, type = 'text', position = 'left') => {
    const __searchResultBlockClass = 'search-result__block',
        searchResultBlock = document.createElement('div');

    searchResultBlock.classList.add(__searchResultBlockClass);

    if (type === 'text') {
        searchResultBlock.append(createSearchResultText(data, position));
    }
    if (type === 'img') {
        searchResultBlock.append(createSearchResultImg(data));
    }
    if (type === 'link') {
        searchResultBlock.append(data);
    }

    return searchResultBlock
}

const createSearchResultImg = (data) => {
    const __searchResultImgClass = 'search-result__img',
        searchResultImg = document.createElement('div'),
        searchResultImgItem = document.createElement('img');

    searchResultImg.classList.add(__searchResultImgClass);
    searchResultImgItem.classList.add(`${__searchResultImgClass}-item`);
    searchResultImgItem.src = data;

    searchResultImg.append(searchResultImgItem)

    return searchResultImg;
}

const createSearchResultText = (data, position) => {
    const __searchResultTextClass = 'search-result__text',
        searchResultText = document.createElement('p'),
        searchResultLabel = document.createElement('span');

    const positionClass = position === 'center' ? `${__searchResultTextClass}_position-center` : `${__searchResultTextClass}_position-left`;

    searchResultText.classList.add(__searchResultTextClass, positionClass);
    searchResultLabel.innerHTML = data;
    searchResultText.append(searchResultLabel);

    return searchResultText;
}

const createSearchResultLink = (data) => {
    const __searchResultLinkClass = 'search-result__link',
        searchResultLink = document.createElement('a');

    searchResultLink.classList.add(__searchResultLinkClass);
    searchResultLink.href = `https://www.wildberries.ru/catalog/${data}/detail.aspx?targetUrl=XS`;
    searchResultLink.innerHTML = data;

    return searchResultLink;
}

const createSearchResultTitle = (data) => {
    const __searchResultTitleClass = 'search-result__title',
        searchResultTitle = document.createElement('span');

    searchResultTitle.classList.add(__searchResultTitleClass);
    searchResultTitle.innerHTML = data;

    return searchResultTitle;
}

const filterCategory = (data, index) => {
    let elementTitle = null
    data.forEach(element => {
        if (element.site_id === index) elementTitle = element.title;
    })
    return elementTitle;
}

const createSearchResult = (parentBlock, data, type = 'desktop') => {

    clearSearch();

    const searchFooter = document.querySelector('.search__footer');

    searchFooter.classList.add('active');

    data.pages.forEach(pageElement => {
        if (type === 'desktop') {
            const __searchResultRowClass = 'search-result__row';
            const searchResultPageRow = document.createElement('div');
            searchResultPageRow.classList.add(__searchResultRowClass, `${__searchResultRowClass}_size-full`, `${__searchResultRowClass}_size-small`);

            const searchResultPageBlock = createSearchResultBlock(`Страница выдачи Wildberries №${pageElement.page_num}`, 'text');

            searchResultPageRow.append(searchResultPageBlock);

            parentBlock.append(searchResultPageRow)

            pageElement.products.forEach(product => {
                const searchResultRow = document.createElement('div');
                searchResultRow.classList.add(__searchResultRowClass);

                const searchResultTitleLink = createSearchResultLink(product.nm),
                    searchResultTitleLabel = createSearchResultText(` / ${product.title}`);
                searchResultTitleLabel.prepend(searchResultTitleLink)

                searchResultRow.append(createSearchResultBlock(`${product.position} позиция`, 'text', 'center'));
                searchResultRow.append(createSearchResultBlock(`${product.photo}`, 'img'));
                searchResultRow.append(createSearchResultBlock(searchResultTitleLabel, 'link'));
                searchResultRow.append(createSearchResultBlock(`${product.cpm} &#8381`));
                searchResultRow.append(createSearchResultBlock(`${product.subject} - ${filterCategory(data.subjects, product.subject)}`));
                searchResultRow.append(createSearchResultBlock(`${product.delivery_time}ч`));

                parentBlock.append(searchResultRow);
            });
        } else {
            pageElement.products.forEach(product => {
                const searchSlide = document.createElement('div'),
                    searchResult = document.createElement('div'),
                    searchResultWrapper = document.createElement('div'),
                    searchResultContent = document.createElement('div');

                searchSlide.classList.add('swiper-slide');
                searchResult.classList.add('search-result');
                searchResultWrapper.classList.add('search-result__wrapper');
                searchResultContent.classList.add('search-result__content');

                searchResult.append(searchResultWrapper);
                searchSlide.append(searchResult);

                searchResultWrapper.append(createSearchResultImg(`${product.photo}`));

                const searchResultPageBlock = createSearchResultBlock(`Страница выдачи Wildberries №${pageElement.page_num}`, 'text');

                searchResultContent.append(searchResultPageBlock);

                const searchResultTitleTitle = createSearchResultTitle('Артикул/Наименование:'),
                    searchResultTitleVendor = createSearchResultLink(product.nm),
                    searchResultTitleLabel = createSearchResultText(` / ${product.title}`);

                searchResultTitleLabel.querySelector('span').prepend(searchResultTitleVendor);
                searchResultTitleLabel.prepend(searchResultTitleTitle);
                searchResultContent.append(createSearchResultBlock(searchResultTitleLabel, 'link'));

                const searchResultPositionLabel = createSearchResultText(`${product.position} позиция`),
                    searchResultPositionTitle = createSearchResultTitle('Позиция:');

                searchResultPositionLabel.prepend(searchResultPositionTitle);
                searchResultContent.append(createSearchResultBlock(searchResultPositionLabel, 'link'));

                const searchResultPriceLabel = createSearchResultText(`${product.cpm} &#8381`),
                    searchResultPriceTitle = createSearchResultTitle(`Реальная ставка:`);

                searchResultPriceLabel.prepend(searchResultPriceTitle);
                searchResultContent.append(createSearchResultBlock(searchResultPriceLabel, 'link'));

                const searchResultCategoryLabel = createSearchResultText(`${product.subject} - ${filterCategory(data.subjects, product.subject)}`),
                    searchResultCategoryTitle = createSearchResultTitle(`ID категории:`);

                searchResultCategoryLabel.prepend(searchResultCategoryTitle);
                searchResultContent.append(createSearchResultBlock(searchResultCategoryLabel, 'link'));

                const searchResultTimeLabel = createSearchResultText(`${product.delivery_time}ч`),
                    searchResultTimeTitle = createSearchResultTitle(`Время доставки: `);

                searchResultTimeLabel.prepend(searchResultTimeTitle);
                searchResultContent.append(createSearchResultBlock(searchResultTimeLabel, 'link'));

                searchResultWrapper.append(searchResultContent);

                parentBlock.append(searchSlide);
            });
        }
    });
};


const searchResultInit = (data) => {

    clearSearch();

    const searchResult = document.querySelector('.search__box'),
        searchBoxContent = searchResult.querySelector('.search__box-content');

    if (window.innerWidth > 1200) {
        const searchBlock = document.querySelector('.search-result-desktop'),
            searchBlockContent = searchBlock.querySelector('.search-result-content');

        createSearchResult(searchBlockContent, data);
    } else {
        const searchBlock = document.querySelector('.search-result-mobile'),
            searchBlockContent = searchBlock.querySelector('.swiper-wrapper');

        createSearchResult(searchBlockContent, data, 'mobile')
    }

    searchBoxContent.classList.add('active');
}

const apiRequest = (keywordSearch) => {

    clearSearch();
    const searchResult = document.querySelector('.search__box'),
        searchStatus = searchResult.querySelector('.search__status'),
        searchSpinner = createSpinner(),
        searchError = createSearchResultBlock('По вашему запроса результатов не найдено. Попробуйте снова', 'text', 'center');

    searchStatus.prepend(searchSpinner);

    const api_url = 'https://wbads.topseller.ru/advert/wb_info_by_keyword/',
        api_options = {
            method: "POST",
            mode: 'cors',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({keyword: keywordSearch}),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        };

    fetch(api_url, api_options)
        .then(data => {
            if (!data.ok) {
                clearSearch();
                searchStatus.append(searchError);
            }
            return data.json()
        })
        .then((json) => {
            clearSearch();
            searchResultInit(json, searchStatus)
        })
        .catch((error) => {
            clearSearch();
            searchStatus.append(searchError);
        });
};

const clearSearch = () => {

    const searchResult = document.querySelector('.search__box'),
        searchBoxContent = searchResult.querySelector('.search__box-content'),
        searchStatus = searchResult.querySelector('.search__status'),
        searchBlockMobile = searchResult.querySelector('.search-result-mobile .swiper-wrapper'),
        searchBlockDesktop = document.querySelector('.search-result-desktop .search-result-content');

    searchBoxContent.classList.remove('active');
    removeChilds(searchStatus);
    removeChilds(searchBlockDesktop);
    removeChilds(searchBlockMobile);
};

const createSpinner = () => {
    const spinner = document.createElement('div'),
        spinnerWrapper = document.createElement('div');

    spinner.classList.add('spinner');
    spinnerWrapper.classList.add('spinner__wrapper');

    for (let i = 0; i < 9; i++) {
        const spinnerItem = document.createElement('div');
        spinnerItem.classList.add('spinner__item');

        spinnerWrapper.append(spinnerItem);
    }

    spinner.append(spinnerWrapper);

    return spinner;
}

document.addEventListener('DOMContentLoaded', () => {
    // SLIDERS INITS
    const advantagesSlider = new Swiper(".advantages", {
            slidesPerView: 'auto',
            freeMode: false,
            scrollbar: {
                el: ".advantages-scrollbar",
            },
            mousewheel: {
                invert: false,
            },
            breakpoints: {
                1100: {
                    slidesPerView: 'auto',
                }
            }
        }),
        searchSlider = new Swiper(".search-slider", {
            slidesPerView: 1,
            freeMode: false,
            scrollbar: {
                el: ".search-slider-scrollbar",
            },
            breakpoints: {
                600: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                }
            }
        });

    if (window.innerWidth <= 991) {
        const tariffsSlider = new Swiper(".tariffs", {
            slidesPerView: 'auto',
            freeMode: false,
            spaceBetween: 30,
            scrollbar: {
                el: ".tariffs-scrollbar",
            },
            breakpoints: {
                991: {
                    spaceBetween: 0
                }
            }
        });
    }

    if (window.innerWidth <= 1420) {
        const statisticsSlider = new Swiper(".statistics", {
            slidesPerView: 'auto',
            freeMode: false,
            spaceBetween: 15,
            scrollbar: {
                el: ".statistics-scrollbar",
            },
            mousewheel: {
                invert: false,
            },
        });
    }

    // HEADER SETTINGS
    const header = document.querySelector('.header');

    let lastScrollTop = window.pageYOffset || document.scrollTop;

    document.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollTop > lastScrollTop && scrollTop > header.clientHeight ? header.classList.add('hidden') : header.classList.remove('hidden');
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // POPUP || MENU SETTINGS
    const popup = document.querySelector('.popup');

    if (popup) {
        const popupTriggers = document.querySelectorAll('*[data-popup]'),
            popupClose = document.querySelectorAll('.popup-close');

        popupTriggers.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();

                const popup = document.querySelector(`.${element.dataset.popup}`);
                popup.classList.add('active');
            });
        });

        popupClose.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();

                const popup = element.closest('.popup');
                popup.classList.remove('active');
            });
        });
    }


    // CIRCLE PIE SETTINGS
    const pie = document.querySelector('.pie');

    if (pie) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = new CircularProgressBar("pie");
                    circle.initial();

                    observer.unobserve(pie);
                }
            })
        }, {threshold: 0.5});
        observer.observe(pie);
    }


    // PARALLAX SETTINGS
    const parallaxItems = document.querySelectorAll('.parallax'),
        dataAnchorLinks = document.querySelectorAll('*[data-anchor]');

    if (dataAnchorLinks.length > 0) {
        dataAnchorLinks.forEach(element => {
            const anchorBlock = document.querySelector(`.${element.dataset.anchor}`);
            let dataHeight = 0,
                parallaxIndex = findParallaxIndex(anchorBlock);

            parallaxItems.forEach((elementParallax, indexParallax) => {
                indexParallax < parallaxIndex ? dataHeight += elementParallax.clientHeight : null;
            });

            element.dataset.height = dataHeight;

            element.dataset.coefficient = anchorBlock.dataset.coefficient;
        });
    }


    if (window.innerWidth > 1100) {

        let scrollTop = 0,
            scrollSpeed = 1;
        const scrollHeight = document.body.scrollHeight,
            windowHeight = window.innerHeight;

        dataAnchorLinks.forEach(element => {
            const popup = document.querySelectorAll('.popup');

            element.addEventListener('click', (e) => {
                e.preventDefault();

                popup.forEach(element => {
                    element.classList.remove('active');
                });

                scrollTop = (+element.dataset.height) / (scrollSpeed * element.dataset.coefficient);

                if (element.dataset.anchor === 'footer') {
                    scrollTop = (document.body.scrollHeight - window.innerHeight) / (1 * .62);
                }

                parallaxItems.forEach(element => {
                    element.classList.add('transition')
                });
                scrollLoop(scrollTop, parallaxItems)
                setTimeout(() => {
                    parallaxItems.forEach(element => {
                        element.classList.remove('transition')
                    });
                }, 500)
            });
        });

        document.addEventListener('wheel', (event) => {

            let scrollDeep = normalizeWheel(event);


            if ((scrollTop + scrollDeep) * 1 * .621 >= document.body.scrollHeight - window.innerHeight) {
                if (scrollDeep > 0) {
                    scrollTop = (document.body.scrollHeight - window.innerHeight) / (1 * .621);
                    return false
                }
            }

            scrollTop += scrollDeep;

            if (scrollDeep > 0 && scrollTop > 500) {
                header.classList.add('hidden')
            } else {
                header.classList.remove('hidden');
            }

            scrollTop <= 0 ? scrollTop = 0 : scrollTop;


            scrollLoop(scrollTop, parallaxItems);
        });
    }

    const oldWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;

        newWidth != oldWidth ? location.reload() : null;
    });

    const searchInput = document.querySelector('.search-input');

    searchInput.addEventListener('change', () => {
        apiRequest(searchInput.value);
    });
    apiRequest('Платье');
});