const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const Database = require("./database.js");

const app = express();
app.use(cors());
app.use(express.json());
const login = "test";
const database = new Database();

// Обработчик маршрута для получения данных о пользователе
app.get("/api", async (req, res) => {
    try {
        const user = await database.getUserData(login);
        res.json({ user });
    } catch (error) {
        console.error("Error handling user data request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Обработчик маршрута для обновления таймера
app.put("/api/updateTimer", async (req, res) => {
    const { login } = req.body;

    try {
        // Получаем данные о пользователе по его логину
        const user = await database.getUserData(login);

        if (user !== 0) {
            const timerRemaining = await database.updateUserTimer(login);

            // Возвращаем обновленные данные о пользователе на клиент
            res.json({ timerRemaining });
        } else {
            // Если пользователь не найден, возвращаем ошибку
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error updating timer data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
