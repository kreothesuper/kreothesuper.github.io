const horseArray = [
    {
        id: 1,
        name: {
            ru: 'Аполлон',
            fr: 'Apollon',
        },
        discipline: {
            ru: {
                name: 'Конкур',
                label: 'Дисциплина'
            },
            fr: {
                name: 'CSO',
                label: 'Discipline équestre'
            }
        },
        type: {
            ru: {
                name: 'Кобыла',
                label: 'Лошадь'
            },
            fr: {
                name: 'Jument',
                label: 'Cheval'
            }
        },
        location: {
            ru: {
                name: 'Германия',
                label: 'Локация'
            },
            fr: {
                name: 'Hollande',
                label: 'Localisation'
            }
        },
        family: {
            ru: {
                name: 'Имя х Имя',
                label: 'Родословная'
            },
            fr: {
                name: 'Nom x Nom',
                label: 'Généalogie'
            }
        },
        age: {
            ru: {
                name: 2,
                label: 'Возраст'
            },
            fr: {
                name: 2,
                label: 'Âge'
            }
        },
        vetcheck: {
            name: true,
            ru: {
                label: 'Вет-чек'
            },
            fr: {
                label: 'VetСheck'
            }
        },
        rate: 2,
    },
    {
        id: 2,
        name: {
            ru: 'Зевс',
            fr: 'Zevs'
        },
        discipline: {
            ru: {
                name: 'Выездка',
                label: 'Дисциплина'
            },
            fr: {
                name: 'Dressage',
                label: 'Discipline équestre'
            }
        },
        type: {
            ru: {
                name: 'Кобыла',
                label: 'Лошадь'
            },
            fr: {
                name: 'Jument',
                label: 'Cheval'
            }
        },
        location: {
            ru: {
                name: 'Россия',
                label: 'Локация'
            },
            fr: {
                name: 'Russie',
                label: 'Localisation'
            }
        },
        family: {
            ru: {
                name: 'Имя х Имя',
                label: 'Родословная'
            },
            fr: {
                name: 'Nom x Nom',
                label: 'Généalogie'
            }
        },
        age: {
            ru: {
                name: 2,
                label: 'Возраст'
            },
            fr: {
                name: 2,
                label: 'Âge'
            }
        },
        vetcheck: {
            name: true,
            ru: {
                label: 'Вет-чек'
            },
            fr: {
                label: 'VetСheck'
            }
        },
        rate: 5,
    },
    {
        id: 3,
        name: {
            ru: 'Аполлон 1',
            fr: 'Apollon 1',
        },
        discipline: {
            ru: {
                name: 'Троеборье',
                label: 'Дисциплина'
            },
            fr: {
                name: 'Complet',
                label: 'Discipline équestre'
            }
        },
        type: {
            ru: {
                name: 'Мерин',
                label: 'Лошадь'
            },
            fr: {
                name: 'Hongre',
                label: 'Cheval'
            }
        },
        location: {
            ru: {
                name: 'Россия',
                label: 'Локация'
            },
            fr: {
                name: 'Russie',
                label: 'Localisation'
            }
        },
        family: {
            ru: {
                name: 'Имя х Имя',
                label: 'Родословная'
            },
            fr: {
                name: 'Nom x Nom',
                label: 'Généalogie'
            }
        },
        age: {
            ru: {
                name: 12,
                label: 'Возраст'
            },
            fr: {
                name: 12,
                label: 'Âge'
            }
        },
        vetcheck: {
            name: true,
            ru: {
                label: 'Вет-чек'
            },
            fr: {
                label: 'VetСheck'
            }
        },
        rate: 4,
    },
    {
        id: 4,
        name: {
            ru: 'Аполлон 2',
            fr: 'Apollon 2',
        },
        discipline: {
            ru: {
                name: 'Конкур',
                label: 'Дисциплина'
            },
            fr: {
                name: 'CSO',
                label: 'Discipline équestre'
            }
        },
        type: {
            ru: {
                name: 'Кобыла',
                label: 'Лошадь'
            },
            fr: {
                name: 'Jument',
                label: 'Cheval'
            }
        },
        location: {
            ru: {
                name: 'Франция',
                label: 'Локация'
            },
            fr: {
                name: 'France',
                label: 'Localisation'
            }
        },
        family: {
            ru: {
                name: 'Имя х Имя',
                label: 'Родословная'
            },
            fr: {
                name: 'Nom x Nom',
                label: 'Généalogie'
            }
        },
        age: {
            ru: {
                name: 13,
                label: 'Возраст'
            },
            fr: {
                name: 13,
                label: 'Âge'
            }
        },
        vetcheck: {
            name: true,
            ru: {
                label: 'Вет-чек'
            },
            fr: {
                label: 'VetСheck'
            }
        },
        rate: 3,
    }
];

