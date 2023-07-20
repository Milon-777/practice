// Создать Generic-интерфейс PlayerData, который подходил бы для создания таких объектов:

interface IPlayerData<T, U> {
    game: T;
    hours: U;
    server: string;
}

const player1: IPlayerData<string, number> = {
    game: "CS:GO",
    hours: 300,
    server: "basic",
};

const player2: IPlayerData<number, string> = {
    game: 2048,
    hours: "300 h.",
    server: "arcade",
};

const player3: IPlayerData<string, object> = {
    game: "Chess",
    hours: {
        total: 500,
        inMenu: 50,
    },
    server: "chess",
};

// Массив данных с фигурами содержит объекты, у каждого из которых обязательно есть свойство name
// Каждый объект может еще содержать дополнительные свойства в случайном виде
// Свойство name может иметь только 4 варианта
// Функция calculateAmountOfFigures должна принимать массив с объектами, у которых обязательно должно быть свойство name
// Возвращает она объект-экземпляр AmountOfFigures
// Внутри себя подсчитывает сколько каких фигур было в массиве и записывает результаты в AmountOfFigures
// С текущими данными в консоль должно попадать:
// { squares: 3, circles: 2, triangles: 2, others: 1 }

interface AmountOfFigures {
    squares: number;
    circles: number;
    triangles: number;
    others: number;
}

type TFigure = "rect" | "triangle" | "line" | "circle";

interface IFigure<T> {
    name: TFigure;
    data?: T;
}

function calculateAmountOfFigures(
    figures: Array<IFigure<object>>
): AmountOfFigures {
    let amountOfFigures: AmountOfFigures = {
        squares: figures.filter((f) => f.name === "rect").length,
        circles: figures.filter((f) => f.name === "circle").length,
        triangles: figures.filter((f) => f.name === "triangle").length,
        others: figures.filter(
            (f) =>
                f.name !== "rect" &&
                f.name !== "circle" &&
                f.name !== "triangle"
        ).length,
    };

    return amountOfFigures;
}

const data2: Array<IFigure<object>> = [
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

///////////////////

interface IPhone {
    company: string;
    number: number;
}

// IMobilePhone должен наследоваться от IPhone,
// тип свойства companyPartner зависит от свойства company

interface IMobilePhone extends IPhone {
    size: string;
    companyPartner: IPhone["company"];
    manufactured: Date;
}

// Типизировать объект phones

const phones: Array<IMobilePhone> = [
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

interface IPhonesManufacturedAfterDate extends IMobilePhone {
    initialDate: string;
}

// Функция должна отфильтровать массив данных и вернуть новый массив
// с телефонами, выпущенными после даты в третьем аргументе

function filterPhonesByDate(
    phones: IMobilePhone[],
    key: keyof IMobilePhone,
    initial: string
): IPhonesManufacturedAfterDate[] {
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
    const targetDate: Date = new Date(initial);

    return phones.reduce((result: IPhonesManufacturedAfterDate[], phone) => {
        const manufactured = phone[key];

        if (manufactured instanceof Date && manufactured > targetDate) {
            const newObj: IPhonesManufacturedAfterDate = {
                ...phone,
                initialDate: initial,
            };

            result.push(newObj);
        }
        return result;
    }, []);
}

// Второй аргумент при вызове функции должен быть связан с первым,
// а значит мы получим подсказки - свойства этого объекта

console.log(filterPhonesByDate(phones, "manufactured", "2022-01-01"));

// Необходимо типизировать этот большой объект
// Свойство futureClasses должно быть в зависимости от classes по типу
// Свойства exClients и futureClients тоже должны быть в зависимости от currClients
// ИЛИ все три зависят от общего родителя

// Простыми словами: при добавлении свойства в целевой объект они должны быть
// автоматически добавлены в зависимые (сразу подсказка от TS)

interface IFitnessClub {
    clubName: string;
    location: string;
    classes: Array<IClass>;
    futureClasses: Array<IFutureClass>;
    currClients: Array<IClient>;
    exClients: Array<IExClient>;
    futureClients: Array<IFutureClient>;
}

interface IClass {
    name: string;
    startsAt: string;
    duration: number;
}

interface IFutureClass extends Omit<IClass, "startsAt"> {
    willStartsAt: string;
}

interface IClient {
    name: string;
    age: string | number;
    gender: "male" | "female";
    timeLeft: string;
}

interface IExClient extends Omit<IClient, "timeLeft"> {
    makeCallFor: Date;
}

interface IFutureClient extends Pick<IClient, "name"> {
    makeCallFor: Date;
}

const fitnessClubCenter: IFitnessClub = {
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

interface ISlider {
    container?: string;
    numberOfSlides?: number;
    speed?: 300 | 500 | 700;
    direction?: "horizontal" | "vertical";
    dots?: boolean;
    arrows?: boolean;
    animationName?: string;
}

function createSlider({
    container = "",
    numberOfSlides = 1,
    speed = 300,
    direction = "horizontal",
    dots = true,
    arrows = true,
}: ISlider = {}): void {
    console.log(container, numberOfSlides, speed, direction, dots, arrows);
}

createSlider();

// Необходимо типизировать объект настроек, который будет зависим
// от интерфейса ISlider
// Все поля в нем обязательны для заполнения

// type TCustomSlider<T> = {
//     [P in keyof T]-?: T[P];
// };

// interface ICustomSlider
//     extends Omit<TCustomSlider<ISlider>, "speed" | "animationName"> {
//     speed: number;
// }

interface ICustomSlider
    extends Required<Omit<ISlider, "speed" | "animationName">> {
    speed: number;
}

const customSliderOptions: ICustomSlider = {
    container: "id",
    numberOfSlides: 4,
    speed: 1100,
    direction: "horizontal",
    dots: true,
    arrows: true,
};

function createCustomSlider(options: ICustomSlider): void {
    if ("container" in options) {
        console.log(options);
    }
}

interface IForm2 {
    login: string;
    password: string;
}

// Необходимо типизировать объект валидации
// Учтите, что данные в форме могут расширяться и эти поля
// должны появиться и в объекте валидации

// interface IFormValidation extends Record<keyof IForm, TValid | TNonValid> {}

// type TValid = {
//     isValid: true;
// };

// type TNonValid = {
//     isValid: false;
//     errorMsg: string;
// };
type TValidation<T> = {
    [P in keyof T]: { isValid: true } | { isValid: false; errorMsg: string };
};

const validationData2: TValidation<IForm2> = {
    login: { isValid: false, errorMsg: "At least 3 characters" },
    password: { isValid: true },
};
