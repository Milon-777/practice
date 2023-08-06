export default class TimerManager {
    constructor() {
        this.container = document.querySelector(".container");
        this.timer = document.querySelector(".timer");
        this.testUser = { login: "test" };
        this.url = "http://localhost:3000";
        this.clickedButtons = 0;
        this.timerInterval = null;
        this.startButtonClickHandler = this.startButtonClickHandler.bind(this);
        this.loadTimerFromServer = this.loadTimerFromServer.bind(this);

        this.container.addEventListener("click", this.startButtonClickHandler);
        document.addEventListener("DOMContentLoaded", this.loadTimerFromServer);
    }

    startButtonClickHandler(event) {
        event.target.textContent = "Выбит 1 зуб";
        event.target.disabled = true;
        this.clickedButtons++;

        if (this.clickedButtons === 5) {
            this.updateTimerOnServer();
        }
    }

    loadTimerFromServer() {
        fetch(`${this.url}/api`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                this.startTimer(
                    this.coldownFromServer(data.user.tavern_cooldown)
                );
            })
            .catch((error) => {
                console.error("Error loading timer data:", error);
            });
    }

    updateTimerOnServer() {
        fetch(`${this.url}/api/updateTimer`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.testUser),
        })
            .then((response) => response.json())
            .then((data) => {
                this.startTimer(this.coldownFromServer(data.timerRemaining));
            })
            .catch((error) => {
                console.error("Error updating timer data:", error);
            });
    }

    coldownFromServer(coldown) {
        const serverColdown = new Date(coldown);
        const currentTime = new Date();
        const timeDifference = serverColdown - currentTime;
        const timeRemaining = Math.max(timeDifference, 0);
        const minutes = Math.floor(timeRemaining / 60000);
        const seconds = Math.floor((timeRemaining % 60000) / 1000);

        return { minutes, seconds };
    }

    startTimer(timeRemaining) {
        clearInterval(this.timerInterval);
        console.log("time: ", timeRemaining);
        const totalSeconds = timeRemaining.minutes * 60 + timeRemaining.seconds;

        let secondsLeft = totalSeconds;
        this.timerInterval = setInterval(() => {
            const minutes = Math.floor(secondsLeft / 60);
            const seconds = secondsLeft % 60;

            this.timer.textContent = `${minutes}:${
                seconds < 10 ? "0" : ""
            }${seconds}`;

            if (--secondsLeft < 0) {
                clearInterval(this.timerInterval);
                console.log("Timer has expired!");
            }
        }, 1000);
    }
}
