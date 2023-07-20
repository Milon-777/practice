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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const limitMetaDataKey = Symbol("limit");
// changeDoorStatus(changeAmountOfFuel(myCar)) - композиція декораторів
// @closeCar
let myCar1 = class myCar1 {
    constructor() {
        this.fuel = "5%";
        this._weight = 1000;
        this.freeSeats = 3;
    }
    // @logOnSet
    set weight(weight) {
        this._weight = this._weight + weight;
    }
    // @logOnGet
    get weight() {
        return this._weight;
    }
    isOpen(value) {
        return this.open ? "open" : `close ${value}`;
    }
    startTravel(passengers) {
        console.log(`Started with ${passengers} passengers`);
    }
};
__decorate([
    log,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], myCar1.prototype, "weight", null);
__decorate([
    checkNumberOfSeats(5),
    __metadata("design:type", Number)
], myCar1.prototype, "freeSeats", void 0);
__decorate([
    checkAmountOfFuel,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], myCar1.prototype, "isOpen", null);
__decorate([
    validate,
    __param(0, limit),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], myCar1.prototype, "startTravel", null);
myCar1 = __decorate([
    changeDoorStatus(false),
    changeAmountOfFuel(100)
], myCar1);
function limit(target, propertyKey, parameterIndex) {
    let limitedParameters = Reflect.getOwnMetadata(limitMetaDataKey, target, propertyKey) || [];
    limitedParameters.push(parameterIndex);
    Reflect.defineMetadata(limitMetaDataKey, limitedParameters, target, propertyKey);
}
function validate(target, propertyKey, descriptor) {
    let method = descriptor.value;
    descriptor.value = function (...args) {
        let limitedParameters = Reflect.getOwnMetadata(limitMetaDataKey, target, propertyKey);
        if (limitedParameters) {
            for (let index of limitedParameters) {
                if (args[index] > 4) {
                    throw new Error("Не більше чотирьох пасажирів");
                }
            }
        }
        return method === null || method === void 0 ? void 0 : method.apply(this, args);
    };
}
function log(target, propertyKey, descriptor) {
    const oldSet = descriptor.set;
    const oldGet = descriptor.get;
    descriptor.set = function (...args) {
        console.log(`Changing value to ${[...args]}`);
        return oldSet === null || oldSet === void 0 ? void 0 : oldSet.apply(this, args);
    };
    descriptor.get = function () {
        console.log(`TEST`);
        return oldGet === null || oldGet === void 0 ? void 0 : oldGet.apply(this);
    };
}
const myCar = {
    fuel: "5%",
    open: true,
    freeSeats: 3,
    isOpen() {
        console.log(this.fuel);
        return this.open ? "open" : "close";
    },
};
function checkNumberOfSeats(limit) {
    return function (target, propertyKey) {
        let symbol = Symbol();
        const getter = function () {
            return this[symbol];
        };
        const setter = function (newAmount) {
            if (newAmount >= 1 && newAmount < limit) {
                this[symbol] = newAmount;
            }
            else {
                // console.log(`Перевищує ліміт - ${limit} !!!`);
                Object.defineProperty(target, "errors", {
                    value: `Перевищує ліміт - ${limit} !!!`,
                });
            }
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
        });
    };
}
function changeDoorStatus(status) {
    console.log("door init");
    return (constructor) => {
        console.log("door changed");
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.open = status;
            }
        };
    };
}
function checkAmountOfFuel(target, _, descriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function (...args) {
        console.log(this.fuel);
        return oldValue.apply(this, args);
    };
}
function changeAmountOfFuel(amount) {
    console.log("fuel init");
    return (constructor) => {
        console.log("fuel changed");
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.fuel = `${amount}%`;
            }
        };
    };
}
////
// function checkAmountOfFuel(target: any, context: ClassMethodDecoratorContext) {
//     return function (this: any, ...args: any[]) {
//         console.log(this.fuel);
//         return target.apply(this, args);
//     };
// }
//////////////////////////////////////////////////////////////////////////////////////
// function logOnSet<T, R>(
//     target: (this: T, value: number) => R,
//     context: ClassSetterDecoratorContext<T, number>
// ) {
//     return function (this: T, ...args: any): R {
//         console.log(`Changing value to ${[...args]}`);
//         return target.apply(this, args);
//     };
// }
// function logOnGet<T, R>(
//     target: (this: T) => R,
//     context: ClassGetterDecoratorContext<T, number>
// ) {
//     return function (this: T): R {
//         console.log(`TEST`);
//         return target.apply(this);
//     };
// }
// function checkNumberOfSeats(limit: number) {
//     return function (target: undefined, context: ClassFieldDecoratorContext) {
//         return function (this: any, newAmount: number) {
//             if (newAmount >= 1 && newAmount < limit) {
//                 return newAmount;
//             } else {
//                 throw Error(`Перевищує ліміт - ${limit} !!! Або менше 1`);
//             }
//         };
//     };
// }
// function checkAmountOfFuel<T, A extends any[], R>(
//     target: (this: T, ...args: A) => R,
//     context: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>
// ) {
//     return function (this: T, ...args: A): R {
//         // console.log(this.fuel);
//         console.log(`${String(context.name)} was launched`);
//         return target.apply(this, args);
//     };
// }
// function changeDoorStatus(status: boolean) {
//     console.log("door init");
//     return <T extends { new (...args: any[]): {} }>(
//         target: T,
//         context: ClassDecoratorContext<T>
//     ) => {
//         console.log("door changed");
//         return class extends target {
//             open = status;
//         };
//     };
// }
// function changeAmountOfFuel(amount: number) {
//     console.log("fuel init");
//     return <T extends { new (...args: any[]): {} }>(
//         target: T,
//         context: ClassDecoratorContext<T>
//     ) => {
//         console.log("fuel changed");
//         return class extends target {
//             fuel = `${amount}%`;
//         };
//     };
// }
// function closeCar<T extends { new (...args: any[]): {} }>(constructor: T) {
//     return class extends constructor {
//         open = false;
//     };
// }
// function addFuel(car: myCar1) {
//     car.fuel = "100%";
//     console.log("add fuel");
//     return car;
// }
const car = new myCar1();
car.startTravel(3);
// car.freeSeats = -1;
// console.log(car.freeSeats);
// console.log(car.errors);
// car.weight = 110;
// console.log(car.weight);
// f(x(y())) - Композиція функцій
