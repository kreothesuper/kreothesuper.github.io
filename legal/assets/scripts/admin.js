// quiz dynamic input
const quizContent = [
    {
        name: 'stevedore',
        inputArray: [
            {
                label: 'Наличие профессионального образования',
                textInput: 'Напишите название специальности'
            },
            {
                label: 'Опыт работы в морских портах',
                textInput: 'Укажите стаж и места работы'
            },
            {
                label: 'Опыт работы на навалочных грузах (погрузка / выгрузка)',
            },
            {
                label: 'Опыт работы на генеральных грузах',
            },
            {
                label: 'Опыт работы на контейнерных грузах',
            },
            {
                label: 'Опыт работы на проектных грузах',
            },
            {
                label: 'Знание технологии обработки открытого / крытого подвижного состава',
            },
            {
                label: 'Опыт составления карго-плана на погрузку судна',
            },
            {
                label: 'Навык составления ПОР/ВТИП на негабаритные проектные грузы',
            },
            {
                label: 'Наличие действующего обучения по промышленной безопасности',
            },
            {
                label: 'Желание обучаться',
            },
        ]
    },
    {
        name: 'talman',
        inputArray: [
            {
                label: 'Выгрузка открытого/подвижного состава'
            },
            {
                label: 'Погрузка судна'
            },
            {
                label: 'Затарка/растарка контейнеров'
            },
            {
                label: 'Погрузка оборудования на ж/д суда'
            },
            {
                label: 'Подработка груза'
            },
            {
                label: 'Отгрузка погрузка/выгрузка оборудования на а/м'
            },
            {
                label: 'Затарка сборного груза'
            },
            {
                label: 'Осмотр/дефектовка контейнеров'
            },
            {
                label: 'Умение заполнять складские документы'
            },
            {
                label: 'Опыт работы в программах 1С склад, Грузовая задача, Solo и т. д.'
            },
            {
                label: 'Работа с ж/д и а/м весами'
            },
            {
                label: 'Прохождение обучения тальмана'
            },
            {
                label: 'Опыт работы в морском порту'
            },
            {
                label: 'Готовность к командировкам'
            },
            {
                label: 'Желание обучаться'
            },
        ]
    },
    {
        name: 'surveyor',
        inputArray: [
            {
                label: 'Выгрузка открытого/подвижного состава'
            },
            {
                label: 'Погрузка судна'
            },
            {
                label: 'Затарка/растарка контейнеров'
            },
            {
                label: 'Погрузка оборудования на ж/д суда'
            },
            {
                label: 'Подработка груза'
            },
            {
                label: 'Отгрузка погрузка/выгрузка оборудования на а/м'
            },
            {
                label: 'Затарка сборного груза'
            },
            {
                label: 'Осмотр/дефектовка контейнеров'
            },
            {
                label: 'Умение заполнять складские документы'
            },
            {
                label: 'Опыт работы в программах 1С склад, Грузовая задача, Solo и т. д.'
            },
            {
                label: 'Проектные грузы'
            },
            {
                label: 'Опыт работы досмотровым инспектором (работа с таможней)'
            },
            {
                label: 'Знание документооборота внутрипортового экспедирования'
            },
            {
                label: 'Прохождение обучения тальмана'
            },
            {
                label: 'Опыт работы в морском порту'
            },
            {
                label: 'Готовность к командировкам'
            },
            {
                label: 'Желание обучаться'
            },
        ]
    },
    {
        name: 'handyman',
        inputArray: [
            {
                label: 'Ремонт контейнеров',
                textInput: 'Укажите стаж и место/места работы'
            },
            {
                label: 'Владение инструментами',
                textInput: 'Укажите владение особыми инструментами (если есть)'
            },
            {
                label: 'Опыт работы на ручном труде (выгрузка-растарка контейнеров, ж/д вагонов)',
                textInput: 'Укажите стаж и место/места работы',
            },
            {
                label: 'Опыт работы в порту',
                textInput: 'Укажите стаж и место/места работы'
            },
            {
                label: 'Опыт работы на высоте',
                textInput: 'Укажите стаж и место/места работы'
            },
            {
                label: 'Желание обучаться'
            },
        ]
    },
]
const rus_to_latin = (str) => {

    const ru = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
        'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
    }, n_str = [];

    str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');

    for (let i = 0; i < str.length; ++i) {
        n_str.push(
            ru[str[i]]
            || ru[str[i].toLowerCase()] == undefined && str[i]
            || ru[str[i].toLowerCase()].toUpperCase()
        );
    }

    return n_str.join('').replace(/\s/g, "-").toLowerCase();
}
// popup control function
const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup__wrapper') ||
        event.key === 'Escape' ||
        event.target.closest('.popup__close')
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
    const popups = document.querySelectorAll('.popup'),
        pageWrapper = document.querySelector('.page-wrapper');

    popups.forEach(popup => {
        popup.classList.remove('popup--active');
    });
    document.body.classList.remove('no-scroll');

    document.removeEventListener('click', checkTargetOrKey);
    document.removeEventListener('keyup', checkTargetOrKey);
};