const searchAndFormatName = (array, searchName) => {
    const languageCurrent = getCurrentLanguage();

    const formattedSearchName = searchName.toLowerCase().replace(/\s+/g, ' ').trim();
    const foundHorses = array.filter(horse => {
        const formattedName = horse.name[languageCurrent].toLowerCase().replace(/\s+/g, ' ').trim();
        return formattedName.startsWith(formattedSearchName);
    });

    return foundHorses;
}

const searchById = (id) => {
    const foundHorses = horseArray.filter(horse => {

        return horse.id == id;
    });

    return foundHorses[0];
}

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

const getCurrentLanguage = () => {
    return window.location.href.split("/")[3];
}

const createHorseCard = (horse) => {
    const languageCurrent = getCurrentLanguage();

    const horseAgeLabel = (languageCurrent === 'ru' && horse.age[languageCurrent].name <= 4) ? "года" : (languageCurrent === 'ru' ? 'лет' : 'ans');
    const buttonText = languageCurrent === 'fr' ? 'EN SAVOIR PLUS SUR LE CHEVAL' : 'подробнее о лошади';
    const priceText = languageCurrent === 'fr' ? "Estimation du prix d'un cheval" : 'Оценивание лошади';
    const pleaFirst = languageCurrent === 'fr' ? "de" : 'от';
    const pleaSecond = languageCurrent === 'fr' ? "à" : 'до';

    return `
    <div class="card">
        <div class="card__img">
            <img src="/assets/images/catalog/1.webp" alt="">
        </div>
        <div class="card__content">
            <p class="title title--small title--mobile--big title--black title--bold">${horse.name[languageCurrent]}</p>
            <div class="horse-info">
                <p class="text text--base text--base--mobile--small">
                    <span class="text text--grey">
                        ${horse.discipline[languageCurrent].label}:
                    </span>
                    ${horse.discipline[languageCurrent].name}
                </p>
                <p class="text text--base text--base--mobile--small">
                    <span class="text text--grey">
                        ${horse.age[languageCurrent].label}:
                    </span>
                    ${horse.age[languageCurrent].name} ${horseAgeLabel}
                </p>
                <p class="text text--base text--base--mobile--small">
                    <span class="text text--grey">
                        ${horse.family[languageCurrent].label}:
                    </span>
                    ${horse.family[languageCurrent].name}
                </p>
            </div>
            <div class="price-info">
                <div class="price-info__row">
                    <p class="star">
                        ${horse.rate}
                    </p>
                </div>
                <div class="price-info__list">
                    <p class="title title--center title--black title--bold title--small title--mobile--big">
                        ${priceText}
                    </p>
                    <div class="price-list">
                        <div class="price-list__item">
                            <p class="star">
                                1
                            </p>
                            <p class="text text--base text--black text--base--mobile--small">
                                { ${pleaFirst} 1 000 ${pleaSecond} 20 000 € }
                            </p>
                        </div>
                        <div class="price-list__item">
                            <p class="star">
                                2
                            </p>
                            <p class="text text--base text--black text--base--mobile--small">
                                { ${pleaFirst} 20 000 ${pleaSecond} 40 000 € }
                            </p>
                        </div>
                        <div class="price-list__item">
                            <p class="star">
                                3
                            </p>
                            <p class="text text--base text--black text--base--mobile--small">
                                { ${pleaFirst} 40 000 ${pleaSecond} 60 000 € }
                            </p>
                        </div>
                        <div class="price-list__item">
                            <p class="star">
                                4
                            </p>
                            <p class="text text--base text--black text--base--mobile--small">
                                { ${pleaFirst} 60 000 ${pleaSecond} 100 000 € }
                            </p>
                        </div>
                        <div class="price-list__item">
                            <p class="star">
                                5
                            </p>
                            <p class="text text--base text--black text--base--mobile--small">
                                { ${pleaFirst} 100 000 ${pleaSecond} 300 000 € }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <a href="/${languageCurrent}/horse.html?id=${horse.id}"
                class="button button--mobile--full button--base button--bordered">
                ${buttonText}
            </a>
        </div>
    </div>
    `
}

