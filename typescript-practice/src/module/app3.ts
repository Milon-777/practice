const a: Array<number> = [1, 2, 3];
async function test() {
    const p = new Promise<number>((resolve, reject) => {
        resolve(1);
    });
}

const check: Record<string, boolean> = {
    drive: true,
    kpp: false,
};

function logMiddleware<T>(data: T): T {
    console.log(data);
    return data;
}

const res3 = logMiddleware<string>("10");

function splitArray<T>(data: Array<T>): Array<T> {
    const l = data.length / 2;
    return data.splice(0, l);
}

splitArray<number>([1, 2, 3, 4]);

function toString<T>(data: T): string | undefined {
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

const split: <T>(data: Array<T>) => Array<T> = splitArray;

interface ILogLine<T> {
    timeStamp: Date;
    data: T;
}

type LogLineType<T> = {
    timeStamp: Date;
    data: T;
};

const logLine: ILogLine<{ a: number }> = {
    timeStamp: new Date(),
    data: {
        a: 1,
    },
};

class Vehicle2 {
    run: number;
}

function kmToMiles<T extends Vehicle2>(vehicle: T): T {
    vehicle.run = vehicle.run / 0.62;
    return vehicle;
}

class LCV extends Vehicle2 {
    capacity: number;
}

const vehicle = kmToMiles(new Vehicle2());
const lcv = kmToMiles(new LCV());

function logId<T extends string | number, Y>(
    id: T,
    additionalData: Y
): { id: T; data: Y } {
    console.log(id);
    return { id, data: additionalData };
}

type method = "ascending" | "descending";

interface element {
    id: number;
    name: string;
}

function sortArray(a: element, b: element): number {
    return a.id - b.id;
}

function sortObj<T extends element>(array: T[], methodSort: method): T[] {
    return array.sort((a, b) => {
        switch (methodSort) {
            case "ascending":
                return a.id - b.id;
            case "descending":
                return a.id - b.id;
        }
    });
}

class Resp<D, E> {
    data?: D;
    error?: E;

    constructor(data: D, error: E) {
        if (data) {
            this.data = data;
        }
        if (error) {
            this.error = error;
        }
    }
}

new Resp<string, number>("Data", 0);

class HTTPResp<F> extends Resp<string, number> {
    code: F;

    setCode(code: F) {
        this.code = code;
    }
}
const res4 = new HTTPResp("data", 90);

// type Constructor = new (...args: any[]) => {};
type GConstructor<T = {}> = new (...args: any[]) => T;

class Accordion {
    isOpened: boolean;
}

type AccordionType = GConstructor<Accordion>;

class List {
    constructor(public items: string[]) {}
}

type ListType = GConstructor<List>;

// class ExtendedList extends List {
//     first() {
//         return this.items[0];
//     }
// }

// class AccordionList {
//     isOpened: boolean;
//     constructor(public items: string[]) {}
// }

// function ExtendedList<TBase extends ListType & AccordionType>(Base: TBase) {
//     return class ExtendedList extends Base {
//         first() {
//             return this.items[0];
//         }
//     };
// }

// const list = ExtendedList(AccordionList);
// const res5 = new list(["first", "second"]);

// Требуется для всех миксинов
type Constructor<T = {}> = new (...args: any[]) => T;

////////////////////
// Примеры миксинов
////////////////////

// Миксин, который добавляет свойство
function Timestamped<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        timestamp = Date.now();
    };
}

// миксин, который добавляет свойство и методы
function Activatable<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        isActivated = false;

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
    name = "";
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
