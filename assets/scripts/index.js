const horseArray = [
    {
        id: 1,
        name: {
            ru: 'Аполлон',
            fr: 'Apollon',
            ar: 'إسم الخيل',
            en: 'Apollon',
            de: 'Apollon',
            ch: '马名',

        },
        discipline: {
            ru: {
                name: 'Конкур',
                label: 'Дисциплина'
            },
            fr: {
                name: 'CSO',
                label: 'Discipline équestre'
            },
            ar: {
                name: 'إسم التخصص',
                label: 'التخصص'
            },
            en: {
                name: 'Dressage',
                label: 'Discipline'
            },
            de: {
                name: 'Springreiten',
                label: 'Disziplin'
            },
            ch: {
                name: '障碍赛马',
                label: '分项'
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
            },
            ar: {
                name: 'إسم التخصص',
                label: 'التخصص'
            },
            en: {
                name: 'Stallion',
                label: 'Horse'
            },
            de: {
                name: 'Hengst',
                label: 'Pferd'
            },
            ch: {
                name: '木马',
                label: '马'
            },
        },
        location: {
            ru: {
                name: 'Германия',
                label: 'Локация'
            },
            fr: {
                name: 'Hollande',
                label: 'Localisation'
            },
            ar: {
                name: 'إسم التخصص',
                label: 'التخصص'
            },
            en: {
                name: 'Germany',
                label: 'Location'
            },
            de: {
                name: 'Deutschland',
                label: 'Standort',
            },
            ch: {
                name: '德国',
                label: '地点',
            },
        },
        family: {
            ru: {
                name: 'Имя х Имя',
                label: 'Родословная'
            },
            fr: {
                name: 'Nom x Nom',
                label: 'Généalogie'
            },
            ar: {
                name: 'النسب',
                label: 'إسم х إسم'
            },
            en: {
                name: 'Name x Name',
                label: 'Pedigree'
            },
            de: {
                name: 'Name x Name',
                label: 'Stammbaum'
            },
            ch: {
                name: '姓名 x 姓名',
                label: '血统'
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
            },
            ar: {
                name: 2,
                label: 'العمر'
            },
            en: {
                name: 2,
                label: 'Age'
            },
            de: {
                name: 2,
                label: 'Alter',
            },
            ch: {
                name: 2,
                label: '岁',
            }
        },
        vetcheck: {
            name: true,
            ru: {
                label: 'Вет-чек'
            },
            fr: {
                label: 'VetСheck'
            },
            ar: {
                label: 'الفحص البيطري'
            },
            en: {
                label: 'Vet check',
            },
            de: {
                label: 'Tierärztliche Untersuchung',
            },
            ch: {
                label: '兽医检查',
            }
        },
        rate: 2,
    },
    {
        id: 2,
        name: {
            ru: 'Зевс',
            fr: 'Zevs',
            ar: 'إسم الخيل',
            en: 'Zevs',
            de: 'Zevs',
            ch: '马名',
        },
        discipline: {
            ru: {
                name: 'Выездка',
                label: 'Дисциплина'
            },
            fr: {
                name: 'Dressage',
                label: 'Discipline équestre'
            },
            ar: {
                name: 'إسم التخصص',
                label: 'التخصص'
            },
            en: {
                name: 'Dressage',
                label: 'Discipline'
            },
            de: {
                name: 'Dressage',
                label: 'Disziplin'
            },
            ch: {
                name: '盛装舞步',
                label: '分项'
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
            },
            ar: {
                name: 'إسم التخصص',
                label: 'التخصص'
            },
            en: {
                name: 'Mare',
                label: 'Discipline'
            },
            de: {
                name: 'Mare',
                label: 'Disziplin'
            },
            ch: {
                name: '木马',
                label: '马'
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
            },
            ar: {
                name: 'إسم التخصص',
                label: 'التخصص'
            },
            en: {
                name: 'Germany',
                label: 'Location'
            },
            de: {
                name: 'Deutschland',
                label: 'Standort',
            },
            ch: {
                name: '俄罗斯',
                label: '地点',
            },
        },
        family: {
            ru: {
                name: 'Имя х Имя',
                label: 'Родословная'
            },
            fr: {
                name: 'Nom x Nom',
                label: 'Généalogie'
            },
            ar: {
                name: 'النسب',
                label: 'إسم х إسم'
            },
            en: {
                name: 'Name x Name',
                label: 'Pedigree'
            },
            de: {
                name: 'Name x Name',
                label: 'Stammbaum'
            },
            ch: {
                name: '姓名 x 姓名',
                label: '血统'
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
            },
            ar: {
                name: 2,
                label: 'العمر'
            },
            en: {
                name: 2,
                label: 'Age'
            },
            de: {
                name: 2,
                label: 'Alter',
            },
            ch: {
                name: 2,
                label: '岁',
            }
        },
        vetcheck: {
            name: true,
            ru: {
                label: 'Вет-чек'
            },
            fr: {
                label: 'VetСheck'
            },
            ar: {
                label: 'الفحص البيطري'
            },
            en: {
                label: 'Vet check',
            },
            de: {
                label: 'Tierärztliche Untersuchung',
            },
            ch: {
                label: '兽医检查',
            }
        },
        rate: 5,
    },
    {
        id: 1,
        name: {
            ru: 'Аполлон',
            fr: 'Apollon',
            ar: 'إسم الخيل',
            en: 'Apollon',
            de: 'Apollon',
            ch: '马名',

        },
        discipline: {
            ru: {
                name: 'Конкур',
                label: 'Дисциплина'
            },
            fr: {
                name: 'CSO',
                label: 'Discipline équestre'
            },
            ar: {
                name: 'إسم التخصص',
                label: 'التخصص'
            },
            en: {
                name: 'Dressage',
                label: 'Discipline'
            },
            de: {
                name: 'Springreiten',
                label: 'Disziplin'
            },
            ch: {
                name: '障碍赛马',
                label: '分项'
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
            },
            ar: {
                name: 'إسم التخصص',
                label: 'التخصص'
            },
            en: {
                name: 'Stallion',
                label: 'Horse'
            },
            de: {
                name: 'Hengst',
                label: 'Pferd'
            },
            ch: {
                name: '木马',
                label: '马'
            },
        },
        location: {
            ru: {
                name: 'Германия',
                label: 'Локация'
            },
            fr: {
                name: 'Hollande',
                label: 'Localisation'
            },
            ar: {
                name: 'إسم التخصص',
                label: 'التخصص'
            },
            en: {
                name: 'Germany',
                label: 'Location'
            },
            de: {
                name: 'Deutschland',
                label: 'Standort',
            },
            ch: {
                name: '德国',
                label: '地点',
            },
        },
        family: {
            ru: {
                name: 'Имя х Имя',
                label: 'Родословная'
            },
            fr: {
                name: 'Nom x Nom',
                label: 'Généalogie'
            },
            ar: {
                name: 'النسب',
                label: 'إسم х إسم'
            },
            en: {
                name: 'Name x Name',
                label: 'Pedigree'
            },
            de: {
                name: 'Name x Name',
                label: 'Stammbaum'
            },
            ch: {
                name: '姓名 x 姓名',
                label: '血统'
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
            },
            ar: {
                name: 2,
                label: 'العمر'
            },
            en: {
                name: 2,
                label: 'Age'
            },
            de: {
                name: 2,
                label: 'Alter',
            },
            ch: {
                name: 2,
                label: '岁',
            }
        },
        vetcheck: {
            name: true,
            ru: {
                label: 'Вет-чек'
            },
            fr: {
                label: 'VetСheck'
            },
            ar: {
                label: 'الفحص البيطري'
            },
            en: {
                label: 'Vet check',
            },
            de: {
                label: 'Tierärztliche Untersuchung',
            },
            ch: {
                label: '兽医检查',
            }
        },
        rate: 2,
    },
    {
        id: 2,
        name: {
            ru: 'Зевс',
            fr: 'Zevs',
            ar: 'إسم الخيل',
            en: 'Zevs',
            de: 'Zevs',
            ch: '马名',
        },
        discipline: {
            ru: {
                name: 'Выездка',
                label: 'Дисциплина'
            },
            fr: {
                name: 'Dressage',
                label: 'Discipline équestre'
            },
            ar: {
                name: 'إسم التخصص',
                label: 'التخصص'
            },
            en: {
                name: 'Dressage',
                label: 'Discipline'
            },
            de: {
                name: 'Dressage',
                label: 'Disziplin'
            },
            ch: {
                name: '盛装舞步 2',
                label: '分项'
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
            },
            ar: {
                name: 'إسم التخصص',
                label: 'التخصص'
            },
            en: {
                name: 'Mare',
                label: 'Discipline'
            },
            de: {
                name: 'Mare',
                label: 'Disziplin'
            },
            ch: {
                name: '木马',
                label: '马'
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
            },
            ar: {
                name: 'إسم التخصص',
                label: 'التخصص'
            },
            en: {
                name: 'Germany',
                label: 'Location'
            },
            de: {
                name: 'Deutschland',
                label: 'Standort',
            },
            ch: {
                name: '俄罗斯',
                label: '地点',
            },
        },
        family: {
            ru: {
                name: 'Имя х Имя',
                label: 'Родословная'
            },
            fr: {
                name: 'Nom x Nom',
                label: 'Généalogie'
            },
            ar: {
                name: 'النسب',
                label: 'إسم х إسم'
            },
            en: {
                name: 'Name x Name',
                label: 'Pedigree'
            },
            de: {
                name: 'Name x Name',
                label: 'Stammbaum'
            },
            ch: {
                name: '姓名 x 姓名',
                label: '血统'
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
            },
            ar: {
                name: 2,
                label: 'العمر'
            },
            en: {
                name: 2,
                label: 'Age'
            },
            de: {
                name: 2,
                label: 'Alter',
            },
            ch: {
                name: 2,
                label: '岁',
            }
        },
        vetcheck: {
            name: true,
            ru: {
                label: 'Вет-чек'
            },
            fr: {
                label: 'VetСheck'
            },
            ar: {
                label: 'الفحص البيطري'
            },
            en: {
                label: 'Vet check',
            },
            de: {
                label: 'Tierärztliche Untersuchung',
            },
            ch: {
                label: '兽医检查',
            }
        },
        rate: 5,
    },
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

    let horseAgeLabel, buttonText, priceText, pleaFirst, pleaSecond;

    switch (languageCurrent) {
        case 'ru':
            horseAgeLabel = horse.age[languageCurrent].name <= 4 ? "года" : 'лет';
            buttonText = 'подробнее о лошади';
            priceText = 'Оценивание лошади';
            pleaFirst = 'от';
            pleaSecond = 'до';
            break;
        case 'fr':
            horseAgeLabel = horse.age[languageCurrent].name <= 4 ? "ans" : 'ans';
            buttonText = 'EN SAVOIR PLUS SUR LE CHEVAL';
            priceText = "Estimation du prix d'un cheval";
            pleaFirst = 'de';
            pleaSecond = 'à';
            break;
        case 'de':
            horseAgeLabel = horse.age[languageCurrent].name <= 4 ? "Jahre" : 'Jahre';
            buttonText = 'MEHR ÜBER DAS PFERD';
            priceText = 'Bewertung eines Pferdes';
            pleaFirst = 'von';
            pleaSecond = 'bis';
            break;
        case 'ar':
            horseAgeLabel = 'سنوات';
            buttonText = 'تفاصيل عن الخيل';
            priceText = 'تقييم الخيل';
            pleaFirst = 'يورو';
            pleaSecond = 'حتى';
            break;
        case 'ch':
            horseAgeLabel = '岁';
            buttonText = '关于马的更多信息';
            priceText = '马匹估计';
            pleaFirst = '从';
            pleaSecond = '到';
            break;
        default:
            horseAgeLabel = 'y.o';
            buttonText = 'MORE ABOUT THE HORSE';
            priceText = 'Horse evaluation';
            pleaFirst = 'from';
            pleaSecond = 'to';
            break;
    }

    // Now you can use horseAgeLabel, buttonText, priceText, pleaFirst, and pleaSecond as needed

    return `
    <a  href="/${languageCurrent}/horse.html?id=${horse.id}" class="card">
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
            <div
                class="button button--mobile--full button--base button--bordered">
                ${buttonText}
            </div>
        </div>
    </a>
    `
}

