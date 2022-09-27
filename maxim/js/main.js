const tipsText = {
    0: 'Кликните по&nbsp;печенью, разломите его!',
    1: 'Сильно кликайте по печенью, разломите его',
    2: 'Ещё немного и предсказание у вас!'
}

const predictions = [
    'Предсказание №1',
    'Предсказание очень длинное №1',
    'Предсказание очень длинное №2',
    'Предсказание очень длинное очень длинное очень длинное №1',
    'Предсказание очень длинное очень длинное очень длинное очень длинное очень длинное очень длинное очень длинное очень длинное очень длинное',
]

const throttle = (fn, delay) => {
    let lastCalled = 0;

    return (...args) => {
        let now = new Date().getTime();

        if (now - lastCalled < delay) return;

        lastCalled = now;

        return fn(...args);
    }
}

const getRandomPrediction = (randomNumber) => {
    return predictions[randomNumber];
}

const onTapOrClick = (element, cb) => {
    let debounce;
    element.addEventListener("touchstart", throttle((event) => {
        if (debounce) {
            clearTimeout(debounce);
        }
        debounce = setTimeout(() => debounce = undefined, 2000);  // debounce is 1000ms, could easily be longer
        cb(event);
    }, 1000));
    element.addEventListener("click", throttle((event) => {
        event.preventDefault();
        if (debounce) {
            return;
        }
        cb(event);
    }, 400));
}

const changePrediction = () => {
    const cookiePrediction = document.querySelectorAll('.box-prediction'),
        randomNumber = Math.floor(Math.random() * predictions.length);

    cookiePrediction.forEach(element => {
        element.textContent = getRandomPrediction(randomNumber);
    })
}

const cookieInit = () => {

    let step = 0;

    const cookieWrapper = document.querySelector('.cookie-wrapper'),
        cookieList = cookieWrapper.querySelectorAll('.cookie'),
        cookieResult = cookieWrapper.querySelector('.box-result'),
        cookieContent = cookieWrapper.querySelector('.box-content'),
        cookiePrediction = cookieWrapper.querySelectorAll('.box-prediction');

    cookieResult.classList.add('hidden');


    const showTipFirst = setTimeout(() => {
        changeStep(5);
    }, 1500)

    const shopTip = (showIndex = 0, stepIndex = 0) => {
        cookieList.forEach((cookieItem, cookieIndex) => {
            const cookieTipWrapper = cookieItem.querySelector('.cookie-tip'),
                cookieTipText = document.querySelectorAll('.cookie-tip-text');

            cookieTipText.forEach(element=>{
                element.innerHTML = tipsText[stepIndex];
            });


            cookieIndex === showIndex ? cookieTipWrapper.classList.add('active') : cookieTipWrapper.classList.remove('active');
        });
    };

    const changeStep = (cookieIndex) => {
        const cookieImg = cookieList[cookieIndex].querySelector('.cookie__img'),
            __cookieImgClass = 'cookie__img_step';

        const cookieContent = document.querySelector('.box-content'),
            cookieContentWrapper = document.querySelector('.box-content-wrapper'),
            boxBorderResult = document.querySelector('.box-border-result'),
            boxBorderContent = document.querySelector('.box-border-result');

        let __cookieImgStepClass;

        step === 1 ? (__cookieImgStepClass = `${__cookieImgClass}-first`, cookieList[cookieIndex].closest('.box-cookie-item').classList.add('active')) : step === 2 ? __cookieImgStepClass = `${__cookieImgClass}-second` : step === 3 ? (cookieResult.classList.remove('hidden'), cookieContent.classList.add('hidden'), changePrediction()) : null;

        cookieImg.classList.add(__cookieImgStepClass);

        shopTip(cookieIndex, step);

        cookieWrapper.dataset.step = step;
    }

    cookieList.forEach((cookieElement, cookieIndex) => {
        onTapOrClick(cookieElement,
            () => {
                step++;
                changeStep(cookieIndex, cookieElement);
                clearTimeout(showTipFirst)
            });
    });
}


document.addEventListener('DOMContentLoaded', () => {

    cookieInit();


    const downloadButton = document.querySelector('.download-button'),
        shareBlock = document.querySelector('.box-share'),
        shareImages = shareBlock.querySelectorAll('img');


    downloadButton.addEventListener('click', (e) => {
        e.preventDefault();

        shareBlock.classList.remove('hidden');

        shareImages.forEach(element => {
            console.log(element.complete);
        });

        setTimeout(()=>{
            htmlToImage
                .toPng(shareBlock)
                .then(function (dataUrl) {

                    download(dataUrl, 'my-node.png');


                    shareBlock.classList.add('hidden');
                })
                .catch(function (error) {
                    console.error("oops, something went wrong!", error);
                });
        },1000)
    });
});


