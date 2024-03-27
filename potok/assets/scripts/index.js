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


document.addEventListener('DOMContentLoaded', () => {
    const dropDownArray = document.querySelectorAll('.js-dropdown');

    if (dropDownArray.length) {
        dropDownArray.forEach(dropDown => {
            const dropDownLink = dropDown.querySelector('.js-dropdown-link');

            dropDownLink.addEventListener('click', (e) => {
                e.preventDefault();

                dropDownArray.forEach(dropDownElement => {
                    dropDownElement !== dropDown ? dropDownElement.classList.remove('active') : null;
                });
                dropDown.classList.toggle('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.js-dropdown')) {
                dropDownArray.forEach(dropDown => dropDown.classList.remove('active'));
            }
        });
    }


    const fileInputArray = document.querySelectorAll('.file-input');

    if (fileInputArray.length) {
        fileInputArray.forEach(fileInput => {
            const fileImg = fileInput.querySelector('.file-input__img')
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                fileInput.classList.add('loaded');
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        fileImg.src = event.target.result
                    }
                    reader.readAsDataURL(file);
                }
            });
        });
    }


    const popupButtonArray = document.querySelectorAll('[data-popup]');

    if (popupButtonArray.length) {
        popupButtonArray.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                showPopup(`${button.dataset.popup}`);
            });
        });
    }

    const inputCountArray = document.querySelectorAll('.input-count');

    if(inputCountArray.length){
        inputCountArray.forEach(count=>{
            const countInput = count.closest('.input').querySelector('.input-item');
            count.textContent = countInput.value.length;

            countInput.addEventListener('input',(e)=>{
                count.textContent = countInput.value.length;
            });
        });
    }


    const formWrapperArray = document.querySelectorAll('.js-form-wrapper');

    if(formWrapperArray.length){
        formWrapperArray.forEach(form=>{
            form.addEventListener('submit',(e)=>{
                e.target.checkValidity() ? form.classList.remove('error') : form.classList.add('error');
            });
        });
    }



    const canlendarInputArray = document.querySelectorAll('.calendar-input');

    if(canlendarInputArray.length){
        canlendarInputArray.forEach(calendarInput=>{
            const calendar = new VanillaCalendar(calendarInput,{
                input: true,
                actions: {
                    changeToInput(e, self) {
                        if (!self.HTMLInputElement) return;
                        if (self.selectedDates[0]) {
                            self.HTMLInputElement.value = self.selectedDates[0];
                            // if you want to hide the calendar after picking a date
                            self.hide();
                        } else {
                            self.HTMLInputElement.value = '';
                        }
                    },
                },
                settings: {
                    lang: 'ru',
                    visibility: {
                        positionToInput: 'left',
                        theme:'light',

                    },
                },
            });
            calendar.init();
        })
    }


    const formArray = document.querySelectorAll('.js-form');

    if(formArray.length){
        const checkValidity = (form, button) =>{
            form.checkValidity() ? button.classList.remove('disabled') : button.classList.add('disabled');
        }
        formArray.forEach(form=>{
            const submitButton = form.querySelector('[type="submit"]');

            if (submitButton){
                checkValidity(form,submitButton);

                form.addEventListener('change',()=>{
                    checkValidity(form,submitButton);
                });
            }
        });
    }
});