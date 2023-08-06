const mysql = require("mysql2");

// Класс для работы с базой данных
class Database {
    constructor() {
        // Подключение к базе данных
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "database",
        });
    }

    // Выполнение SQL-запроса
    async query(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, rows, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Получение данных о пользователе по логину
    async getUserData(login) {
        try {
            const rows = await this.query(
                "SELECT * FROM users WHERE login = ?",
                [login]
            );

            if (rows.length > 0) {
                return rows[0];
            } else {
                // Если пользователь не найден, вернуть значение по умолчанию (например, 0)
                return 0;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            // Обработка ошибок
            throw error;
        }
    }

    // Обновление таймера пользователя
    async updateUserTimer(login) {
        try {
            const currentDate = new Date();
            const futureDate = new Date(currentDate.getTime() + 15 * 60 * 1000);
            await this.query(
                "UPDATE users SET tavern_cooldown = ? WHERE login = ?",
                [futureDate, login]
            );

            return futureDate;
        } catch (error) {
            console.error("Error updating timer data:", error);
            // Обработка ошибок
            throw error;
        }
    }
}

module.exports = Database;
