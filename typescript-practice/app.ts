let revenue: number = 1000;
let bonus: number = 500;
let c: string = "sdt";
let d: boolean = true;

let res: number = revenue + bonus;
console.log(res);

function getFullName(user: { firstname: string; surname: string }): string {
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

let info: {
  officeId: string;
  isOpened: boolean;
  contacts: {
    phone: string;
    email: string;
    adress: {
      city: string;
    };
  };
};

console.log("almost)");
console.log("almost there)");
console.log("congratulations");
console.log("and");
