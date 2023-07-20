let user = {};
user.name = "John";
user.surname = "Smith";
user.name = "Pete";
delete user.name;

let schedule = {};

const isEmpty = (obj) => {
    for (let property in obj) {
        if (property) {
            return false;
        }
    }
    return true;
};

console.log(isEmpty(schedule)); // true

schedule["8:30"] = "get up";

console.log(isEmpty(schedule)); // false

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130,
};

let sum = 0;
for (let property in salaries) {
    sum += salaries[property];
}
console.log(sum);

// до вызова функции
let menu = {
    width: 200,
    height: 300,
    title: "My menu",
};

const multiplyNumeric = (obj) => {
    for (let property in obj) {
        if (typeof obj[property] === "number") {
            obj[property] *= 2;
        }
    }
};

multiplyNumeric(menu);
console.log(menu);

// после вызова функции
// menu = {
//     width: 400,
//     height: 600,
//     title: "My menu",
// };
let promise = new Promise(function (resolve, reject) {
    // эта функция выполнится автоматически, при вызове new Promise

    // через 1 секунду сигнализировать, что задача выполнена с результатом "done"
    setTimeout(() => {
        resolve("done");
    }, 1000);
});

promise.then(
    (result) => console.log(promise.state),
    (error) => console.log(error)
);

// function loadScript(src) {
//     return new Promise(function (resolve, reject) {
//         let script = document.createElement("script");
//         script.src = src;

//         script.onload = () => resolve(script);
//         script.onerror = () =>
//             reject(new Error(`Ошибка загрузки скрипта ${src}`));

//         document.head.append(script);
//     });
// }

// let promise2 = loadScript(
//     "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"
// );

// promise2.then(
//     (script) => `${script.src} загружен!`,
//     (error) => `Ошибка: ${error.message}`
// );

// promise2.then((script) => console.log("Ещё один обработчик..."));

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(3000).then(() => console.log("выполнилось через 3 секунды"));
