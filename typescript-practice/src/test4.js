"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
let ShippingContainer = class ShippingContainer {
    // lastCalculation: string;
    // createdAt: Date;
    constructor(width, length, height) {
        this.width = width;
        this.length = length;
        this.height = height;
        validate(this, "width", width);
        validate(this, "length", length);
        validate(this, "height", height);
    }
    calcArea(multiply) {
        return this.width * this.length * (multiply ? multiply : 1);
    }
    calcVolume(multiply) {
        return (this.width * this.length * this.height * (multiply ? multiply : 1));
    }
};
__decorate([
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], ShippingContainer.prototype, "width", void 0);
__decorate([
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], ShippingContainer.prototype, "length", void 0);
__decorate([
    IsInt(),
    Min(1),
    Max(8),
    __metadata("design:type", Number)
], ShippingContainer.prototype, "height", void 0);
__decorate([
    MethodDecorator("calcArea"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Number)
], ShippingContainer.prototype, "calcArea", null);
__decorate([
    MethodDecorator("calcVolume"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ShippingContainer.prototype, "calcVolume", null);
ShippingContainer = __decorate([
    ClassDecorator,
    __metadata("design:paramtypes", [Number, Number, Number])
], ShippingContainer);
// 1. Необходимо создать декоратор класса, который будет записывать дату создания контейнера
// Простыми словами - создавать в нем новое свойство createdAt с датой создания экземпляра
// 2. Необходимо создать декораторы IsInt, Min и Max, которые будут валидировать свойства класса
// Применение смотри в самом классе. При ошибке выполняйте throw new Error
// IsInt проверяет на то, что было передано целое число
// 3. Необходимо создать декоратор метода, который при каждом запуске метода будет создавать
// ИЛИ менять содержимое свойства самого класса lastCalculation
// Как значение записывать в него строку "Последний подсчет ${method} был ${Дата}",
// Где method - это название подсчета, который передается при вызове декоратора (площадь или объем)
function ClassDecorator(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.createdAt = new Date();
        }
    };
}
function IsInt() {
    return function (target, propertyKey) {
        Reflect.defineMetadata("IsInt", true, target, propertyKey);
    };
}
function Min(minValue) {
    return function (target, propertyKey) {
        Reflect.defineMetadata("Min", minValue, target, propertyKey);
    };
}
function Max(maxValue) {
    return function (target, propertyKey) {
        Reflect.defineMetadata("Max", maxValue, target, propertyKey);
    };
}
function validate(target, propertyKey, value) {
    if (Reflect.hasMetadata("IsInt", target, propertyKey) &&
        (!Number.isInteger(value) || value !== parseInt(value))) {
        throw new Error(`Число повинно бути цілим!!! (${propertyKey}=${value})`);
    }
    else if (Reflect.hasMetadata("Min", target, propertyKey) &&
        value < Reflect.getMetadata("Min", target, propertyKey)) {
        throw new Error(`Число повинно бути більшим ніж мінімальне > ${Reflect.getMetadata("Min", target, propertyKey)}!!! (${propertyKey}=${value})`);
    }
    else if (Reflect.hasMetadata("Max", target, propertyKey) &&
        value > Reflect.getMetadata("Max", target, propertyKey)) {
        throw new Error(`Число повинно бути меншим ніж максимальне < ${Reflect.getMetadata("Max", target, propertyKey)}!!! (${propertyKey}=${value})`);
    }
    return true;
}
function finalValidate(obj) {
    if (obj && typeof obj == "object" && !Array.isArray(obj)) {
        for (let key in obj) {
            validate(obj, key, obj[key]);
        }
    }
}
function MethodDecorator(method) {
    return (target, propertyKey, descriptor) => {
        const oldValue = descriptor.value;
        descriptor.value = function (...args) {
            this.lastCalculation = `Останній підрахунок ${method} був ${new Date().toTimeString()}`;
            return oldValue.apply(this, args);
        };
    };
}
const container = new ShippingContainer(7, 7, 7);
container.width = 2;
container.height = 6;
console.log(container.calcArea());
console.log(container.lastCalculation);
console.log(container.calcVolume());
console.log(container.lastCalculation);
finalValidate(container);
