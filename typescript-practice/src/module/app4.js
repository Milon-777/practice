"use strict";
// const key: KeysOfUser = "age";
function getValue(obj, key) {
    return obj[key];
}
const user7 = {
    name: "Anton",
    age: 30,
};
const userName = getValue(user7, "name");
const data = [
    { group: 1, name: "a" },
    { group: 3, name: "b" },
    { group: 2, name: "c" },
    { group: 1, name: "a" },
    { group: 3, name: "b" },
    { group: 2, name: "c" },
];
function groupData(data, key) {
    return data.reduce((map, item) => {
        const itemKey = item[key];
        let currElem = map[itemKey];
        if (Array.isArray(currElem)) {
            currElem.push(item);
        }
        else {
            currElem = [item];
        }
        map[itemKey] = currElem;
        return map;
    }, {});
}
console.log(groupData(data, "group"));
let strOrNum = 5;
let str20OrNum;
const user8 = {
    name: "Viktor",
};
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
})(Direction || (Direction = {}));
const userr = {
    name: "Anton",
    roles: [],
    permission: {
        endDate: new Date(),
    },
};
const nameUser = User5["name"];
let roleNames = "roles";
const roles = ["admin", "user", "super-user"];
const a1 = Math.random() > 0.5 ? 1 : 0;
const succ = {
    code: 200,
    data: "done",
    additionalData: "done",
};
const err = {
    code: 400,
    data: new Error(),
    additionalData: 404,
};
class User8 {
}
class UserPersistend8 extends User8 {
}
function getUser(dbIdOrId) {
    if (typeof dbIdOrId === "number") {
        return new User8();
    }
    else {
        return new UserPersistend8();
    }
}
function getUser2(id) {
    if (typeof id === "number") {
        return new User8();
    }
    else {
        return new UserPersistend8();
    }
}
const ress = getUser2(1);
const resss = getUser2("sds");
function runTransaction(transaction) {
    console.log(transaction);
}
const transaction = {
    fromTo: ["1", "2"],
};
runTransaction(transaction);
const form = {
    name: "Viktor",
    password: "123",
};
const formValidation = {
    name: { isValid: true },
    password: {
        isValid: false,
        errorMessage: "Повинен бути бути більше 5 символів",
    },
};
