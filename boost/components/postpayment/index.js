const heroesBlock = document.querySelector('.heroes');
if(heroesBlock){
    const heroesGridArray = heroesBlock.querySelectorAll('[data-attribute]');
    const heroesBanBlock = heroesBlock.querySelector('[data-state="ban"]'),
        heroesPickBlock = heroesBlock.querySelector('[data-state="pick"]');
    if(heroesGridArray.length){
        const createBlock = (heroName) =>{
            const heroesBlock = document.createElement('div'),
                heroesImg = document.createElement('img');

            heroesBlock.classList.add('heroes-grid__item');
            heroesImg.classList.add('heroes-grid__img');

            heroesBlock.dataset.heroeName = heroName;
            heroesImg.setAttribute('src',`${__path}/${heroName}.png`);
            heroesBlock.append(heroesImg);

            return heroesBlock
        }
        const drawBanPickList = ()=>{
            heroesBanBlock.innerHTML ='';
            heroesPickBlock.innerHTML ='';

            picArray.forEach(element=>{
                const newBlock = createBlock(element);
                heroesPickBlock.append(newBlock);
            });
            banArray.forEach(element=>{
                const newBlock = createBlock(element);
                heroesBanBlock.append(newBlock);
            });
        }

        const __path = 'assets/images/heroes';
        let picArray = [],
            banArray = [];
        heroesGridArray.forEach(heroesGrid =>{
            const heroesAttr = heroesGrid.dataset.attribute;
            const heroesNameArray = heroesArray[heroesAttr];
            heroesNameArray.forEach(heroName=>{
                const newBlock = createBlock(heroName);
                let clickCounter = 0;
                newBlock.addEventListener('click',(e)=>{
                    e.preventDefault();

                    clickCounter+=1;

                    if(picArray.length > 5 && banArray.length > 5){
                        clickCounter = 0;
                    }

                    if(clickCounter === 1){
                        if(picArray.length < 5){
                            newBlock.classList.add('heroes-grid__item--pick');
                            picArray.push(heroName);
                        }
                    }else if(clickCounter === 2){
                        newBlock.classList.remove('heroes-grid__item--pick');
                        picArray = picArray.filter((element)=> element !== heroName);

                        if(banArray.length < 5){
                            newBlock.classList.add('heroes-grid__item--ban');
                            banArray.push(heroName);
                        }
                    }

                    if(clickCounter === 3){
                        newBlock.classList.remove('heroes-grid__item--pick');
                        newBlock.classList.remove('heroes-grid__item--ban');
                        clickCounter = 0;

                        banArray = banArray.filter((element)=> element !== heroName);
                    }

                    drawBanPickList();
                });
                heroesGrid.append(newBlock);
            });
        });
    }
}

const timeBlockWrapper = document.querySelector('.time-block-wrapper');
if(timeBlockWrapper){
    const timeButton = timeBlockWrapper.querySelector('.time-block-button');
    timeButton.addEventListener('click',(e)=>{
        e.preventDefault();

        const timeBlockArray = [...timeBlockWrapper.querySelectorAll('.time-block')];
        if(timeBlockArray.length + 1 === 4) {
            timeButton.remove();
        }
        const lastBlock = timeBlockArray[timeBlockArray.length - 1];
        const clonedBlock = lastBlock.cloneNode(true);
        const clonedInputArray = clonedBlock.querySelectorAll('input');

        clonedInputArray.forEach((element,index)=>{
            element.name = `time-${timeBlockArray.length * 2 + (index + 1)}`;
        });

        lastBlock.after(clonedBlock);
    });
}


const paymentSlider = new Swiper('.payment-slider', {
    spaceBetween: 16,
    slidesPerView: 1,
    autoHeight: true,
    effect: 'fade',
    speed: 500,
    navigation: {
        nextEl: '.payment-slider__button--next',
        prevEl: '.payment-slider__button--prev',
        disabledClass: 'payment-slider__button--disabled',
    }
});