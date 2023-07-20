"use strict";
const totalData = {
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
function printReport(data) {
    const result = Object.entries(data)
        .filter((item) => item[1] === "empty")
        .reduce((res, item) => `${res} ${item[0]},`, "");
    if (result.trim().length) {
        return `We need this items: ${result}`;
    }
    else {
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
var TypesOfMedia;
(function (TypesOfMedia) {
    TypesOfMedia["VIDEO"] = "video";
    TypesOfMedia["AUDIO"] = "audio";
})(TypesOfMedia || (TypesOfMedia = {}));
var FormatsOfMedia;
(function (FormatsOfMedia) {
    FormatsOfMedia["MP4"] = ".mp4";
    FormatsOfMedia["MOV"] = ".mov";
    FormatsOfMedia["MKV"] = ".mkv";
    FormatsOfMedia["FLV"] = ".flv";
    FormatsOfMedia["WEBM"] = ".webM";
})(FormatsOfMedia || (FormatsOfMedia = {}));
function playMedia({ name, type, format, subtitles, marks } = {
    name: "example",
    type: TypesOfMedia.VIDEO,
    format: FormatsOfMedia.MP4,
}) {
    let marksLog;
    // Создать функционал, что если marks - это массив, то "сложить" все эелементы в одну строку
    //  и поместить в marksLog
    // Если это строка, то просто поместить её в marksLog
    // Если что-то другое - то marksLog = "Unsupported type of marks"
    // Не допускайте any!
    if (Array.isArray(marks)) {
        marksLog = marks.join(", ");
    }
    else if (typeof marks === "string") {
        marksLog = marks;
    }
    else {
        marksLog = "Unsupported type of marks";
    }
    console.log(`Media ${name}${format} is ${type}
    Marks: ${marksLog}
    Subtitles: ${subtitles !== null && subtitles !== void 0 ? subtitles : "none"}`);
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
function checkAnimalData(animal) {
    if (isAvailable(animal)) {
        return animal.data;
    }
    else {
        return `${animal.data}, you can try in ${animal.data.nextUpdateIn}`;
    }
}
function isAvailable(res) {
    return res.status === "available";
}
// function isNotAvailable(
//     animal: TRes
// ): animal is IAnimalAvailableResponse  {
//     return (animal as IResponseNotAvailable).status === "not available";
// }
console.log(checkAnimalData({
    status: "available",
    data: {
        animal: "cat",
        breed: "breed",
        sterilized: "yes",
        location: "NY",
        age: 2,
    },
}));
const links = document.querySelectorAll("a");