// quiz
class Quiz {
    constructor() {
        this.quiz = document.querySelector('.quiz');
        this.quizNav = this.quiz.querySelector('.quiz-nav');
        this.quizNavItems = this.quizNav.querySelectorAll('.nav__step:not(.nav__step--dynamic)');
        this.quizSteps = this.quiz.querySelectorAll('.step:not(.step--dynamic)');
        this.quizNextStepButton = this.quiz.querySelector('.quiz-next-step');
        this.quizBackStepButton = this.quiz.querySelector('.quiz-back-step');

        this.currentIndex = 0;
    }

    // find dynamic input array from object
    findQuizContentByName = (name) => {
        return quizContent.find((item) => item.name === name);
    }

    // control navigation function
    changeStep = (number) => {
        this.currentIndex = number;
        this.quizSteps.forEach((step, index) => {
            index !== this.currentIndex ? step.classList.remove('step--active') : step.classList.add('step--active');
        });
        this.quizNavItems.forEach((navItem, index) => {
            index !== this.currentIndex ? navItem.classList.remove('nav__step--current') : navItem.classList.add('nav__step--current');
            index > this.currentIndex ? navItem.classList.add('nav__step--hidden') : navItem.classList.remove('nav__step--hidden');
        });

        if(this.currentIndex === this.quizSteps.length - 1){
            this.quiz.classList.add('quiz-final');
        }else{
            this.quiz.classList.remove('quiz-final')
        }
    }

    // choosing a path function
    changeStaticDynamicState = () => {
        if (this.quizSteps[this.currentIndex].classList.contains('step--changer')) {
            this.specializtionInput = this.quiz.querySelector('input[name="specialization"]:checked');
            if (!this.specializtionInput) return
            const quizContentInput = this.findQuizContentByName(this.specializtionInput.value);
            if (quizContentInput) {
                this.quizNav.classList.add('quiz-nav--static')
                this.quizSteps = this.quiz.querySelectorAll('.step:not(.step--static)');
                this.quizNavItems = this.quizNav.querySelectorAll('.nav__step:not(.nav__step--static)');
                const quizStepContent = this.quiz.querySelector('.step--skills').querySelector('.step__content');
                quizStepContent.innerHTML = '';
                quizContentInput.inputArray.forEach(input => {
                    quizStepContent.innerHTML += this.createStepBlock(input.label, input.textInput);
                });
            } else {
                this.quizNav.classList.remove('quiz-nav--static')
                this.quizNavItems = this.quizNav.querySelectorAll('.nav__step:not(.nav__step--dynamic)');
                this.quizSteps = this.quiz.querySelectorAll('.step:not(.step--dynamic)');
            }
        }
    }

    // create dynamic block function
    createStepBlock = (name, textInput) => {
        const newName = rus_to_latin(name);
        const isTextInput = textInput ? ` <div class="check__content check__content--visible check__content--full check-content">
        <input id="${newName}-text" name="${newName}-text" type="text" class="input__item"
        placeholder="${textInput}">
    </div>` : '';
        return `<div class="step-list__item step-list__item--profile">
        <div class="check">
            <div class="check__wrapper">
                <input type="radio" id="${newName}-yes" name="${newName}" class="check__input check__input--yes">
                <input type="radio" id="${newName}-no" name="${newName}" class="check__input check__input--no">
                <div class="check__header">
                    <span class="text text--base text--semibold text--white text--white--clear">${name}</span>
                    <div class="check__list">
                        <label for="${newName}-yes" class="check__label check__label--yes check__label--padding--none">
                            <span class="check__checkmark"></span>
                            <span class="check__text text text--base text--semibold text--white text--white--clear">Да</span>
                        </label>
                        <label for="${newName}-no" class="check__label check__label--no check__label--padding--none">
                            <span class="check__checkmark"></span>
                            <span class="check__text text text--base text--semibold text--white text--white--clear">Нет</span>
                        </label>
                    </div>
                </div>
                ${isTextInput}
            </div>
        </div>
    </div>`
    }

    // check validity function
    checkInputValidity = (inputArray) => {
        for (var i = 0; i < inputArray.length; i++) {
            if (!inputArray[i].checkValidity()) {
                inputArray[i].classList.add('error')
                return false;
            }
        }

        return true;
    }


