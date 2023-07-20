"use strict";
// Создать Generic-интерфейс PlayerData, который подходил бы для создания таких объектов:
const player1 = {
    game: "CS:GO",
    hours: 300,
    server: "basic",
};
const player2 = {
    game: 2048,
    hours: "300 h.",
    server: "arcade",
};
const player3 = {
    game: "Chess",
    hours: {
        total: 500,
        inMenu: 50,
    },
    server: "chess",
};
function calculateAmountOfFigures(figures) {
    let amountOfFigures = {
        squares: figures.filter((f) => f.name === "rect").length,
        circles: figures.filter((f) => f.name === "circle").length,
        triangles: figures.filter((f) => f.name === "triangle").length,
        others: figures.filter((f) => f.name !== "rect" &&
            f.name !== "circle" &&
            f.name !== "triangle").length,
    };
    return amountOfFigures;
}
const data2 = [
    {
        name: "rect",
        data: { a: 5, b: 10 },
    },
    {
        name: "rect",
        data: { a: 6, b: 11 },
    },
    {
        name: "triangle",
        data: { a: 5, b: 10, c: 14 },
    },
    {
        name: "line",
        data: { l: 15 },
    },
    {
        name: "circle",
        data: { r: 10 },
    },
    {
        name: "circle",
        data: { r: 5 },
    },
    {
        name: "rect",
        data: { a: 15, b: 7 },
    },
    {
        name: "triangle",
    },
];
console.log(calculateAmountOfFigures(data2));
// Типизировать объект phones
const phones = [
    {
        company: "Nokia",
        number: 1285637,
        size: "5.5",
        companyPartner: "MobileNokia",
        manufactured: new Date("2022-09-01"),
    },
    {
        company: "Samsung",
        number: 4356637,
        size: "5.0",
        companyPartner: "SamMobile",
        manufactured: new Date("2021-11-05"),
    },
    {
        company: "Apple",
        number: 4552833,
        size: "5.7",
        companyPartner: "no data",
        manufactured: new Date("2022-05-24T12:00:00"),
    },
];
// Функция должна отфильтровать массив данных и вернуть новый массив
// с телефонами, выпущенными после даты в третьем аргументе
function filterPhonesByDate(phones, key, initial) {
    // return phones
    //     .filter((phone) => {
    //         const manufactured = phone[key];
    //         if (
    //             manufactured instanceof Date &&
    //             manufactured.getTime() > new Date(initial).getTime()
    //         ) {
    //             return phone;
    //         }
    //     })
    //     .map((phone) => {
    //         const newObj = { ...phone, initialDate: initial };
    //         return newObj;
    //     });
    const targetDate = new Date(initial);
    return phones.reduce((result, phone) => {
        const manufactured = phone[key];
        if (manufactured instanceof Date && manufactured > targetDate) {
            const newObj = Object.assign(Object.assign({}, phone), { initialDate: initial });
            result.push(newObj);
        }
        return result;
    }, []);
}
// Второй аргумент при вызове функции должен быть связан с первым,
// а значит мы получим подсказки - свойства этого объекта
console.log(filterPhonesByDate(phones, "manufactured", "2022-01-01"));
const fitnessClubCenter = {
    clubName: "Fitness club Center",
    location: "central ave. 45, 5th floor",
    classes: [
        {
            name: "yoga",
            startsAt: "8:00 AM",
            duration: 60,
        },
        {
            name: "trx",
            startsAt: "11:00 AM",
            duration: 45,
        },
        {
            name: "swimming",
            startsAt: "3:00 PM",
            duration: 70,
        },
    ],
    futureClasses: [
        {
            name: "boxing",
            willStartsAt: "6:00 PM",
            duration: 40,
        },
        {
            name: "breath training",
            willStartsAt: "8:00 PM",
            duration: 30,
        },
    ],
    currClients: [
        {
            name: "John Smith",
            age: "-",
            gender: "male",
            timeLeft: "1 month",
        },
        {
            name: "Alise Smith",
            age: 35,
            gender: "female",
            timeLeft: "3 month",
        },
        {
            name: "Ann Sonne",
            age: 24,
            gender: "female",
            timeLeft: "5 month",
        },
    ],
    exClients: [
        {
            name: "Tom Smooth",
            age: 50,
            gender: "male",
            makeCallFor: new Date("2023-08-12"),
        },
    ],
    futureClients: [
        {
            name: "Maria",
            makeCallFor: new Date("2023-07-10"),
        },
    ],
};
function createSlider({ container = "", numberOfSlides = 1, speed = 300, direction = "horizontal", dots = true, arrows = true, } = {}) {
    console.log(container, numberOfSlides, speed, direction, dots, arrows);
}
createSlider();
const customSliderOptions = {
    container: "id",
    numberOfSlides: 4,
    speed: 1100,
    direction: "horizontal",
    dots: true,
    arrows: true,
};
function createCustomSlider(options) {
    if ("container" in options) {
        console.log(options);
    }
}
const validationData2 = {
    login: { isValid: false, errorMsg: "At least 3 characters" },
    password: { isValid: true },
};
