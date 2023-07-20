type TCount = "empty" | number | boolean;
interface IClothesWarehouse {
    jackets: TCount;
    hats: TCount;
    socks: TCount;
    pants: TCount;
}
interface IStationeryWarehouse {
    scissors: TCount;
    paper: TCount;
}
interface AppliancesWarehouse {
    dishwashers: TCount;
    cookers: TCount;
    mixers: TCount;
}
interface TotalWarehouse
    extends IClothesWarehouse,
        IStationeryWarehouse,
        AppliancesWarehouse {
    deficit: boolean;
    date: Date;
}

const totalData: TotalWarehouse = {
    jackets: 5,
    hats: "empty",
    socks: "empty",
    pants: 15,
    scissors: 15,
    paper: true,
    dishwashers: 3,
    cookers: "empty",
    mixers: 14,
    deficit: false,
    date: new Date(),
};

function printReport(data: TotalWarehouse): string {
    const result: string = Object.entries(data)
        .filter((item) => item[1] === "empty")
        .reduce((res, item) => `${res} ${item[0]},`, "");

    if (result.trim().length) {
        return `We need this items: ${result}`;
    } else {
        return "Everything fine";
    }
}

console.log(printReport(totalData));

// Перечисление с названием TypesOfMedia, которое включает строчные типы video, audio

// Перечисление с названием FormatsOfMedia, которое включает строчные видео-форматы: .mp4, .mov, .mkv, .flv, .webM

// Описание интерфейса, в котором:
// name - строка
// type - один из перечисления выше
// format = один из перечисления выше
// subtitles - необязательное поле типа строка
// marks - необязательное поле неизвестного типа

enum TypesOfMedia {
    VIDEO = "video",
    AUDIO = "audio",
}
enum FormatsOfMedia {
    MP4 = ".mp4",
    MOV = ".mov",
    MKV = ".mkv",
    FLV = ".flv",
    WEBM = ".webM",
}
interface IMedia {
    name: string;
    type: TypesOfMedia;
    format: FormatsOfMedia;
    subtitles?: string;
    marks?: unknown;
}

function playMedia(
    { name, type, format, subtitles, marks }: IMedia = {
        name: "example",
        type: TypesOfMedia.VIDEO,
        format: FormatsOfMedia.MP4,
    }
): string {
    let marksLog: string;

    // Создать функционал, что если marks - это массив, то "сложить" все эелементы в одну строку
    //  и поместить в marksLog
    // Если это строка, то просто поместить её в marksLog
    // Если что-то другое - то marksLog = "Unsupported type of marks"
    // Не допускайте any!
    if (Array.isArray(marks)) {
        marksLog = marks.join(", ");
    } else if (typeof marks === "string") {
        marksLog = marks;
    } else {
        marksLog = "Unsupported type of marks";
    }
    console.log(`Media ${name}${format} is ${type}
    Marks: ${marksLog}
    Subtitles: ${subtitles ?? "none"}`);
    // помните что это за оператор ??

    return "Media started";
}

playMedia({
    name: "WoW",
    format: FormatsOfMedia.MP4,
    type: TypesOfMedia.VIDEO,
    subtitles: "hmhmhm hmhmhm doh",
    marks: ["4:30", "5:40"],
});

// Request
// {
//     animal: 'cat' | 'dog' | 'bird',
//     breed: string,
//     sterilized?: string
// }

type TAnimal = "cat" | "dog" | "bird";

interface IAnimalData {
    animal: TAnimal;
    breed: string;
    sterilized?: string;
}

interface IAnimalAvailableData extends IAnimalData {
    location: string;
    age?: number;
}
interface IAnimalNotAvailableData extends IAnimalData {
    message: string;
    nextUpdateIn: Date;
}

interface IAnimalAvailableResponse {
    status: "available";
    data: IAnimalAvailableData;
}
interface IAnimalNotAvailableResponse {
    status: "not available";
    data: IAnimalNotAvailableData;
}

type TRes = IAnimalAvailableResponse | IAnimalNotAvailableResponse;

// Response #1

// {
//     status: 'available',
//     data: {
//         animal: 'cat' | 'dog' | 'bird',
//         breed: string,
//         sterilized?: string,
//         location: string,
//         age?: number
//     }
// }

// Response #2

// {
//     status: 'not available',
//     data: {
//         message: string,
//         nextUpdateIn: Date
//     }
// }

function checkAnimalData(animal: TRes): IAnimalAvailableData | string {
    if (isAvailable(animal)) {
        return animal.data;
    } else {
        return `${animal.data}, you can try in ${animal.data.nextUpdateIn}`;
    }
}

function isAvailable(res: TRes): res is IAnimalAvailableResponse {
    return (res as IAnimalAvailableResponse).status === "available";
}

// function isNotAvailable(
//     animal: TRes
// ): animal is IAnimalAvailableResponse  {
//     return (animal as IResponseNotAvailable).status === "not available";
// }

console.log(
    checkAnimalData({
        status: "available",
        data: {
            animal: "cat",
            breed: "breed",
            sterilized: "yes",
            location: "NY",
            age: 2,
        },
    })
);

const links = document.querySelectorAll("a");
