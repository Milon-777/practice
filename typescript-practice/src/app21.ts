function processingData<T, S>(data: T, options: S): string {
    switch (typeof data) {
        case "string":
            return `${data}`;
        case "number":
            return `${data.toExponential()}`;
        default:
            return `Uknwon type`;
    }
}
processingData(1, "first");
processingData("1", 2);
const num = 12;
const str = "12";
const res1 = processingData<number, string>(num, str);

interface PrintUK {
    design: number;
}
interface PrintES {
    design: string;
}
interface Print<T> {
    design: T;
}
const somePrint: Print<string> = {
    design: "UK",
};
const somePrint2: Print<number> = {
    design: 12,
};
function processing<T>(data: T): T {
    return data;
}
interface ProcessingFnc {
    <T>(data: T): T;
}

// const newFunc: <T>(data: T) => T = processing;
const newFunc: ProcessingFnc = processing;

interface DataSaver {
    // processing: typeof processing
    // processing: ProcessingFnc;
    processing: <T>(data: T) => T;
}
const save: DataSaver = {
    // processing(data) {
    //     console.log(data);
    //     return data;
    // },
    // processing: processing
    processing: <T>(data: T) => {
        return data;
    },
};

type Smth<T> = T;
const num1: Smth<number> = 5;

type User11<T> = {
    login: T;
    age: number;
};
const user10: User11<string> = {
    login: "user1",
    age: 20,
};

interface ParentsOfUser {
    mother: string;
    father: string;
}

type User12<ParentsData extends ParentsOfUser> = {
    login: string;
    age: number;
    parents: ParentsData;
};
const user11: User12<{ mother: string; father: string; married: boolean }> = {
    login: "str",
    age: 30,
    parents: { mother: "Anna", father: "No data", married: true },
};

type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];

const data1: OneOrMany<number[]> = [5, 2];

const depositMoney = <T extends number | string>(amount: T): T => {
    console.log(`req to server with amount: ${amount}`);
    return amount;
};

depositMoney(500);
depositMoney("500");

class User13<T, S> {
    name: T;
    age: S;

    constructor(name: T, age: S) {
        this.name = name;
        this.age = age;
    }

    sayMyFullName<T>(surname: T): string {
        if (typeof surname !== "string") {
            return `I have only name: ${this.name}`;
        } else {
            return `${this.name} ${surname}`;
        }
    }
}

class AdminUser<T> extends User13<string, number> {
    rules: T;
}

const ivan = new User13("Ivan", 30);
console.log(ivan);

const nameData = "Alex";
const ageData = 54;

const alex = new User13<string, number>(nameData, ageData);

const arr: Array<number> = [1, 2, 3];
const arr1: number[] = [1, 2, 3];

const readOnlyArr: ReadonlyArray<string> = ["Redonly"];

interface IState {
    data: {
        name: string;
    };
    tag: string;
}

const state: Partial<IState> = {
    data: {
        name: "John",
    },
};

const strictState: Required<IState> = {
    data: {
        name: "John",
    },
    tag: "tag",
};

function action(state: Readonly<IState>) {
    state.data.name = "abc";
}

interface ICompany {
    name: string;
    debts: number;
    departments: Department2[];
    management: {
        owner: string;
    };
}

interface Department2 {
    [key: string]: string;
}

const debts = "debts";
type TCompanyDebts2 = ICompany[typeof debts];

type TCompanyDebts = ICompany["debts"];
type TCompanyOwner = ICompany["management"]["owner"];
type TCompanyDepartment = ICompany["departments"][number];
type TCompanyDepartments = ICompany["departments"];
type Test = ICompany[keyof ICompany];

type CompanyKeys = keyof ICompany;
const keys: CompanyKeys = "name";

function printDebts<T, K extends keyof T, S extends keyof T>(
    company: T,
    name: K,
    debts: S
): void {
    console.log(`Company ${company[name]}, debts: ${company[debts]}`);
}

// const hh: ICompany = {
//     name: "HH",
//     debts: 5000,
//     departments: {
//         sales: "sales",
//         developer: "dev",
//     },
//     management: {
//         owner: "John",
//     },
// };

// printDebts(hh, "name", "debts");

// type GoogleKeys = keyof typeof hh;
// const keys1: GoogleKeys = "name";

// SomeType extends OtherType ? TrueType : FalseType
const str1: string = "Hello";
type Example = "string" extends typeof str1 ? string : number;

type FromUserOrFromBase<T extends string | number> = T extends string
    ? IDataFromUser
    : IDataFromBase;

interface Userr<T extends "created" | Date> {
    created: T extends "created" ? "created" : Date;
}

const userr1: Userr<"created"> = {
    created: "created",
};

