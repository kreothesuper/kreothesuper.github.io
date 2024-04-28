
class RocketCount {
    constructor() {
        this.level = 1;
        this.pointToNextLevel = 15;
        this.maxLevel = 5;

        this.taps = 0;
        this.pointCount = 0;
        this.pointStartCount = 30000;
        this.timeout;

        this.rocketElement = document.querySelector('.rocket');
        this.rocketLevel = this.rocketElement.querySelector('.rocket-level-number');
        this.rocketPoint = this.rocketElement.querySelector('.rocket-point-count');
    }

    handleTap() {
        this.taps++;
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.taps = 0;
            this.level = 1;

            this.changeScore();
        }, 500);

        if(this.level >= this.maxLevel){
            this.taps = 0;
            this.level = 1;
        }else{
            this.level = Math.ceil(this.taps / this.pointToNextLevel);
            this.pointCount += this.level;
        }

        this.changeScore();

      
        // console.log("Level:" + Math.ceil(this.taps/ this.pointToNextLevel))
        // console.log("Taps: " + this.taps);
    }

    changeScore(){
        this.rocketLevel.textContent = this.level;
        this.rocketPoint.textContent = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(this.pointCount + this.pointStartCount);
    }

    init() {
        document.addEventListener('click',()=>{
            this.handleTap();
        });
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    const rocketGame = new RocketCount;

    rocketGame.init();
});