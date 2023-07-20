"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const a = [1, 2, 3];
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        const p = new Promise((resolve, reject) => {
            resolve(1);
        });
    });
}
const check = {
    drive: true,
    kpp: false,
};
function logMiddleware(data) {
    console.log(data);
    return data;
}
const res3 = logMiddleware("10");
function splitArray(data) {
    const l = data.length / 2;
    return data.splice(0, l);
}
splitArray([1, 2, 3, 4]);
function toString(data) {
    if (Array.isArray(data)) {
        return data.toString();
    }
    switch (typeof data) {
        case "string":
            return data;
        case "number":
        case "symbol":
        case "bigint":
        case "function":
        case "boolean":
            return data.toString();
        case "object":
            return JSON.stringify(data);
        default:
            return undefined;
    }
}
const split = splitArray;
const logLine = {
    timeStamp: new Date(),
    data: {
        a: 1,
    },
};
class Vehicle2 {
}
function kmToMiles(vehicle) {
    vehicle.run = vehicle.run / 0.62;
    return vehicle;
}
class LCV extends Vehicle2 {
}
const vehicle = kmToMiles(new Vehicle2());
const lcv = kmToMiles(new LCV());
function logId(id, additionalData) {
    console.log(id);
    return { id, data: additionalData };
}
function sortArray(a, b) {
    return a.id - b.id;
}
function sortObj(array, methodSort) {
    return array.sort((a, b) => {
        switch (methodSort) {
            case "ascending":
                return a.id - b.id;
            case "descending":
                return a.id - b.id;
        }
    });
}
class Resp {
    constructor(data, error) {
        if (data) {
            this.data = data;
        }
        if (error) {
            this.error = error;
        }
    }
}
new Resp("Data", 0);
class HTTPResp extends Resp {
    setCode(code) {
        this.code = code;
    }
}
const res4 = new HTTPResp("data", 90);
class Accordion {
}
class List {
    constructor(items) {
        this.items = items;
    }
}
////////////////////
// Примеры миксинов
////////////////////
// Миксин, который добавляет свойство
function Timestamped(Base) {
    return class extends Base {
        constructor() {
            super(...arguments);
            this.timestamp = Date.now();
        }
    };
}
// миксин, который добавляет свойство и методы
function Activatable(Base) {
    return class extends Base {
        constructor() {
            super(...arguments);
            this.isActivated = false;
        }
        activate() {
            this.isActivated = true;
        }
        deactivate() {
            this.isActivated = false;
        }
    };
}
////////////////////
// Использование для создания классов
////////////////////
// Простой класс
class User7 {
    constructor() {
        this.name = "";
    }
}
// Пользователь с отметкой времени
const TimestampedUser = Timestamped(User);
// Пользователь с отметкой времени и доступный для активации
const TimestampedActivatableUser = Timestamped(Activatable(User));
////////////////////
// Использование созданных классов
////////////////////
const timestampedUserExample = new TimestampedUser();
console.log(timestampedUserExample.timestamp);
const timestampedActivatableUserExample = new TimestampedActivatableUser();
console.log(timestampedActivatableUserExample.timestamp);
console.log(timestampedActivatableUserExample.isActivated);
