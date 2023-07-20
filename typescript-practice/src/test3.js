"use strict";
var TransferStatus;
(function (TransferStatus) {
    TransferStatus["Pending"] = "pending";
    TransferStatus["Rejected"] = "rejected";
    TransferStatus["Completed"] = "completed";
})(TransferStatus || (TransferStatus = {}));
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["NotFound"] = "Not found: 404";
    ErrorMessages["NotEnoughSpace"] = "Not enough space: 507";
    ErrorMessages["Forbidden"] = "Forbidden: 403";
})(ErrorMessages || (ErrorMessages = {}));
// Класс должен имплементировать ITransfer и TransferError
class SingleFileTransfer {
    constructor(status) {
        this.status = TransferStatus.Pending;
    }
    checkTransferStatus() {
        if (this.status) {
            return `Status: ${this.status}`;
        }
        else {
            return `Warning: You didn't start transfer!`;
        }
    }
    start(path, data) {
        this.path = path;
        this.data = data;
        return `You started transfer on path: ${path}, it includes this data: ${data}`;
    }
    stop(reason) {
        this.status = TransferStatus.Completed;
        return `Reason: ${reason}, Stop time: ${new Date().toDateString()}`;
    }
    makeError(message) {
        this.status = TransferStatus.Rejected;
        this.message = message;
        return `Error: ${message}, Status: ${this.status}`;
    }
}
const transfer = new SingleFileTransfer(TransferStatus.Pending);
console.log(transfer.checkTransferStatus());
console.log(transfer.start("/src/path", ["file1", "file2", "file3"]));
console.log(transfer.stop("Test"));
console.log(transfer.checkTransferStatus());
console.log(transfer.makeError(ErrorMessages.NotFound));
// Реализация очереди через массив
// Класс ArrayQueue должен имплементировать интерфейс Queue
// Класс может работать с любым типом данных, то есть помещать любые данные в массив  <-- Важно
// Очередь - это структура данных, которая выглядит как реальная очередь в магазине
// Первый, кто подошел к прилавку, первым и уйдет. Так же и в коде при выполнении задач
// Чуть подробнее можно найти в википедии или на других сайтах по поиску "Очередь структура данных"
class ArrayQueue {
    constructor() {
        this.queue = [];
        this.enqueue = (item) => {
            this.queue.push(item);
        }; // поставить в очередь
        this.dequeue = () => {
            if (!this.isEmpty()) {
                return this.queue.shift();
            }
            else {
                return undefined;
            }
        }; // исключить из очереди
        this.peek = () => {
            if (!this.isEmpty()) {
                return this.queue[this.length() - 1];
            }
            else {
                return null;
            }
        }; // посмотреть первый элемент
        this.isEmpty = () => {
            if (this.length() === 0) {
                return true;
            }
            else {
                return false;
            }
        }; // проверка на "пустоту" сущности
        this.length = () => {
            return this.queue.length;
        }; // проверка на длину
        // Создать приватное свойство queue, которое по умолчанию массив и содержит массив любого типа
        // Подсказка по методам:
        // при добавлении в очередь можно выполнить метод push
        // при удалении - shift, так как нужно удалить первый элемент.
        // Обратите внимание на возвращаемое значение
        // isEmpty может использоваться в других методах
    }
}
// Стэк - это еще одна структура данных. Проще всего её представить как стопку листов на столе
// Последний, который вы положите сверху, вы и первым потом возьмете.
// Чуть подробнее можно найти в википедии или на других сайтах по поиску "Стэк структура данных"
// Класс Stack содержит другие методы, так что ничего имплементировать не нужно
// Класс может работать с любым типом данных, то есть помещать любые данные в массив и содержит массив любого типа  <-- Важно
class Stack {
    constructor(limit = Number.MAX_VALUE) {
        // Создать приватное свойство stack, которое по умолчанию массив и содержит массив любого типа
        // Создать приватное свойство limit, которое будет типом number
        // Здесь мы установим лимит на стопку листов.
        // При переполнении стэка программа зависает, а очень высокая стопка листов падает
        // Так что лимит всегда должен быть
        this.stack = [];
        this.push = (value) => {
            if (this.length() == this.limit) {
                throw new Error("Stack is full");
            }
            else {
                this.stack.push(value);
            }
            // Добавляет элемент в стэк
            // Если стэк переполнен - выбрасывает ошибку (throw new Error)
        };
        this.pop = () => {
            if (!this.isEmpty()) {
                return this.stack.pop();
            }
            else {
                throw new Error("Stack is empty");
            }
            // Удаляет последний элемент массива
            // Если в стеке пусто - выбрасывает ошибку (throw new Error)
            // При удалении элемента возвращает его
            // Простыми словами: вы берете верхний лист в стопке и используете его
            // Если на столе нет листов - получается ошибка, брать нечего
        };
        this.length = () => {
            return this.stack.length;
            // Возвращает кол-во элементов в стэке
        };
        this.isEmpty = () => {
            if (this.length() < 1) {
                return true;
            }
            else {
                return false;
            }
            // Проверяет стэк на "пустоту"
        };
        this.top = () => {
            if (!this.isEmpty()) {
                return this.stack[this.length() - 1];
            }
            else {
                return null;
            }
            // Возвращает последний (верхний) элемент стэка, но не удаляет его
            // Вы просто читаете, что написано на верхнем листе
            // Если стэк пуст - вернется null
        };
        this.limit = limit;
    }
}
// Для тестов
const arrTest1 = new ArrayQueue();
arrTest1.enqueue(5);
arrTest1.enqueue(10);
console.log(`Peek test: `, arrTest1.peek());
console.log(`Dequeue test: `, arrTest1.dequeue());
console.log(`length test: `, arrTest1.length());
const arrTest2 = new ArrayQueue();
arrTest2.enqueue("5");
arrTest2.enqueue("10");
console.log(`Peek test: `, arrTest2.peek());
console.log(`Dequeue test: `, arrTest2.dequeue());
console.log(`length test: `, arrTest2.length());
const stackTest1 = new Stack(10);
stackTest1.push(20);
stackTest1.push(50);
console.log(`Top test: `, stackTest1.top());
console.log(`Pop test: `, stackTest1.pop());
console.log(`Length test: `, stackTest1.length());
const stackTest2 = new Stack(10);
stackTest2.push("20");
stackTest2.push("50");
console.log(`Top test: `, stackTest2.top());
console.log(`Pop test: `, stackTest2.pop());
console.log(`Length test: `, stackTest2.length());
