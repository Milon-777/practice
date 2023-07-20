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
function processingData(data, options) {
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
const res1 = processingData(num, str);
const somePrint = {
    design: "UK",
};
const somePrint2 = {
    design: 12,
};
function processing(data) {
    return data;
}
// const newFunc: <T>(data: T) => T = processing;
const newFunc = processing;
const save = {
    // processing(data) {
    //     console.log(data);
    //     return data;
    // },
    // processing: processing
    processing: (data) => {
        return data;
    },
};
const num1 = 5;
const user10 = {
    login: "user1",
    age: 20,
};
const user11 = {
    login: "str",
    age: 30,
    parents: { mother: "Anna", father: "No data", married: true },
};
const data1 = [5, 2];
const depositMoney = (amount) => {
    console.log(`req to server with amount: ${amount}`);
    return amount;
};
depositMoney(500);
depositMoney("500");
class User13 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayMyFullName(surname) {
        if (typeof surname !== "string") {
            return `I have only name: ${this.name}`;
        }
        else {
            return `${this.name} ${surname}`;
        }
    }
}
class AdminUser extends User13 {
}
const ivan = new User13("Ivan", 30);
console.log(ivan);
const nameData = "Alex";
const ageData = 54;
const alex = new User13(nameData, ageData);
const arr = [1, 2, 3];
const arr1 = [1, 2, 3];
const readOnlyArr = ["Redonly"];
const state = {
    data: {
        name: "John",
    },
};
const strictState = {
    data: {
        name: "John",
    },
    tag: "tag",
};
function action(state) {
    state.data.name = "abc";
}
const debts = "debts";
const keys = "name";
function printDebts(company, name, debts) {
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
const str1 = "Hello";
const userr1 = {
    created: "created",
};
// function calculateDailyCalories(num: number): IDataFromBase;
// function calculateDailyCalories(str: string): IDataFromUser;
function calculateDailyCalories(numOrStr) {
    if (typeof numOrStr === "string") {
        const obj = {
            weight: numOrStr,
        };
        return obj;
    }
    else {
        const obj = {
            calories: numOrStr,
        };
        return obj;
    }
}
const gameData = {
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
const alex1 = {
    name: "alex",
    age: "25",
    role: "admin",
};
function calculate(a, b) {
    return a * b;
}
class Example1 {
    constructor(a) {
        this.a = a;
    }
}
const jsonTest = '{"name": "Test", "data": "DFG"}';
const objFromJson = JSON.parse(jsonTest);
let toDoList = [];
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
    }
    else if (Array.isArray(json)) {
        toDoList = json;
    }
    else {
        console.log(`${json} - is a string`);
    }
    console.log(toDoList);
});
const promise = new Promise((resolve, reject) => {
    resolve("Test");
});
promise.then((value) => {
    console.log(value.toUpperCase());
});
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = [
            {
                name: "alex",
            },
        ];
        return users;
    });
}
const users = fetchUsers();
