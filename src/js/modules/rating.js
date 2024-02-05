export class Rating {
    constructor({ratingClass, overlayClass, itemClass, scoreTextClass, scoreCountClass, overlayColor}) {
        this.ratingClass = ratingClass;
        this.overlayClass = overlayClass;
        this.itemClass = itemClass;
        this.scoreTextClass = scoreTextClass;
        this.scoreCountClass = scoreCountClass;
        this.overlayColor = overlayColor;
        this.curentPosition;
        this.mouseSavedPosition = 20;
        this.clickedScore = 0;
        this.movedPosition = 0;
        this.isWaiting = false;
        this.userScore = undefined;

        this.ratingList = document.querySelector(`.${this.ratingClass}`);
        this.ratingItems = document.querySelectorAll(`.${this.itemClass}`);
        this.overlay = document.querySelector(`.${this.overlayClass}`);
        this.scoreTextElement = document.querySelector(`.${this.scoreTextClass}`);
        this.scoreCountElement = document.querySelector(`.${this.scoreCountClass}`);

        this.scoreTextElement.style.display = 'none';

        this.ratingItems.forEach((item, index) => {
            if(index > 0) {
                item.addEventListener('click', e => {
                    const liPosition = this.getMousePercentPosition(e.x, e.target);
                    this.clickedScore = ((+e.target.textContent) - 1 + liPosition / 100).toFixed(1);
                });
    
                item.addEventListener('mousemove', e => {
                    this.movedPosition = +e.target.textContent;
                });
            }
        });

        this.setOverlay(this.mouseSavedPosition);
        this.updateActivity();

        function mouseEnterList(e) {
            e.target.addEventListener('click', clickList);
            e.target.addEventListener('mousemove', mouseMoveList);
        }

        const mouseLeaveList = () => {
            this.ratingList.removeEventListener('click', clickList);
            this.ratingList.removeEventListener('mousemove', mouseMoveList);
            this.setOverlay(this.mouseSavedPosition);
            this.updateActivity(Math.floor(+this.userScore + 1));
        }

        const mouseMoveList = (e) => {
            this.setOverlay(this.getMousePercentPosition(e.x));
            this.updateActivity();
        }

        this.ratingList.addEventListener('mouseenter', mouseEnterList);

        this.ratingList.addEventListener('mouseleave', mouseLeaveList);

        const clickList = (e) => {
            const position = this.getMousePercentPosition(e.x);
            if(position > 20) {
                if(this.isWaiting) {
                    this.setOverlay(position);
                    this.ratingList.addEventListener('mouseenter', mouseEnterList);
                    this.ratingList.addEventListener('mousemove', mouseMoveList);
                    this.ratingList.addEventListener('mouseleave', mouseLeaveList);
    
                    this.isWaiting = false;
                } else {
                    this.mouseSavedPosition = position;
                    this.ratingList.removeEventListener('mousemove', mouseMoveList);
                    this.ratingList.removeEventListener('mouseenter', mouseEnterList);
                    this.ratingList.removeEventListener('mouseleave', mouseLeaveList);
                    this.ratingList.addEventListener('click', clickList);
                    this.isWaiting = true;

                    if(this.movedPosition === 11) {
                        this.clickedScore = 10;
                    }
                    this.userScore = this.clickedScore;

                    this.updateScore();
                }
            }
        }
    }

    getMousePercentPosition(eventPosition, element = this.ratingList) {
        const rect = element.getBoundingClientRect();

        return ((eventPosition - rect.x) / rect.width) * 100;
    }

    setOverlay(percentage) {
        if(percentage >= 99) {
            this.movedPosition = 11;
            percentage = 100;
        }
        if(percentage <= 100 && percentage >= 20) {
            this.overlay.style.background = `linear-gradient(to left, ${this.overlayColor} 0%, ${this.overlayColor} ${100-percentage}%, #ffffff00 0%, #ffffff00 100%)`;
        }        
    }

    updateActivity(position = this.movedPosition) {
        this.ratingItems.forEach((item, index) => {
            item.classList.remove(`${this.itemClass}--active`);
            if(index < position || index === 0) {
                item.classList.add(`${this.itemClass}--active`);
            }
        });
    }

    updateScore(isDataLoaded) {
        if(!isDataLoaded) {
            localStorage.setItem('userScore', JSON.stringify({
                mouseSavedPosition: this.mouseSavedPosition,
                userScore: this.userScore,
                movedPosition: this.movedPosition,
                clickedScore: this.clickedScore,
            }));
        }
        this.scoreTextElement.style.display = 'block';
        this.scoreCountElement.textContent = this.userScore;
    }

    init() {
        const userData = JSON.parse(localStorage.getItem('userScore'));
        if(userData) {
            this.mouseSavedPosition = userData.mouseSavedPosition;
            this.setOverlay(this.mouseSavedPosition);
            this.userScore = userData.userScore;
            this.movedPosition = userData.movedPosition;
            this.clickedScore = userData.clickedScore;
            this.updateActivity();
            this.updateScore();
        }
    }

    updateOverlayColor(color) {
        this.overlayColor = color;
        this.setOverlay(this.mouseSavedPosition);
    }
}

