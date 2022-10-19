const tipsText = {
    0: 'Выберите печенье и кликните по нему',
    1: 'Сильно кликайте по печенью, разломите его',
    2: 'Ещё немного и предсказание у вас!',
    3: 'Ещё немного и предсказание у вас!'
}

const predictions = [
    'Успех неизбежен! Стремитесь к нему.',
    'Чем больше стараний, тем лучше результат. В новом году это будет особенно верно.',
    'К чему мы стремимся — то нам и причитается',
    'Новая жизнь начинается утром каждого дня. Делайте всё, что в ваших силах.',
    'Мелочи проходят. Главное — остается!',
    'Возможно, всё не идеально. Но только в ваших силах сделать это лучше!',
    'Вас ждет нечто прекрасное в каждый из грядущих 365 дней',
    'Успех ждет всякого, кто к нему стремится',
    'Даже если позади много неудач — впереди еще полно достижений',
    'Полагайтесь на близких. Их любовь будет вести вас к счастью.',
    'Осознавайте свои мысли, ведь они — основа вашей реальности',
    'Добро воздается тем, кто его творит.',
    'Огромный путь начинается с маленького шага. Не бойтесь начать.',
    'Можно сделать что-то, не умея. Но нельзя сделать что-то, не пробуя.',
    'Лучше сделать и пожалеть — чем не сделать и пожалеть.',
    'Тот, кто застывает на месте, на самом деле двигается назад.',
    'Всё к лучшему. Даже если пока вам так не кажется.',
    'Любовь всё побеждает. Следуйте за своим сердцем.',
    'Вас ждёт неожиданность — будьте готовы принять её.',
    'Дайте людям свободу быть собой. Они прекрасны, как есть.',
    'Всё проходит. Остаётся — бесценный опыт.',
    'Ищите вдохновение в аромате кофе — и других мелочах, которые обычно не замечаете.',
    'Верьте в лучшее — и стремитесь ему навстречу.',
    'Тот, кто думает, что всегда прав — ошибается чаще всего.',
    'Нельзя вкусить плод, не взобравшись на дерево.',
    'К новым вещам в жизни можно прийти, только если выбрать новый путь.',
    'Рискуйте. Вещи кажутся невозможными только до того, как претворятся в жизнь.',
    'Не слушайте голоса со стороны. Слушайте своё сердце.',
    'Удача идёт навстречу тем, кто к ней стремится.',
    'Прежде чем решать окончательно, взвесьте всё ещё один раз.',
    'Не останавливайтесь, дойдя до конца. Этот финал — лишь начало нового пути.',
    'Относитесь к людям так, как вам хотелось бы, чтобы они относились к вам.',
    'Если не знаете, как поступить, прислушайтесь к интуиции. Возможно, вы уже приняли решение.',
    'Исполнение ваших желаний начнется в 31 декабря — и продлится весь год.',
    'Даже такая мелочь, как аромат кофе, может вдохновить вас на новые свершения.',
    'Ваши ожидания оправдаются.',
    'Гадая на кофейной гуще, помните, что каждый из нас — творец своей судьбы.',
    'Не ждите счастья. Творите его!',
    'Украсьте свой дом — в этом году он будет вашей главной опорой.',
    'Не оглядывайтесь назад. В вашей власти лишь будущее — творите его.',
    'Лучшее вложение в будущее — это самосовершенствование.',
    'Пора попробовать что-то новое.',
    'Чтобы создать что-то новое, нужно сперва отпустить старое.',
    'Делая выбор, держите в уме: будет ли вас беспокоить то, что беспокоит сегодня, через 10 лет?',
    'Любовь уже за порогом. Откройте ей двери — и сердце.',
    'Вдохните аромат кофе. Это — начало нового дня, и шанс сделать что-то по-новому.',
    'Простые решения часто бывают самыми правильными.',
    'Не забывайте баловать себя.',
    'Если решение принять сложно, прервитесь на чашку кофе.',
    'Поступайте как человек, которым вы могли бы восхищаться.',
    'В голове, полной мечтаний, нет места для страхов'
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

const changePrediction = (number) => {
    const cookiePrediction = document.querySelectorAll('.box-prediction');

    cookiePrediction.forEach(element => {
        element.textContent = getRandomPrediction(number);
    })
}


const cookieInit = () => {

    let step = 0;
    const randomNumber = Math.floor(Math.random() * predictions.length);

    const cookieWrapper = document.querySelector('.cookie-wrapper'),
        cookieList = cookieWrapper.querySelectorAll('.cookie'),
        cookieResult = cookieWrapper.querySelector('.box-result'),
        cookieContent = cookieWrapper.querySelector('.box-content'),
        cookieInit = cookieWrapper.querySelector('.box-init'),
        downloadButton = document.querySelector('.download-button'),
        flash = document.querySelector('.flash'),
        shareVk = document.querySelector('.share-vk'),
        shareWa = document.querySelector('.share-wa'),
        shareTg = document.querySelector('.share-tg');


    shareVk.setAttribute('href', `https://vk.com/share.php?url=https://newyear.maximcoffee.ru&title=Вот моё новогоднее предсказание от Maxim. А что ждёт тебя в новом году? %0A Узнай на https://newyear.maximcoffee.ru/&image=https://newyear.maximcoffee.ru/img/share/default/${randomNumber + 1}.jpg`);
    shareTg.setAttribute('href', `https://t.me/share/url?url=https://newyear.maximcoffee.ru/img/share/default/${randomNumber + 1}.jpg&text= Вот моё новогоднее предсказание от Maxim. А что ждёт тебя в новом году? %0A Узнай на https://newyear.maximcoffee.ru/ !`);
    shareWa.setAttribute('href', `https://wa.me/?text=https://newyear.maximcoffee.ru/img/share/default/${randomNumber + 1}.jpg %0A Вот моё новогоднее предсказание от Maxim. А что ждёт тебя в новом году? %0A Узнай на https://newyear.maximcoffee.ru/ !`);

    cookieResult.classList.add('hidden');

    const shopTip = (showIndex = 0, stepIndex = 0) => {
        cookieList.forEach((cookieItem, cookieIndex) => {
            const cookieTipWrapper = cookieItem.querySelector('.cookie-tip'),
                cookieTipText = document.querySelectorAll('.cookie-tip-text');

            cookieTipText.forEach(element => {
                element.innerHTML = tipsText[stepIndex];
            });

        });
    };

    const closeAllTips = () => {
        const cookieTipWrapper = cookieWrapper.querySelectorAll('.cookie-tip');

        cookieTipWrapper.forEach((tipItem, tipIndex) => {
            tipItem.classList.remove('active');
        });
    }

    const closeAllCookie = () => {
        cookieList.forEach(element => {
            const elementImg = element.querySelector('.cookie__img'),
                elementParent = element.closest('.box-cookie-item'),
                elementList = element.querySelector('.cookie-list');

            elementParent.classList.remove('active');
            elementImg.classList.remove('cookie__img_step-first');

            elementList.classList.remove('step-first')
            elementList.classList.remove('step-second')
        });
    }

    const changeStep = (cookieIndex) => {
        const cookieImg = cookieList[cookieIndex].querySelectorAll('.cookie__img'),
            cookieWrapperList = cookieList[cookieIndex].querySelector('.cookie__img').closest('.cookie-list'),
            __cookieImgClass = 'cookie__img_step',
            __cookieImgClassStepFirst = `${__cookieImgClass}-first`,
            __cookieImgClassStepSecond = `${__cookieImgClass}-second`;

        closeAllCookie();

        if (step === 1) {
            cookieWrapperList.classList.add('step-first');
            cookieImg.forEach(element=>{
                element.classList.add(__cookieImgClassStepFirst);
            });
            cookieList[cookieIndex].closest('.box-cookie-item').classList.add('active');
        }
        if (step === 2) {
            cookieWrapperList.classList.add('step-second');
            cookieImg.forEach(element=>{
                element.classList.add(__cookieImgClassStepFirst);
                element.classList.add(__cookieImgClassStepSecond);
            });
            cookieList[cookieIndex].closest('.box-cookie-item').classList.add('active');
        }
        if (step === 3) {
            cookieWrapperList.classList.add('step-third');

            cookieList[cookieIndex].closest('.box-cookie-item').classList.add('active');
        }
        if (step === 4) {
            cookieResult.classList.remove('hidden'), cookieContent.classList.add('hidden'), changePrediction(randomNumber);
            flash.style.display = 'block';

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({'event': 'prediction_show'});
        }

        shopTip(cookieIndex, step);

        cookieWrapper.dataset.step = step;
    }


    cookieList.forEach((cookieElement, cookieIndex) => {
        onTapOrClick(cookieElement,
            () => {
                const canVibrate = window.navigator.vibrate;
                if (canVibrate) window.navigator.vibrate(100);
                if (cookieElement.closest('.box-cookie-item').classList.contains('active') || step === 0) step++
                changeStep(cookieIndex, cookieElement);
            });
    });

    onTapOrClick(cookieContent, () => {

        if (step !== 1) return false

        const clickTargetImg = event.target.closest('.cookie');
        if (clickTargetImg === null) {
            step = 0;
            closeAllCookie();
            closeAllTips();
        }
    });

    onTapOrClick(downloadButton, () => {
        let folder = 'desktop';
        if (window.innerWidth < 1100) folder = 'mobile';

        const dataUrl = `https://newyear.maximcoffee.ru/img/share/${folder}/${randomNumber + 1}.jpg`;

        download(dataUrl);
    });

    onTapOrClick(cookieInit,()=>{
        document.location.reload();
    });

    const boxItems = document.querySelectorAll('.box__cookie-item');

    boxItems.forEach((element,index)=>{
        let device = 'desktop';
        if (window.innerWidth < 1100) device = 'mobile';

        element.setAttribute('id', `${index+1}-${device}`);

        onTapOrClick(element,()=>{
            element.classList.add('draggable')

            setTimeout(()=>{
                element.classList.remove('draggable');
            },500)
        });
    })
}


document.addEventListener('DOMContentLoaded', () => {
    cookieInit();
});


