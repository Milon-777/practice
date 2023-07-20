let array = ["Бильбо", "Гэндальф", "Назгул"];
let newArray = array.map((item) => item.length);
console.log(newArray);

let string = "Hello world";
console.log(string.split(" "));
console.log(string.split(""));

let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current);
console.log(result);

let army = {
    canJoin(user) {
        return user.age >= 18 && user.age < 27;
    },
};

let users = [{ age: 16 }, { age: 20 }, { age: 23 }, { age: 30 }];

// найти пользователей, для которых army.canJoin возвращает true
let soldiers = users.filter((user) => army.canJoin(user));

console.log(soldiers.length);
console.log(soldiers[0].age);
console.log(soldiers[1].age);

// const camelize = (string) => {
//     if (string.charAt(0) === "-") {
//         return string
//             .split("-")
//             .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
//             .join("");
//     } else {
//         return string
//             .split("-")
//             .map((item, index) => {
//                 if (index !== 0) {
//                     item.charAt(0).toUpperCase() + item.slice(1);
//                 }
//             })
//             .join("");
//     }
// };

// camelize("background-color") == "backgroundColor";
// camelize("list-style-image") == "listStyleImage";
// camelize("-webkit-transition") == "WebkitTransition";
