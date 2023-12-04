const gamesItemArray = document.querySelectorAll('.game-item');

if (gamesItemArray.length) {
    gamesItemArray.forEach(item => {
        const gameItemHeader = item.querySelector('.game-item-toggler'),
            gameItemContent = item.querySelector('.game-item__content');

        gameItemHeader.addEventListener('click', (e) => {
            e.preventDefault();

            gameItemContent.classList.toggle('game-item__content--active');
            gameItemHeader.classList.toggle('game-item-toggler--active');
        });
    });
}