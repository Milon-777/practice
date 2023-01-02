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

const skills: readonly [number, string] = [1, "Developer"];

const arr: [number, string, ...boolean[]] = [1, "text", true, false, true];

enum StatusCode {
  SUCCESS = 1,
  IN_PROCESS,
  FAILED,
}

const obj1 = {
  message: "Payment successful",
  statusCode: StatusCode.SUCCESS,
};

function action(status: StatusCode) {
  console.log(status);
}

action(obj1.statusCode);
action(2);

function compute() {
  return 3;
}

const enum Roles {
  ADMIN = 1,
  USER = 2,
}

console.log(Roles.USER);
