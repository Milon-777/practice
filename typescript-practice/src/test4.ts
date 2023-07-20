import "reflect-metadata";

interface ICuboid {
    width: number;
    length: number;
    height: number;
    calcArea: (multiply?: number) => number;
    calcVolume: (multiply?: number) => number;
}

interface ShippingContainerData {
    createdAt: Date;
    lastCalculation: string;
}

@ClassDecorator
class ShippingContainer implements ICuboid {
    @IsInt()
    @Min(1)
    width: number;

    @IsInt()
    @Min(1)
    length: number;

    @IsInt()
    @Min(1)
    @Max(8)
    height: number;
    // lastCalculation: string;
    // createdAt: Date;

    constructor(width: number, length: number, height: number) {
        this.width = width;
        this.length = length;
        this.height = height;
        validate(this, "width", width);
        validate(this, "length", length);
        validate(this, "height", height);
    }

    @MethodDecorator("calcArea")
    calcArea(multiply?: number): number {
        return this.width * this.length * (multiply ? multiply : 1);
    }

    @MethodDecorator("calcVolume")
    calcVolume(multiply?: number) {
        return (
            this.width * this.length * this.height * (multiply ? multiply : 1)
        );
    }
}

// 1. Необходимо создать декоратор класса, который будет записывать дату создания контейнера
// Простыми словами - создавать в нем новое свойство createdAt с датой создания экземпляра

// 2. Необходимо создать декораторы IsInt, Min и Max, которые будут валидировать свойства класса
// Применение смотри в самом классе. При ошибке выполняйте throw new Error
// IsInt проверяет на то, что было передано целое число

// 3. Необходимо создать декоратор метода, который при каждом запуске метода будет создавать
// ИЛИ менять содержимое свойства самого класса lastCalculation
// Как значение записывать в него строку "Последний подсчет ${method} был ${Дата}",
// Где method - это название подсчета, который передается при вызове декоратора (площадь или объем)

function ClassDecorator<T extends { new (...args: any[]): {} }>(
    constructor: T
) {
    return class extends constructor {
        createdAt = new Date();
    };
}

function IsInt() {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata("IsInt", true, target, propertyKey);
    };
}

function Min(minValue: number) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata("Min", minValue, target, propertyKey);
    };
}

function Max(maxValue: number) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata("Max", maxValue, target, propertyKey);
    };
}

function validate(target: Object, propertyKey: string, value: any): boolean {
    if (
        Reflect.hasMetadata("IsInt", target, propertyKey) &&
        (!Number.isInteger(value) || value !== parseInt(value))
    ) {
        throw new Error(
            `Число повинно бути цілим!!! (${propertyKey}=${value})`
        );
    } else if (
        Reflect.hasMetadata("Min", target, propertyKey) &&
        value < Reflect.getMetadata("Min", target, propertyKey)
    ) {
        throw new Error(
            `Число повинно бути більшим ніж мінімальне > ${Reflect.getMetadata(
                "Min",
                target,
                propertyKey
            )}!!! (${propertyKey}=${value})`
        );
    } else if (
        Reflect.hasMetadata("Max", target, propertyKey) &&
        value > Reflect.getMetadata("Max", target, propertyKey)
    ) {
        throw new Error(
            `Число повинно бути меншим ніж максимальне < ${Reflect.getMetadata(
                "Max",
                target,
                propertyKey
            )}!!! (${propertyKey}=${value})`
        );
    }
    return true;
}

function finalValidate(obj: unknown) {
    if (obj && typeof obj == "object" && !Array.isArray(obj)) {
        for (let key in obj) {
            validate(obj, key, obj[key as keyof typeof obj]);
        }
    }
}

function MethodDecorator(method: string) {
    return (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor | void => {
        const oldValue = descriptor.value;
        descriptor.value = function (this: any, ...args: any[]) {
            this.lastCalculation = `Останній підрахунок ${method} був ${new Date().toTimeString()}`;
            return oldValue.apply(this, args);
        };
    };
}

const container = new ShippingContainer(7, 7, 7) as ICuboid &
    ShippingContainerData;
container.width = 2;
container.height = 6;
console.log(container.calcArea());
console.log(container.lastCalculation);
console.log(container.calcVolume());
console.log(container.lastCalculation);

finalValidate(container);
