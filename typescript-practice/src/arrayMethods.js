// Напишите функцию camelize(str), которая преобразует строки вида «my-short-string»
// в «myShortString».

// То есть дефисы удаляются, а все слова после них получают заглавную букву.

function camelize(str) {
    return str
        .split("-")
        .map((word, index) =>
            index == 0 ? word : word[0].toUpperCase() + word.slice(1)
        )
        .join("");
}
console.log(camelize("background-color"));
console.log(camelize("-webkit-transition"));

// Напишите функцию filterRange(arr, a, b), которая принимает массив arr,
//  ищет элементы со значениями больше или равными a и меньше или равными b
//  и возвращает результат в виде массива.

// Функция должна возвращать новый массив и не изменять исходный.
const filterRange = (arr, a, b) => {
    return arr.filter((elem) => elem >= a && elem <= b);
};

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

console.log(filtered); // 3,1 (совпадающие значения)
console.log(arr); // 5,3,8,1 (без изменений)

// Напишите функцию filterRangeInPlace(arr, a, b), которая принимает массив arr
//  и удаляет из него все значения кроме тех, которые находятся между a и b.
//   То есть, проверка имеет вид a ≤ arr[i] ≤ b.

// Функция должна изменять принимаемый массив и ничего не возвращать.

const filterRangeInPlace = (arr, a, b) => {
    return arr.filter((item, index) => {
        if (item < a || item > b) {
            arr.splice(index, 1);
        }
    });
};

let arr1 = [5, 3, 8, 1];

filterRangeInPlace(arr1, 1, 4); // удалены числа вне диапазона 1..4

console.log(arr1); // [3, 1]

// Сортировать в порядке по убыванию
let arr2 = [5, 2, 1, -10, 8];

// ... ваш код для сортировки по убыванию
arr2.sort((a, b) => b - a);

console.log(arr2); // 8, 5, 2, 1, -10

// У нас есть массив строк arr. Нужно получить отсортированную копию,
//  но оставить arr неизменённым.

// Создайте функцию copySorted(arr), которая будет возвращать такую копию.

const copySorted = (arr) => {
    return arr.slice().sort((a, b) => (a > b ? 1 : -1));
};

let arr3 = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr3);

console.log(sorted); // CSS, HTML, JavaScript
console.log(arr3); // HTML, JavaScript, CSS (без изменений)

const calculate = (str) => {
    let res = str.split(" ");
    switch (res[1]) {
        case "+":
            return Number(res[0]) + Number(res[2]);
        case "-":
            return Number(res[0]) - Number(res[2]);
    }
};

console.log(calculate("6 - 1"));
function Calculator() {
    this.methods = {
        "-": (a, b) => a - b,
        "+": (a, b) => a + b,
    };

    this.calculate = function (str) {
        let split = str.split(" "),
            a = +split[0],
            operator = split[1],
            b = +split[2];

        return this.methods[operator](a, b);
    };

    this.addMethod = function (name, func) {
        this.methods[name] = func;
    };
}

let powerCalc = new Calculator();
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
console.log(result);

// У вас есть массив объектов user, и в каждом из них есть user.name.
//  Напишите код, который преобразует их в массив имён.

let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let users = [vasya, petya, masha];

let names = users.map((item) => item.name);

console.log(names); // Вася, Петя, Маша

// У вас есть массив объектов user, и у каждого из объектов есть name, surname и id.

// Напишите код, который создаст ещё один массив объектов с параметрами id и fullName,
//  где fullName – состоит из name и surname.

let vasya1 = { name: "Вася", surname: "Пупкин", id: 1 };
let petya1 = { name: "Петя", surname: "Иванов", id: 2 };
let masha1 = { name: "Маша", surname: "Петрова", id: 3 };

let users1 = [vasya1, petya1, masha1];

let usersMapped = users1.map((obj) => {
    return { fullName: `${obj.name} ${obj.surname}`, id: obj.id };
});

console.log(usersMapped);
console.log(usersMapped[0].id); // 1
console.log(usersMapped[0].fullName); // Вася Пупкин

// Напишите функцию sortByAge(users), которая принимает массив объектов со свойством age
//  и сортирует их по нему.

let vasya2 = { name: "Вася", age: 25 };
let petya2 = { name: "Петя", age: 30 };
let masha2 = { name: "Маша", age: 28 };

let arr4 = [vasya2, petya2, masha2];

const sortByAge = (users) => {
    users.sort((a, b) => a.age - b.age);
};

sortByAge(arr4);

// теперь: [vasya, masha, petya]
console.log(arr4);
console.log(arr4[0].name); // Вася
console.log(arr4[1].name); // Маша
console.log(arr4[2].name); // Петя

// Напишите функцию shuffle(array), которая перемешивает
// (переупорядочивает случайным образом) элементы массива.

// Многократные прогоны через shuffle могут привести к разным последовательностям элементов.
let arr5 = [1, 2, 3];

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

shuffle(arr5);
console.log(arr5);
// arr = [3, 2, 1]

shuffle(arr5);
console.log(arr5);
// arr = [2, 1, 3]

shuffle(arr5);
console.log(arr5);
// arr = [3, 1, 2]
// ...

// Напишите функцию getAverageAge(users), которая принимает массив объектов со свойством age
//  и возвращает средний возраст.

// Формула вычисления среднего арифметического значения: (age1 + age2 + ... + ageN) / N.
let vasya4 = { name: "Вася", age: 25 };
let petya4 = { name: "Петя", age: 30 };
let masha4 = { name: "Маша", age: 29 };

let arr6 = [vasya4, petya4, masha4];

const getAverageAge = (users) => {
    return users.reduce((sum, current) => sum + current.age, 0) / arr6.length;
};

console.log(getAverageAge(arr6)); // (25 + 30 + 29) / 3 = 28

// Напишите функцию unique(arr), которая возвращает массив, содержащий только уникальные элементы arr.

function unique(arr) {
    return arr.filter((item, index, array) => array.indexOf(item) === index);
}

let strings = [
    "кришна",
    "кришна",
    "харе",
    "харе",
    "харе",
    "харе",
    "кришна",
    "кришна",
    ":-O",
];

console.log(unique(strings)); // кришна, харе, :-O

// Допустим, мы получили массив пользователей в виде {id:..., name:..., age:... }.

// Создайте функцию groupById(arr), которая создаст из него объект с id в качестве ключа
//  и элементами массива в качестве значений.

let users2 = [
    { id: "john", name: "John Smith", age: 20 },
    { id: "ann", name: "Ann Smith", age: 24 },
    { id: "pete", name: "Pete Peterson", age: 31 },
];

const groupById = (users) => {
    return users.reduce((accum, value) => {
        accum[value.id] = value;
        return accum;
    }, {});
};

let usersById = groupById(users2);
console.log(groupById(users2));

/*
  // после вызова у нас должно получиться:
  
  usersById = {
    john: {id: 'john', name: "John Smith", age: 20},
    ann: {id: 'ann', name: "Ann Smith", age: 24},
    pete: {id: 'pete', name: "Pete Peterson", age: 31},
  }
  */