interface IDataFromUser {
    weight: string;
}

interface IDataFromBase {
    calories: number;
}

// function calculateDailyCalories(num: number): IDataFromBase;
// function calculateDailyCalories(str: string): IDataFromUser;
function calculateDailyCalories<T extends string | number>(
    numOrStr: T
): T extends string ? IDataFromUser : IDataFromBase {
    if (typeof numOrStr === "string") {
        const obj: IDataFromUser = {
            weight: numOrStr,
        };
        return obj as FromUserOrFromBase<T>;
    } else {
        const obj: IDataFromBase = {
            calories: numOrStr,
        };
        return obj as FromUserOrFromBase<T>;
    }
}

type GetStringType<T extends "hello" | "world" | string> = T extends "hello"
    ? "hello"
    : T extends "world"
    ? "world"
    : string;

type GetFirstType<T> = T extends Array<infer First> ? First : T;
type Ex = GetFirstType<number[]>;
type ToArray<Type> = Type extends any ? Array<Type> : never;
type ExArray = ToArray<Ex | string>;

type Currencies = {
    usa: "usd";
    china: "cny";
    ukraine: "uah";
    kz: "tenge";
};

type CurrWithoutUSA = Omit<Currencies, "usa">; //виключення
type CountriesWithoutUSA = Exclude<keyof Currencies, "usa">;
type CurrUSAAndUkraine = Pick<Currencies, "usa" | "ukraine">; //фільтрація за властивісттю
type FadeType = Exclude<MyAnimation, "swipe">; //видалення із union type
type SwipeType = Extract<MyAnimation | Direction1, "swipe">; //вибір підходящього типу

type PlayersNames = "alex" | "john";
type GameDataCurr = Record<PlayersNames, CustomCurrencies>;

const gameData: GameDataCurr = {
    alex: {
        customChina: "qqqq",
        customKz: "kz",
        customUkraine: "ua",
        customUsa: "us",
    },
    john: {
        customChina: "qqqq",
        customKz: "kz",
        customUkraine: "ua",
        customUsa: "us",
    },
};

type CreateCustomCurrencies<T> = {
    [P in keyof T as `custom${Capitalize<string & P>}`]: string;
};

type CustomCurrencies = CreateCustomCurrencies<Currencies>;
type readOnlyCurr = Readonly<Currencies>;

// type CustomCurrencies = {
//     usa: string;
//     china: string;
//     ukraine: string;
//     kz: string;
// };

type ROnlyCurr = Readonly<Currencies>;
// type СопоставимыйТип = {
//     [произвольный Идентификатор in Множество] : ПроизвольныйТипДанных
// }
type Keys = "name" | "age" | "role";
type Userr1 = {
    [K in Keys]: string;
};
const alex1: Userr1 = {
    name: "alex",
    age: "25",
    role: "admin",
};

type MyAnimation = "fade" | "swipe";
type Direction1 = "in" | "out";
type MyNewAnimation = `${MyAnimation}${Capitalize<Direction1>}`;

function calculate(a: number, b: number): number {
    return a * b;
}

type RTCalculate = ReturnType<typeof calculate>;
type PTCalculate = Parameters<typeof calculate>[0];
type PT1 = Parameters<(a: number) => number>[0];
type PT2 = Parameters<<T>(arg: T) => T>[0];

class Example1 {
    constructor(public a: number) {}
}

type T0 = ConstructorParameters<typeof Example1>;

const jsonTest = '{"name": "Test", "data": "DFG"}';

interface JSONTest {
    name: string;
    data: number;
}

const objFromJson: JSONTest = JSON.parse(jsonTest);

let toDoList: Array<IToDo> = [];

interface IToDo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//     .then((response) => response.json())
//     .then((json) => {
//         if ("id" in json) {
//             toDoList.push(json);
//         }
//         console.log(toDoList);
//     });

fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((json) => {
        if ("id" in json) {
            toDoList.push(json);
        } else if (Array.isArray(json)) {
            toDoList = json;
        } else {
            console.log(`${json} - is a string`);
        }
        console.log(toDoList);
    });

const promise = new Promise<string>((resolve, reject) => {
    resolve("Test");
});
promise.then((value) => {
    console.log(value.toUpperCase());
});

type FromPromise = Awaited<Promise<Promise<number>>>;

interface Userr2 {
    name: string;
}

async function fetchUsers(): Promise<Array<Userr2>> {
    const users: Array<Userr2> = [
        {
            name: "alex",
        },
    ];
    return users;
}

const users = fetchUsers();

type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>;
type UnwrappedPromise<T> = T extends Promise<infer Return> ? Return : T;
type FetchDataReturnType = UnwrappedPromise<ReturnType<typeof fetchUsers>>;
