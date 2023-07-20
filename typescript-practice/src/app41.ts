import "reflect-metadata";
const limitMetaDataKey = Symbol("limit");

interface ICar {
    fuel: string;
    open: boolean;
    freeSeats: number;
}

// changeDoorStatus(changeAmountOfFuel(myCar)) - композиція декораторів

// @closeCar
@changeDoorStatus(false)
@changeAmountOfFuel(100)
class myCar1 implements ICar {
    fuel: string = "5%";
    open: boolean;
    errors: any;
    _weight: number = 1000;

    // @logOnSet
    @log
    set weight(weight: number) {
        this._weight = this._weight + weight;
    }

    // @logOnGet
    get weight() {
        return this._weight;
    }

    @checkNumberOfSeats(5)
    freeSeats: number = 3;

    @checkAmountOfFuel
    isOpen(value: string): string {
        return this.open ? "open" : `close ${value}`;
    }

    @validate
    startTravel(@limit passengers: number): void {
        console.log(`Started with ${passengers} passengers`);
    }
}

function limit(
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
) {
    let limitedParameters: number[] =
        Reflect.getOwnMetadata(limitMetaDataKey, target, propertyKey) || [];
    limitedParameters.push(parameterIndex);
    Reflect.defineMetadata(
        limitMetaDataKey,
        limitedParameters,
        target,
        propertyKey
    );
}

function validate(
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
) {
    let method = descriptor.value;

    descriptor.value = function (...args: any) {
        let limitedParameters: number[] = Reflect.getOwnMetadata(
            limitMetaDataKey,
            target,
            propertyKey
        );

        if (limitedParameters) {
            for (let index of limitedParameters) {
                if (args[index] > 4) {
                    throw new Error("Не більше чотирьох пасажирів");
                }
            }
        }
        return method?.apply(this, args);
    };
}

function log(
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
): PropertyDescriptor | void {
    const oldSet = descriptor.set;
    const oldGet = descriptor.get;
    descriptor.set = function (this: any, ...args: any) {
        console.log(`Changing value to ${[...args]}`);
        return oldSet?.apply(this, args);
    };
    descriptor.get = function () {
        console.log(`TEST`);
        return oldGet?.apply(this);
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

function checkNumberOfSeats(limit: number) {
    return function (target: Object, propertyKey: string | symbol) {
        let symbol = Symbol();

        const getter = function (this: any) {
            return this[symbol];
        };

        const setter = function (this: any, newAmount: number) {
            if (newAmount >= 1 && newAmount < limit) {
                this[symbol] = newAmount;
            } else {
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

function changeDoorStatus(status: boolean) {
    console.log("door init");
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        console.log("door changed");
        return class extends constructor {
            open = status;
        };
    };
}

function checkAmountOfFuel(
    target: Object,
    _: string | symbol,
    descriptor: PropertyDescriptor
): PropertyDescriptor | void {
    const oldValue = descriptor.value;
    descriptor.value = function (
        this: any,
        ...args: any[]
    ): PropertyDescriptor {
        console.log(this.fuel);
        return oldValue.apply(this, args);
    };
}

function changeAmountOfFuel(amount: number) {
    console.log("fuel init");
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        console.log("fuel changed");
        return class extends constructor {
            fuel = `${amount}%`;
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
