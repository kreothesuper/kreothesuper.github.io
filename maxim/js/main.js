const tipsText = {
    0: 'Кликните по&nbsp;печенью, разломите его!',
    1: 'Сильно кликайте по печенью, разломите его',
    2: 'Ещё немного и предсказание у вас!'
}

const throttle = (fn, delay) => {
    let lastCalled = 0;

    return (...args) => {
        let now = new Date().getTime();

        if (now - lastCalled < delay) return;

        lastCalled = now;

        return fn(...args);
    }
}

const cookieInit = () => {

    let step = 0;

    const cookieWrapper = document.querySelector('.cookie-wrapper'),
        cookieList = cookieWrapper.querySelectorAll('.cookie');

    const showTipFirst = setTimeout(() => {changeStep(5);}, 1500)

    const shopTip = (showIndex = 0, stepIndex = 0) => {
        cookieList.forEach((cookieItem, cookieIndex) => {
            const cookieTipWrapper = cookieItem.querySelector('.cookie-tip'),
                cookieTipText = cookieTipWrapper.querySelector('.cookie-tip-text');

            cookieTipText.innerHTML = tipsText[stepIndex];

            cookieIndex === showIndex ? cookieTipWrapper.classList.add('active') : cookieTipWrapper.classList.remove('active');
        });
    };

    const changeStep = (cookieIndex) => {
        const cookieImg = cookieList[cookieIndex].querySelector('.cookie__img'),
            __cookieImgClass = 'cookie__img_step';

        let __cookieImgStepClass;


        step === 1 ? (__cookieImgStepClass= `${__cookieImgClass}-first`, cookieList[cookieIndex].closest('.box-cookie-item').classList.add('active')) : step === 2 ? __cookieImgStepClass = `${__cookieImgClass}-second` : null;

        cookieImg.classList.add(__cookieImgStepClass);

        shopTip(cookieIndex, step);

        cookieWrapper.dataset.step = step;
    }


    cookieList.forEach((cookieElement, cookieIndex) => {
        cookieElement.addEventListener('click', throttle((e) => {
            step++;
            changeStep(cookieIndex, cookieElement);
            clearTimeout(showTipFirst);
        }, 1000));
    });



}


document.addEventListener('DOMContentLoaded', () => {

    cookieInit();
});