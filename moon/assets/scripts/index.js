const lerp = (current, target, factor) => current * (1 - factor) + target * factor;


class RocketCount {
    constructor() {
        this.level = 1;
        this.pointToNextLevel = 15;
        this.maxLevel = 4;

        this.taps = 0;
        this.pointCount = 0;
        this.pointStartCount = 30000;
        this.timeout;
        this.slider;
        this.sliderStartSpeed = 5000;

        this.rocketElement = document.querySelector('.rocket');
        this.rocketLevel = this.rocketElement.querySelector('.rocket-level-number');
        this.rocketPoint = this.rocketElement.querySelector('.rocket-point-count');

        this.el = document.querySelector('.app-bg');
        // this.el.children[1].style.cssText = `position: absolute; left: ${100 * -this.direction}%;`;

        this.lerp = { current: 0, target: 0 };
        this.interpolationFactor = 0.1;
        this.startSpeed = .5;
        this.speed = .5;
        this.direction = -1; // -1 (to-left), 1 (to-right) 
        this.render();
    }

    handleTap() {
        this.taps++;
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.taps = 0;
            this.level = 1;
            this.rocketElement.dataset.level = this.level;
            this.changeScore();
        }, 500);

        console.log(this.taps, this.maxLevel * this.pointToNextLevel)

        if (this.taps >= (this.maxLevel * this.pointToNextLevel) - 1) {
            this.taps = 0;
            this.level = 1;
            this.rocketElement.dataset.level = this.level;
        } else {
            this.rocketElement.dataset.level = this.level;
            this.level = Math.ceil(this.taps / this.pointToNextLevel);
            this.pointCount += this.level;
        }

        this.changeScore();
    }

    changeScore() {
        this.rocketLevel.textContent = this.level;
        this.rocketPoint.textContent = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(this.pointCount + this.pointStartCount);
    }

    animate() {
        if(this.taps === 0){
            this.speed = 0;
        }else{
            this.speed = this.startSpeed * this.level;
        }
        this.lerp.target += this.speed;
        this.lerp.current = lerp(this.lerp.current, this.lerp.target, this.interpolationFactor);

        if (this.lerp.target > 100) {
            this.lerp.current -= this.lerp.target;
            this.lerp.target = 0;
        }

        const x = this.lerp.current * this.direction;
        this.el.style.transform = `translateY(${x}%)`;
    }

    render() {
        this.animate();
        window.requestAnimationFrame(() => this.render());
    }

    init() {
        document.addEventListener('click', () => {
            this.handleTap();
        });



        // this.slider.params.speed = 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const rocketGame = new RocketCount;

    rocketGame.init();
});


