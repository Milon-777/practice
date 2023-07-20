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
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
let revenue = 1000;
let bonus = 500;
let c = "sdt";
let d = true;
let res = revenue + bonus;
console.log(res);
function getFullName(user) {
    return `${user.firstname} ${user.surname}`;
}
// const getFullName = (user: { firstname: string; surname: string }): string => {
//   return `${user.firstname} ${user.surname}`;
// }
const user = {
    firstname: "Roman",
    surname: "Strizhak",
    country: "Ukraine",
    age: 21,
    skills: {
        js: true,
        html: true,
        css: true,
    },
};
console.log(getFullName(user));
let info;
const skills = [1, "Developer"];
const skills2 = ["dev", "devops", "testing"];
skills2
    .filter((s) => s + "!")
    .map((s) => s + "!")
    .reduce((a, b) => a + b);
console.log("Skills2: ", skills2);
const arr = [1, "text", true, false, true];
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 1] = "SUCCESS";
    StatusCode[StatusCode["IN_PROCESS"] = 2] = "IN_PROCESS";
    StatusCode[StatusCode["FAILED"] = 3] = "FAILED";
})(StatusCode || (StatusCode = {}));
const obj1 = {
    message: "Payment successful",
    statusCode: StatusCode.SUCCESS,
};
function action(status) {
    console.log(status);
}
action(obj1.statusCode);
action(2);
function compute() {
    return 3;
}
console.log(2 /* Roles.USER */);
function getFaqs(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("/faqs", {
            method: "POST",
            body: JSON.stringify(req),
        });
        const data = yield res.json();
        return data;
    });
}
function logId(id) {
    if (typeof id === "string") {
        console.log(id.toLocaleUpperCase);
    }
    else {
        console.log(id);
    }
}
logId(1);
logId("1");
logId(true);
function logError(err) {
    if (Array.isArray(err)) {
        console.log(err);
    }
    else {
        console.log(err);
    }
}
function logObj(obj) {
    if ("a" in obj) {
        console.log(obj.a);
    }
    else {
        console.log(obj.b);
    }
}
function logMultipleIds(a, b) {
    if (a === b) {
        console.log(a.toLocaleLowerCase);
        console.log(b.toUpperCase);
    }
    else {
        console.log(a);
    }
}
let a = 1;
function fetchWithAuth(url, method) { }
fetchWithAuth("s", "post");
let b = "ssss";
// const method = "post";
// let method: 'post' = 'post';
let method = "post";
fetchWithAuth("s", method);
// Майже ніхто не використовує
let user2 = {
    name: "asd",
    age: 21,
    skills: ["1", "2"],
};
let user3 = {
    name: "asd",
    age: 21,
    skills: ["1", "2"],
    id: 1,
    log(id) {
        return "id";
    },
};
let user4 = {
    name: "as",
    age: 21,
};
let user5 = {
    login: "dray",
};
function multiply(first, second) {
    if (!second) {
        return first * first;
    }
    return first * second;
}
multiply(5);
function testPass(user) {
    var _a;
    const t = (_a = user.password) === null || _a === void 0 ? void 0 : _a.type;
}
function test(param) {
    const t = param !== null && param !== void 0 ? param : multiply(5);
}
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Success"] = "success";
    PaymentStatus["Failed"] = "failed";
})(PaymentStatus || (PaymentStatus = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["Error1"] = 1] = "Error1";
    ErrorCode[ErrorCode["Error2"] = 2] = "Error2";
    ErrorCode[ErrorCode["Error3"] = 3] = "Error3";
    ErrorCode[ErrorCode["Error4"] = 4] = "Error4";
})(ErrorCode || (ErrorCode = {}));
function isSuccess(res) {
    // return "databaseId" in res;
    if (res.status === PaymentStatus.Success) {
        return true;
    }
    return false;
}
function getIdFromData(res) {
    if (isSuccess(res)) {
        return res.data.databaseId;
    }
    else {
        throw new Error(res.data.errorMessage);
    }
}
// function isAdmin(user: User | Admin): user is Admin {
//     return "role" in user;
// }
// function get(): IResponseSuccess | IResponseFailed {}
function logID(id) {
    console.log(typescript_1.idText);
}
const e = logID(1);
const f1 = () => { };
const f2 = () => {
    return true;
};
const i = f2();
const skills3 = ["Dev", "DevOps"];
const user33 = {
    s: ["s"],
};
skills3.forEach((skill) => user33.s.push(skill));
let input;
input = 3;
input = ["sf", "2"];
function run(i) {
    if (typeof i == "number") {
        i++;
    }
    else {
        i;
    }
}
run(input);
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fetch("");
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    });
}
function generateError(message) {
    throw new Error(message);
}
function dumpError() {
    while (true) { }
}
function rec() {
    return rec();
}
function processAction(action) {
    switch (action) {
        case "refund":
            //...
            break;
        case "checkout":
            //...
            break;
        default:
            const _ = action;
            throw new Error("Нема такого action");
    }
}
let n = null;
let a1 = 5;
let b1 = a.toString();
let e1 = new String(a).valueOf();
let g1 = new Boolean(a).valueOf();
let c1 = "dsds";
let d1 = parseInt(c);
const user11 = {
    name: "Den",
    email: "den@gmail.com",
    login: "den",
};
const admin = Object.assign(Object.assign({}, user11), { role: 1 });
function userToAdmin(user) {
    return {
        name: user.name,
        role: 1,
    };
}
function logId2(id) {
    if (isString(id)) {
        console.log(id);
    }
    else {
        console.log(id);
    }
}
function isString(x) {
    return typeof x === "string";
}
function isAdmin(user) {
    return "role" in user;
}
function isAdminAlternative(user) {
    return user.role !== undefined;
}
function setRoleZero(user) {
    if (isAdmin(user)) {
        user.role = 0;
    }
    else {
        throw new Error("Користувач не адмін");
    }
}
function checkReadings(readings) {
    if ("system" in readings) {
        console.log(readings.system);
    }
    else {
        console.log(readings.user);
    }
}
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.getDate);
    }
    else {
        console.log(x);
    }
}