    // init function
    init = () => {
        this.changeStep(0);

        if (this.quizNextStepButton) {
            this.quizNextStepButton.addEventListener('click', (e) => {
                e.preventDefault();

                // choosing a path
                this.changeStaticDynamicState();

                // validate input if we need
                const stepRequiredInput = this.quizSteps[this.currentIndex].querySelectorAll('input');
                stepRequiredInput.forEach(input=>input.addEventListener('change',(e)=>{
                    input.classList.remove('error');
                }));
                if (!this.checkInputValidity(stepRequiredInput)) return

                const lastElement = this.quiz.classList.contains('quiz-register') ? this.quizSteps.length - 2 : this.quizSteps.length - 1;
                // form navigation
                this.currentIndex === lastElement ?
                    (showPopup('.popup--thanks'), this.changeStep(this.quizSteps.length - 1))
                    :
                    this.changeStep(this.currentIndex + 1)
            });
        }
        if (this.quizBackStepButton) {
            this.quizBackStepButton.addEventListener('click', (e) => {
                e.preventDefault();

                // form navigation
                if (this.currentIndex - 1 < 0) return;
                this.changeStep(this.currentIndex - 1)
            });
        }


        this.quizNavItems.forEach((navItem, index) => {
            navItem.addEventListener('click', (e) => {
                e.preventDefault();

                // form navigation
                this.changeStep(index);
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // popup buttons init
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


    // file input control can be in class
    const fileArray = document.querySelectorAll('.js-file');

    if (fileArray.length) {
        fileArray.forEach(fileBlock => {
            const fileInput = fileBlock.querySelector('.js-file-input'),
                fileImg = fileBlock.querySelector('.js-file-img'),
                fileName = fileBlock.querySelector('.js-file-name');

            if (!fileInput) return;

            fileInput.addEventListener('change', () => {
                const file = fileInput.files[0];
                fileBlock.classList.add('loadded');
                if (fileImg) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        fileImg.src = event.target.result
                    }
                    reader.readAsDataURL(file);
                }
                if (fileName) {
                    fileName.innerHTML = file.name;
                }
            });
        });
    }


    // clone input by button can be in class if need
    const stepListAdd = document.querySelectorAll('.step-list__add');

    if (stepListAdd.length) {
        let newElementIndex = 0;
        stepListAdd.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const previousElementClone = link.previousElementSibling.cloneNode(true);
                const inputName = link.dataset.name;
                const newName = `additional-${inputName}-${newElementIndex}`

                previousElementClone.querySelector('.check__input--yes').id = `${newName}--yes`;
                previousElementClone.querySelector('.check__input--yes').name = `${newName}`;

                previousElementClone.querySelector('.check__input--no').id = `${newName}--no`;
                previousElementClone.querySelector('.check__input--no').name = `${newName}`;


                previousElementClone.querySelector('.check__label--yes').htmlFor = `${newName}--yes`;
                previousElementClone.querySelector('.check__label--no').htmlFor = `${newName}--no`;

                previousElementClone.querySelector('[type="text"]').name = `${newName}-text`;

                previousElementClone.querySelector('span.text').setAttribute('contenteditable', true);
                previousElementClone.querySelector('span.text').innerHTML = 'Другое (укажите название)';
                previousElementClone.querySelector('span.text').classList.add('text--italic')

                newElementIndex++;

                link.before(previousElementClone);
            });
        });
    }

    // const quiz = document.querySelector('.quiz');

    // if(quiz){
    //     let currentStep = 4;

    //     const quizStepArray = quiz.querySelectorAll('.step'),
    //         quizStepButton = quiz.querySelector('.quiz-next-step'),
    //         quizNavLinkArray = quiz.querySelectorAll('.js-quiz-link');

    //     if(quizStepArray.length){
    //         quizStepArray.forEach((step)=>{
    //             step.classList.remove('step--active');
    //         });
    //         quizStepArray[currentStep].classList.add('step--active');
    //     }
    //     if(quizStepButton){
    //         quizStepButton.addEventListener('click',(e)=>{
    //             e.preventDefault();

    //             currentStep++;

    //             if(currentStep === quizStepArray.length){
    //                 showPopup('.popup');
    //                 currentStep = quizStepArray.length - 1;
    //                 return false;
    //             }

    //             quizStepArray.forEach((step)=>{
    //                 step.classList.remove('step--active');
    //             });
    //             quizStepArray[currentStep].classList.add('step--active');
    //         });
    //     }
    //     if(quizNavLinkArray.length){
    //         quizNavLinkArray.forEach((link,linkIndex)=>{
    //             link.addEventListener('click',(e)=>{
    //                 e.preventDefault();

    //                 quizStepArray.forEach((step)=>{
    //                     step.classList.remove('step--active');
    //                 });
    //                 quizNavLinkArray.forEach(element=>{
    //                     element.classList.remove('nav__step--current')
    //                 })
    //                 link.classList.add('nav__step--current')
    //                 quizStepArray[linkIndex].classList.add('step--active');
    //             });
    //         });
    //     }
    // }

    const quiz = new Quiz;

    quiz.init();
});