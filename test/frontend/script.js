// Создаем объект TimerManager при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    new TimerManager().fetchTimerDataFromServer();
});

// Класс для управления таймером
class TimerManager {
    constructor() {
        // Получаем ссылки на элементы интерфейса
        this.container = document.querySelector(".container");
        this.timer = document.querySelector(".timer");
        this.testUser = { login: "test" };
        this.url = "http://localhost:3000";
        this.buttonsClickedCount = 0;
        this.countdownInterval = null;
        // Привязываем обработчик события к контексту класса
        this.startButtonClickHandler = this.startButtonClickHandler.bind(this);
        this.fetchTimerDataFromServer =
            this.fetchTimerDataFromServer.bind(this);

        // Добавляем обработчик события на кнопку
        this.container.addEventListener("click", this.startButtonClickHandler);
        // Загружаем данные таймера при загрузке страницы
        document.addEventListener(
            "DOMContentLoaded",
            this.fetchTimerDataFromServer
        );
    }

    // Обработчик события клика по кнопке
    startButtonClickHandler(event) {
        event.target.textContent = "Выбит 1 зуб";
        event.target.disabled = true;
        this.buttonsClickedCount++;

        // Если кнопка нажата 5 раз, обновляем таймер на сервере
        if (this.buttonsClickedCount === 5) {
            this.updateTimerOnServer();
        }
    }

    // Запрашивает данные таймера с сервера
    fetchTimerDataFromServer() {
        fetch(`${this.url}/api`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                // Запускаем таймер с полученными данными о времени
                this.startCountdownTimer(
                    this.calculateRemainingTime(data.user.tavern_cooldown)
                );
            })
            .catch((error) => {
                console.error("Error loading timer data:", error);
            });
    }

    // Обновляет таймер на сервере
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
                // Запускаем таймер с обновленными данными о времени
                this.startCountdownTimer(
                    this.calculateRemainingTime(data.timerRemaining)
                );
            })
            .catch((error) => {
                console.error("Error updating timer data:", error);
            });
    }

    // Вычисляет оставшееся время таймера
    calculateRemainingTime(coldown) {
        const serverColdown = new Date(coldown);
        const currentTime = new Date();
        const timeDifference = serverColdown - currentTime;
        const timeRemaining = Math.max(timeDifference, 0);
        const minutes = Math.floor(timeRemaining / 60000);
        const seconds = Math.floor((timeRemaining % 60000) / 1000);

        return { minutes, seconds };
    }

    // Запускает таймер обратного отсчета
    startCountdownTimer(timeRemaining) {
        clearInterval(this.countdownInterval);
        const totalSeconds = timeRemaining.minutes * 60 + timeRemaining.seconds;

        let secondsLeft = totalSeconds;
        this.countdownInterval = setInterval(() => {
            const minutes = Math.floor(secondsLeft / 60);
            const seconds = secondsLeft % 60;

            this.timer.textContent = `${minutes}:${
                seconds < 10 ? "0" : ""
            }${seconds}`;

            if (--secondsLeft < 0) {
                clearInterval(this.countdownInterval);
            }
        }, 1000);
    }
}
