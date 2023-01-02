"use strict";
let revenue = 1000;
let bonus = 500;
let c = "sdt";
let d = true;
let res = revenue + bonus;
console.log(res);
function getFullName(user) {
    return `${user.firstname} ${user.surname}`;
}
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
