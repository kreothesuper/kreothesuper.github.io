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

    const pageWrapper = document.querySelector('.page-wrapper');

    hideAllPopups();

    popup.classList.add('popup--active');
    pageWrapper.classList.add('no-scroll');

    document.addEventListener('click', checkTargetOrKey);
    document.addEventListener('keyup', checkTargetOrKey);
};

const hideAllPopups = () => {
    const popups = document.querySelectorAll('.popup'),
        pageWrapper = document.querySelector('.page-wrapper');

    popups.forEach(popup => {
        popup.classList.remove('popup--active');
    });
    pageWrapper.classList.remove('no-scroll');

    document.removeEventListener('click', checkTargetOrKey);
    document.removeEventListener('keyup', checkTargetOrKey);
};

document.addEventListener("DOMContentLoaded", () => {
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
                if(fileName){
                    fileName.innerHTML = file.name;
                }
            });
        });
    }

    const stepListAdd = document.querySelectorAll('.step-list__add');

    if(stepListAdd.length){
        let newElementIndex = 0;
        stepListAdd.forEach(link=>{
            link.addEventListener('click',(e)=>{
                e.preventDefault();

                const previousElementClone = link.previousElementSibling.cloneNode(true);

                previousElementClone.querySelector('[type="checkbox"]').id = `additional-${newElementIndex}`;
                previousElementClone.querySelector('[type="checkbox"]').checked = false;
                previousElementClone.querySelector('label').htmlFor = `additional-${newElementIndex}`;
                previousElementClone.querySelector('[type="text"]').name = `additional-${newElementIndex}-text`;
                previousElementClone.querySelector('.check__text').setAttribute('contenteditable',true);
                previousElementClone.querySelector('.check__text').innerHTML = 'Другое (укажите название)';
                previousElementClone.querySelector('.check__text').classList.add('text--italic')

                newElementIndex++;

                link.before(previousElementClone);
            });
        });
    }

    const quiz = document.querySelector('.quiz');

    if(quiz){
        let currentStep = 0;

        const quizStepArray = quiz.querySelectorAll('.step'),
            quizStepButton = quiz.querySelector('.quiz-next-step'),
            quizNavLinkArray = quiz.querySelectorAll('.js-quiz-link');

        if(quizStepArray.length){
            quizStepArray.forEach((step)=>{
                step.classList.remove('step--active');
            });
            quizStepArray[currentStep].classList.add('step--active');
        }
        if(quizStepButton){
            quizStepButton.addEventListener('click',(e)=>{
                e.preventDefault();
    
                currentStep++;
    
                if(currentStep === quizStepArray.length){
                    showPopup('.popup');
                    currentStep = quizStepArray.length - 1;
                    return false;
                }
    
                quizStepArray.forEach((step)=>{
                    step.classList.remove('step--active');
                });
                quizStepArray[currentStep].classList.add('step--active');
            });
        }
        if(quizNavLinkArray.length){
            quizNavLinkArray.forEach((link,linkIndex)=>{
                link.addEventListener('click',(e)=>{
                    e.preventDefault();

                    quizStepArray.forEach((step)=>{
                        step.classList.remove('step--active');
                    });
                    quizNavLinkArray.forEach(element=>{
                        element.classList.remove('nav__step--current')
                    })
                    link.classList.add('nav__step--current')
                    quizStepArray[linkIndex].classList.add('step--active');
                });
            });
        }
    }
});