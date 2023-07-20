import { idText } from "typescript";

let revenue: number = 1000;
let bonus: number = 500;
let c: string = "sdt";
let d: boolean = true;

let res: number = revenue + bonus;
console.log(res);

function getFullName(user: { firstname: string; surname: string }): string {
    return `${user.firstname} ${user.surname}`;
}

// const getFullName = (user: { firstname: string; surname: string }): string => {
//   return `${user.firstname} ${user.surname}`;
// }

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
    officeId: number;
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

const skills2: ReadonlyArray<string> = ["dev", "devops", "testing"];

skills2
    .filter((s: string) => s + "!")
    .map((s) => s + "!")
    .reduce((a, b) => a + b);

console.log("Skills2: ", skills2);

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

const enum QuestionStatus {
    Published = "published",
    Draft = "draft",
    Deleted = "deleted",
}

async function getFaqs(req: {
    topicId: number;
    status?: QuestionStatus;
}): Promise<
    {
        question: string;
        answer: string;
        tags: string[];
        likes: number;
        status: QuestionStatus;
    }[]
> {
    const res = await fetch("/faqs", {
        method: "POST",
        body: JSON.stringify(req),
    });
    const data = await res.json();
    return data;
}

function logId(id: string | number | boolean) {
    if (typeof id === "string") {
        console.log(id.toLocaleUpperCase);
    } else {
        console.log(id);
    }
}

logId(1);
logId("1");
logId(true);

function logError(err: string | string[]) {
    if (Array.isArray(err)) {
        console.log(err);
    } else {
        console.log(err);
    }
}

function logObj(obj: { a: number } | { b: number }) {
    if ("a" in obj) {
        console.log(obj.a);
    } else {
        console.log(obj.b);
    }
}

function logMultipleIds(a: string | number, b: string | boolean) {
    if (a === b) {
        console.log(a.toLocaleLowerCase);
        console.log(b.toUpperCase);
    } else {
        console.log(a);
    }
}

let a: 1 = 1;

type httpMethod = "post" | "get";

type coolString = string;

function fetchWithAuth(url: string, method: httpMethod) {}

fetchWithAuth("s", "post");

let b: "ssss" = "ssss";

// const method = "post";
// let method: 'post' = 'post';
let method = "post";

fetchWithAuth("s", method as "post");

type User = {
    name: string;
    age: number;
    skills: string[];
};

interface UserI {
    name: string;
    age: number;
    skills: string[];

    log: (id: number) => string;
}

interface RoleI {
    roleId: number;
}

interface UserWithRoleI extends UserI, RoleI {
    createdAt: Date;
}

// Майже ніхто не використовує
let user2: {
    name: string;
    age: number;
    skills: string[];
} = {
    name: "asd",
    age: 21,
    skills: ["1", "2"],
};

type Role = {
    name: string;
    id: number;
};

// intersection
type UserWithRole = UserI & Role;

// краще робити так
type UserWithRole2 = {
    user: UserI;
    role: Role;
};

let user3: UserWithRole = {
    name: "asd",
    age: 21,
    skills: ["1", "2"],
    id: 1,
    log(id) {
        return "id";
    },
};

interface UserDic {
    [index: number]: UserI;
}

type UserDic2 = Record<number, User>;

interface User2 {
    name: string;
}

interface User2 {
    age: number;
}

let user4: User2 = {
    name: "as",
    age: 21,
};

// type Id = string | number;

interface IDI {
    ID: string | number;
}

interface User3 {
    login: string;
    password?: string;
}

let user5: User3 = {
    login: "dray",
};

function multiply(first: number, second?: number): number {
    if (!second) {
        return first * first;
    }
    return first * second;
}

multiply(5);

interface UserPro {
    login: string;
    password?: {
        type: "primary" | "secondary";
    };
}

function testPass(user: UserPro) {
    const t = user.password?.type;
}

function test(param?: string) {
    const t = param ?? multiply(5);
}