const createHorseCatalog = (array) => {
    const catalog = document.querySelector('.catalog');

    catalog.innerHTML = ''
    array.forEach(horse => {
        catalog.innerHTML += `${createHorseCard(horse)}`;
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

const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = `${Math.floor(progress * (end - start) + start)}%`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}


document.addEventListener('DOMContentLoaded', () => {
    const calcReview = document.querySelector('.review-calc');

    if(calcReview){
        const calcReviewButton = calcReview.querySelector('.review-calc__button');

        if(calcReviewButton){
            const calcReviewNumber = calcReview.querySelector('.review-calc-number');
            calcReviewButton.addEventListener('click',(e)=>{
                e.preventDefault();

                if(calcReviewNumber) animateValue(calcReviewNumber, 0, +calcReviewNumber.textContent, 3000);
                calcReview.classList.add('review-calc--finish');
            });
        }
    }

    initTabs();

    const quizSliderElement = document.querySelector('.quiz-slider');

    if(quizSliderElement){
        const quizSlider = new Swiper(".quiz-slider", {
            slidesPerView:1,
            pagination: {
                el: ".quiz-slider-pagination",
            },
            navigation: {
                nextEl: ".quiz-slider-button-next",
                prevEl: ".quiz-slider-button-prev",
            },

            init:false,
        });

        quizSlider.on('init',()=>{
            const maxSliderElement = document.querySelector('.quiz-slider-max'),
                currentSliderElement = document.querySelector('.quiz-slider-current');
            if(maxSliderElement) maxSliderElement.textContent = quizSlider.slides.length;

            const buttonNext = document.querySelector('.quiz-slider-button-next');
            buttonNext.classList.add('disabled');

            const currentSlideInputs = quizSlider.slides[quizSlider.realIndex].querySelectorAll('input');

            currentSlideInputs.forEach(input=>{
                if(input.checked) buttonNext.classList.remove('disabled');
                input.addEventListener('change',()=>{
                    buttonNext.classList.remove('disabled');
                });
            });

            if(currentSliderElement) currentSliderElement.textContent = quizSlider.realIndex + 1;
        });

        quizSlider.on('slideChange',()=>{
            const currentSliderElement = document.querySelector('.quiz-slider-current');
            if(currentSliderElement) currentSliderElement.textContent = quizSlider.realIndex + 1;

            const buttonSend = document.querySelector('.quiz-slider-button-send'),
                buttonNext = document.querySelector('.quiz-slider-button-next');

            buttonNext.classList.add('disabled');

            const currentSlideInputs = quizSlider.slides[quizSlider.realIndex].querySelectorAll('input');
            currentSlideInputs.forEach(input=>{
                if(input.checked) buttonNext.classList.remove('disabled');
                input.addEventListener('change',()=>{
                    buttonNext.classList.remove('disabled');
                });
            });

            if(quizSlider.slides.length - 1 == quizSlider.realIndex){
                quizSliderElement.classList.add('quiz-slider--end')
            }else{
                quizSliderElement.classList.remove('quiz-slider--end')
            }
        });

        if(quizSliderElement) quizSlider.init();
    }



    const languageCurrent = getCurrentLanguage();

    const languageList = document.querySelectorAll('.language');

    if (languageList.length) {
        languageList.forEach(language => {
            const languageCurrent = language.querySelector('.language__current'),
                languageCurrentText = languageCurrent.querySelector('.language__text');


            const currentLanguage = getCurrentLanguage(),
                inputArray = language.querySelectorAll('input');
            inputArray.forEach(input => input.value === currentLanguage ? input.checked = true : input.checked = false);

            const languageChecked = language.querySelector(':checked') || language.querySelector('input');


            languageCurrent.addEventListener('click', () => {
                language.classList.toggle('language--active');
            });

            language.addEventListener('change', (e) => {
                languageCurrentText.textContent = e.target.value;
                language.classList.remove('language--active');

                const url = window.location.href;
                const urlObj = new URL(url);


                const urlSeatch = urlObj.search ? urlObj.search : '';
                const urlPath = urlObj.pathname.replace(/.*\//, '');
                const baseUrl = `${urlObj.protocol}//${urlObj.host}/${e.target.value}/${urlPath}${urlSeatch}`;

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
        const filterForm = filter.querySelector('form'),
            filterReset = filter.querySelector('.filter-form__reset');
        filter.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(filterForm);
            const formObjectArray = [];
            const formObjectRate = [];

            formData.forEach((value, key) => {
                if (key !== 'rate') {
                    formObjectArray.push({ name: key, value: value });
                } else {
                    formObjectRate.push({ name: key, value: +value });
                }
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

            let filteredData = [];

            if (formObjectRate.length) {
                filteredData = filterPlainArray(horseArray, combinedObject);
                filteredData = filteredData.filter(item => item.rate >= formObjectRate[0].value && item.rate <= formObjectRate[1].value);
            } else {
                filteredData = filterPlainArray(horseArray, combinedObject);
            }

            createHorseCatalog(filteredData);

            filter.classList.remove('filter--active');
        });
        filter.addEventListener('click', (e) => {
            if (e.target.closest('.filter-label')) {
                filter.classList.toggle('filter--active');
            }
        });

        if (filterReset) {
            filterReset.addEventListener('click', (e) => {
                e.preventDefault();

                filterForm.reset();
                createHorseCatalog(horseArray);
                filter.classList.remove('filter--active');

                const filterRate = filter.querySelectorAll('[name="rate"]');

                if (filterRate.length) {
                    filterRate[0].value = 1;
                    filterRate[1].value = 5;

                    filterRate[0].dispatchEvent(new Event('change', { bubbles: true }));
                    filterRate[1].dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        }
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

                if(!form.classList.contains('js-no-thanks')){
                    showPopup('.popup-thanks');
                }

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

        const languageCurrent = getCurrentLanguage();

        let horseAgeLabel, buttonText, priceText, pleaFirst, pleaSecond;

        switch (languageCurrent) {
            case 'ru':
                horseAgeLabel = searchHorse.age[languageCurrent].name <= 4 ? "года" : 'лет';
                buttonText = 'подробнее о лошади';
                priceText = 'Оценивание лошади';
                pleaFirst = 'от';
                pleaSecond = 'до';
                vetText = searchHorse.vetcheck.name ? 'Присутствует' : 'Отсутствует';
                break;
            case 'fr':
                horseAgeLabel = searchHorse.age[languageCurrent].name <= 4 ? "ans" : 'ans';
                buttonText = 'EN SAVOIR PLUS SUR LE CHEVAL';
                priceText = "Estimation du prix d'un cheval";
                pleaFirst = 'de';
                pleaSecond = 'à';
                vetText = searchHorse.vetcheck.name ? 'Présent' : 'Absent';
                break;
            case 'de':
                horseAgeLabel = searchHorse.age[languageCurrent].name <= 4 ? "Jahre" : 'Jahre';
                buttonText = 'MEHR ÜBER DAS PFERD';
                priceText = 'Bewertung eines Pferdes';
                pleaFirst = 'von';
                pleaSecond = 'bis';
                vetText = searchHorse.vetcheck.name ? 'Gegenwärtig' : 'Abwesend';
                break;
            case 'ar':
                horseAgeLabel = 'سنوات';
                buttonText = 'تفاصيل عن الخيل';
                priceText = 'تقييم الخيل';
                pleaFirst = 'يورو';
                pleaSecond = 'حتى';
                vetText = searchHorse.vetcheck.name ? 'حاضر' : 'غائب';
                break;
            case 'ch':
                horseAgeLabel = '岁';
                buttonText = '关于马的更多信息';
                priceText = '马匹估计';
                pleaFirst = '从';
                pleaSecond = '到';
                vetText = searchHorse.vetcheck.name ? '有' : '有';
                break;
            default:
                horseAgeLabel = 'y.o';
                buttonText = 'MORE ABOUT THE HORSE';
                priceText = 'Horse evaluation';
                pleaFirst = 'from';
                pleaSecond = 'to';
                vetText = searchHorse.vetcheck.name ? 'Present' : 'Absent';
                break;
        }

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
                        ${vetText}
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
            const closestForm = range.closest('form');
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

                if (closestForm) {
                    closestForm.addEventListener('reset', () => {
                        rangeInputMin.value = rangeSliderElement.value()[0];
                        rangeInputMax.value = rangeSliderElement.value()[1];
                    });
                }

                rangeInputMin.value = rangeSliderElement.value()[0];
                rangeInputMax.value = rangeSliderElement.value()[1];

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