const createHorseCatalog = (array) => {
    const catalog = document.querySelector('.catalog');

    catalog.innerHTML = ''
    array.forEach(horse => {
        catalog.innerHTML += `${createHorseCard(horse)}`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const languageCurrent = getCurrentLanguage();

    const languageList = document.querySelectorAll('.language');

    if (languageList.length) {
        languageList.forEach(language => {
            const languageCurrent = language.querySelector('.language__current'),
                languageCurrentText = languageCurrent.querySelector('.language__text'),
                languageChecked = language.querySelector(':checked');

            languageCurrent.addEventListener('click', () => {
                language.classList.toggle('language--active');
            });

            language.addEventListener('change', (e) => {
                languageCurrentText.textContent = e.target.value;
                language.classList.remove('language--active');

                const url = window.location.href;
                const urlObj = new URL(url);

                const urlPath = urlObj.pathname.replace(/.*\//, '');
                const baseUrl = `${urlObj.protocol}//${urlObj.host}/${e.target.value}/${urlPath}`;

                window.location.href = baseUrl;
            });

            languageCurrentText.textContent = languageChecked.value;
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language')) {
                // language.classList.remove('lanuguage--active');
                languageList.forEach(language => {
                    language.classList.remove('language--active');
                });
            }
        });
    }

    const searchArray = document.querySelectorAll('.search');

    if (searchArray.length) {
        searchArray.forEach(search => {
            const searchInput = search.querySelector('input');
            const searchList = search.querySelector('.search-list');
            search.addEventListener('input', () => {
                search.classList.add('search--active');
                const foundHorses = searchAndFormatName(horseArray, searchInput.value);
                searchList.innerHTML = '';
                foundHorses.forEach(horse => {
                    searchList.innerHTML += ` <li class="search-list__item">
                    <a href="/${languageCurrent}/horse.html?id=${horse.id}" class="search-list__link">
                        ${horse.name[languageCurrent]}
                    </a>
                </li>`
                })
            });
            search.addEventListener('click', () => {
                search.classList.add('search--active')
            });
            search.addEventListener('change', () => {
                search.classList.add('search--active');
            });

        });
    }


    const headerNav = document.querySelector('.header__nav'),
        burger = document.querySelector('.burger');

    if (headerNav && burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('burger--active');
            headerNav.classList.toggle('header__nav--active');
        });
    }

    const filter = document.querySelector('.filter');

    if (filter) {
        const filterForm = filter.querySelector('form');
        filter.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(filterForm);
            const formObjectArray = [];

            formData.forEach((value, key) => {
                formObjectArray.push({ name: key, value: value });
            });

            const combinedObject = formObjectArray.reduce((acc, obj) => {
                const key = obj.name;
                if (!acc[key]) {
                    acc[key] = [];
                }

                if (key === "age") {
                    const ageRange = obj.value.split("-").map(Number);
                    for (let i = ageRange[0]; i <= ageRange[1]; i++) {
                        acc[key].push(i);
                    }
                } else {
                    if (!acc[key].includes(obj.value)) {
                        acc[key].push(obj.value);
                    }
                }

                return acc;
            }, {});


            // ignores case-sensitive
            const getValue = value => (typeof value === 'string' ? value.toUpperCase() : value);
            function filterPlainArray(array, filters) {
                const filterKeys = Object.keys(filters);
                return array.filter(item => {
                    // validates all filter criteria
                    return filterKeys.every(key => {
                        // ignores an empty filter
                        if (!filters[key].length) return true;
                        return filters[key].find(filter => getValue(filter) === getValue(item[key][languageCurrent].name));
                    });
                });
            }

            const currentArray = filterPlainArray(horseArray, combinedObject);
            createHorseCatalog(currentArray);

            filter.classList.remove('filter--active');
        });
        filter.addEventListener('click', (e) => {
            if (e.target.closest('.filter-label')) {
                filter.classList.toggle('filter--active');
            }
        });

        filter.addEventListener('reset', (e) => {
            createHorseCatalog(horseArray);
            filter.classList.remove('filter--active');
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

    const formList = document.querySelectorAll('.form');

    if (formList.length) {
        formList.forEach(form => {
            form.addEventListener('submit', e => {
                e.preventDefault();

                showPopup('.popup-thanks')
            });
        });
    }

    const swiper = document.querySelector('.swiper');

    if (swiper) {

    }

    const horseSingle = document.querySelector('.js-horse');

    if (horseSingle) {
        const url = new URL(window.location.href);
        const id = url.searchParams.get('id');

        if (!id) {
            console.log(false);
        }

        const searchHorse = searchById(id);

        if (!searchHorse) return;

        const horseAgeLabel = (languageCurrent === 'ru' && horse.age[languageCurrent].name <= 4) ? "года" : (languageCurrent === 'ru' ? 'лет' : 'ans');
        const priceText = languageCurrent === 'fr' ? "Estimation du prix d'un cheval" : 'Оценивание лошади';
        const pleaFirst = languageCurrent === 'fr' ? "de" : 'от';
        const pleaSecond = languageCurrent === 'fr' ? "à" : 'до';

        horseSingle.innerHTML = `
        <div class="horse__wrapper">
        <div class="horse__content">
            <div class="horse__header">
                <p class="title title--base title--black">
                    ${searchHorse.name[languageCurrent]}
                </p>
                <div class="horse-info">
                    <p class="text text--base text--base--mobile--small">
                        <span class="text text--grey">
                            ${searchHorse.discipline[languageCurrent].label}:
                        </span>
                        ${searchHorse.discipline[languageCurrent].name}
                    </p>
                    <p class="text text--base text--base--mobile--small">
                        <span class="text text--grey">
                            ${searchHorse.age[languageCurrent].label}: 
                        </span>
                        ${searchHorse.age[languageCurrent].name} ${horseAgeLabel}
                    </p>
                    <p class="text text--base text--base--mobile--small">
                        <span class="text text--grey">
                        ${searchHorse.family[languageCurrent].label}: 
                        </span>
                        ${searchHorse.family[languageCurrent].name}
                    </p>
                    <p class="text text--base text--base--mobile--small">
                        <span class="text text--grey">
                            ${searchHorse.vetcheck[languageCurrent].label}: 
                        </span>
                        ${searchHorse.vetcheck.name ? (languageCurrent === 'fr' ? 'Présent' : 'Присутствует') : (languageCurrent === 'fr' ? 'Non Présent' : 'Отсутствует')}
                    </p>
                    <p class="text text--base text--base--mobile--small">
                    <span class="text text--grey">
                        ${searchHorse.type[languageCurrent].label}:
                    </span>
                    ${searchHorse.type[languageCurrent].name}
                </p>
                <p class="text text--base text--base--mobile--small">
                    <span class="text text--grey">
                    ${searchHorse.location[languageCurrent].label}:
                    </span>
                    ${searchHorse.location[languageCurrent].name}
                </p>
                </div>
                <div class="price-info">
                    <div class="price-info__row">
                        <p class="star">
                        ${searchHorse.rate}
                        </p>
                    </div>
                    <div class="price-info__list">
                        <p class="title title--center title--black title--bold title--small title--mobile--big">
                            ${priceText}
                        </p>
                        <div class="price-list">
                            <div class="price-list__item">
                                <p class="star">
                                    1
                                </p>
                                <p class="text text--base text--black text--base--mobile--small">
                                    { ${pleaFirst} 1 000 ${pleaSecond} 20 000 € }
                                </p>
                            </div>
                            <div class="price-list__item">
                                <p class="star">
                                    2
                                </p>
                                <p class="text text--base text--black text--base--mobile--small">
                                    { ${pleaFirst} 20 000 ${pleaSecond} 40 000 € }
                                </p>
                            </div>
                            <div class="price-list__item">
                                <p class="star">
                                    3
                                </p>
                                <p class="text text--base text--black text--base--mobile--small">
                                    { ${pleaFirst} 40 000 д${pleaSecond}о 60 000 € }
                                </p>
                            </div>
                            <div class="price-list__item">
                                <p class="star">
                                    4
                                </p>
                                <p class="text text--base text--black text--base--mobile--small">
                                    { ${pleaFirst} 60 000 ${pleaSecond} 100 000 € }
                                </p>
                            </div>
                            <div class="price-list__item">
                                <p class="star">
                                    5
                                </p>
                                <p class="text text--base text--black text--base--mobile--small">
                                    { ${pleaFirst} 100 000 ${pleaSecond} 300 000 € }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="video horse-video">
                <div class="video__wrapper">
                    <svg class="video__resize">
                        <use xlink:href="/assets/images/sprite.svg#resize"></use>
                    </svg>
                    <video class="video__item" src="https:///assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4"></video>
                </div>
            </div>
        </div>
        <div class="horse__slider swiper horse-slider">
            <div class="swiper-wrapper">
                <div class="swiper-slide horse-slider__item">
                    <img src="/assets/images/catalog/1.webp" alt="">
                </div>
                <div class="swiper-slide horse-slider__item">
                    <img src="/assets/images/catalog/1.webp" alt="">
                </div>
                <div class="swiper-slide horse-slider__item">
                    <img src="/assets/images/catalog/1.webp" alt="">
                </div>
                <div class="swiper-slide horse-slider__item">
                    <img src="/assets/images/catalog/1.webp" alt="">
                </div>
            </div>
            <div class="horse-slider__navigation">
                <div class="horse-slider__button horse-slider__button--prev"></div>
                <div class="horse-slider__pagination"></div>
                <div class="horse-slider__button horse-slider__button--next"></div>
            </div>
        </div>
    </div>
        `;
        const horseSlider = new Swiper('.horse-slider', {
            loop: true,
            pagination: {
                el: '.horse-slider__pagination',
            },

            // Navigation arrows
            navigation: {
                nextEl: '.horse-slider__button--next',
                prevEl: '.horse-slider__button--prev',
            },
        });
    }

    const videoArray = document.querySelectorAll('.video');

    if (videoArray.length) {
        videoArray.forEach(video => {
            const videoElement = document.querySelector('video');

            video.addEventListener('click', function (e) {
                if (!e.target.classList.contains('video__resize')) {
                    if (videoElement.paused) {
                        videoElement.play();
                        video.classList.add('play');
                    } else {
                        videoElement.pause();
                        video.classList.remove('play');
                        video.classList.remove('full');
                    }
                } else {
                    video.classList.toggle('full');
                }

            });
        })
    }


    const catalog = document.querySelector('.catalog');

    const filterHorse = () => {
        return horseArray.filter(horse => {
            return Object.keys(selectedFilters).every(filterName => {
                return selectedFilters[filterName].includes(horse[filterName]);
            });
        });
    }

    if (catalog) {
        createHorseCatalog(horseArray)
    }

    const rangeArray = document.querySelectorAll('.js-range');

    if (rangeArray.length > 0) {
        rangeArray.forEach(range => {
            const rangeElement = range.querySelector('.range-slider'),
                rangeMax = rangeElement.dataset.max,
                rangeMin = rangeElement.dataset.min,
                rangeInputMin = range.querySelector('.js-range-from-input'),
                rangeInputMax = range.querySelector('.js-range-to-input');
            if (rangeInputMin && rangeInputMax) {
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
            }
        });
    }
});