type Id = string | number;

interface IPayment {
    sum: number;
    from: Id;
    to: Id;
}

enum PaymentStatus {
    Success = "success",
    Failed = "failed",
}

enum ErrorCode {
    Error1 = 1,
    Error2,
    Error3,
    Error4,
}

interface IPaymentRequest extends IPayment {}

interface IDataSuccess extends IPayment {
    databaseId: Id;
}

interface IDataFailed {
    errorMessage: string;
    errorCode: ErrorCode;
}

interface IResponseSuccess {
    status: PaymentStatus.Success;
    data: IDataSuccess;
}

interface IResponseFailed {
    status: PaymentStatus.Failed;
    data: IDataFailed;
}

type f = (res: IResponseSuccess | IResponseFailed) => number;

type Res = IResponseSuccess | IResponseFailed;

function isSuccess(res: Res): res is IResponseSuccess {
    // return "databaseId" in res;
    if (res.status === PaymentStatus.Success) {
        return true;
    }
    return false;
}

function getIdFromData(res: Res): number {
    if (isSuccess(res)) {
        return res.data.databaseId as number;
    } else {
        throw new Error(res.data.errorMessage);
    }
}

// function isAdmin(user: User | Admin): user is Admin {
//     return "role" in user;
// }
// function get(): IResponseSuccess | IResponseFailed {}

function logID(id: string | number): void {
    console.log(idText);
}

const e = logID(1);

type voidFunc = () => void;

const f1: voidFunc = () => {};
const f2: voidFunc = () => {
    return true;
};
const i = f2();

const skills3 = ["Dev", "DevOps"];
const user33 = {
    s: ["s"],
};
skills3.forEach((skill) => user33.s.push(skill));

let input: unknown;
input = 3;
input = ["sf", "2"];
function run(i: unknown) {
    if (typeof i == "number") {
        i++;
    } else {
        i;
    }
}
run(input);

async function getData() {
    try {
        await fetch("");
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

type U1 = unknown | null;
type I1 = unknown & string;

function generateError(message: string): never {
    throw new Error(message);
}

function dumpError(): never {
    while (true) {}
}

function rec(): never {
    return rec();
}

type paymentAction = "refund" | "checkout";
function processAction(action: paymentAction) {
    switch (action) {
        case "refund":
            //...
            break;
        case "checkout":
            //...
            break;
        default:
            const _: never = action;
            throw new Error("Нема такого action");
    }
}

let n: null = null;

let a1 = 5;
let b1: string = a.toString();
let e1: string = new String(a).valueOf();
let g1: boolean = new Boolean(a).valueOf();
let c1 = "dsds";
let d1: number = parseInt(c);

interface User11 {
    name: string;
    email: string;
    login: string;
}

const user11: User11 = {
    name: "Den",
    email: "den@gmail.com",
    login: "den",
};

interface Admin {
    name: string;
    role: number;
}

const admin: Admin = { ...user11, role: 1 };
function userToAdmin(user: User): Admin {
    return {
        name: user.name,
        role: 1,
    };
}

function logId2(id: string | number) {
    if (isString(id)) {
        console.log(id);
    } else {
        console.log(id);
    }
}

function isString(x: string | number): x is string {
    return typeof x === "string";
}

function isAdmin(user: User | Admin): user is Admin {
    return "role" in user;
}

function isAdminAlternative(user: User | Admin): user is Admin {
    return (user as Admin).role !== undefined;
}

function setRoleZero(user: User | Admin) {
    if (isAdmin(user)) {
        user.role = 0;
    } else {
        throw new Error("Користувач не адмін");
    }
}

function checkReadings(readings: { system: number } | { user: number }): void {
    if ("system" in readings) {
        console.log(readings.system);
    } else {
        console.log(readings.user);
    }
}

function logValue(x: string | Date) {
    if (x instanceof Date) {
        console.log(x.getDate);
    } else {
        console.log(x);
    }
}
