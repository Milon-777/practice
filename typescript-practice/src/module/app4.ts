interface IUser {
    name: string;
    age: number;
}

type KeysOfUser = keyof IUser;
// const key: KeysOfUser = "age";

function getValue<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
const user7: IUser = {
    name: "Anton",
    age: 30,
};
const userName = getValue(user7, "name");

interface Data {
    group: number;
    name: string;
}

const data: Data[] = [
    { group: 1, name: "a" },
    { group: 3, name: "b" },
    { group: 2, name: "c" },
    { group: 1, name: "a" },
    { group: 3, name: "b" },
    { group: 2, name: "c" },
];

interface IGroup<T> {
    [key: string]: T[];
}

type key = string | number | symbol;

function groupData<T extends Record<key, any>, K extends keyof T>(
    data: T[],
    key: K
): IGroup<T> {
    return data.reduce<IGroup<T>>((map: IGroup<T>, item) => {
        const itemKey = item[key];
        let currElem = map[itemKey];
        if (Array.isArray(currElem)) {
            currElem.push(item);
        } else {
            currElem = [item];
        }
        map[itemKey] = currElem;
        return map;
    }, {});
}

console.log(groupData(data, "group"));

let strOrNum: string | number = 5;

let str20OrNum: typeof strOrNum;

const user8 = {
    name: "Viktor",
};

type keyOfUser = keyof typeof user8;

enum Direction {
    Up,
    Down,
}

type d = keyof typeof Direction;

interface Role2 {
    name: string;
}

interface Permission {
    endDate: Date;
}

interface User5 {
    name: string;
    roles: Role2[];
    permission: Permission;
}

const userr: User5 = {
    name: "Anton",
    roles: [],
    permission: {
        endDate: new Date(),
    },
};

const nameUser = User5["name"];
let roleNames: "roles" = "roles";
type rolesType = User5["roles"];
type rolesType2 = User5[typeof roleNames];

type roleType = User5["roles"][number];
type dateType = User5["permission"]["endDate"];

const roles = ["admin", "user", "super-user"] as const;
type roleTypes = (typeof roles)[number];

const a1: number = Math.random() > 0.5 ? 1 : 0;

interface HTTPResponse<T extends "success" | "failed"> {
    code: number;
    data: T extends "success" ? string : Error;
    additionalData: T extends "success" ? string : number;
}

const succ: HTTPResponse<"success"> = {
    code: 200,
    data: "done",
    additionalData: "done",
};

const err: HTTPResponse<"failed"> = {
    code: 400,
    data: new Error(),
    additionalData: 404,
};

class User8 {
    id: number;
    name: string;
}

class UserPersistend8 extends User8 {
    dbId: string;
}

function getUser(id: number): User8;
function getUser(dbId: string): UserPersistend8;
function getUser(dbIdOrId: string | number): User8 | UserPersistend8 {
    if (typeof dbIdOrId === "number") {
        return new User8();
    } else {
        return new UserPersistend8();
    }
}

type UserOrUserPersistend<T extends string | number> = T extends number
    ? User8
    : UserPersistend8;
function getUser2<T extends string | number>(id: T): UserOrUserPersistend<T> {
    if (typeof id === "number") {
        return new User8() as UserOrUserPersistend<T>;
    } else {
        return new UserPersistend8() as UserOrUserPersistend<T>;
    }
}

const ress = getUser2(1);
const resss = getUser2("sds");

function runTransaction(transaction: { fromTo: [string, string] }) {
    console.log(transaction);
}

const transaction: GetFirstArg<typeof runTransaction> = {
    fromTo: ["1", "2"],
};

runTransaction(transaction);

type GetFirstArg<T> = T extends (first: infer First, ...args: any[]) => any
    ? First
    : never;

type Modifier = "read" | "update" | "create";

type UserRoles2 = {
    customers?: Modifier;
    projects?: Modifier;
    adminPanel?: Modifier;
};

type ModifierToAccess<Type> = {
    +readonly [Property in keyof Type as Exclude<
        `canAccess ${string & Property}`,
        "canAccess adminPanel"
    >]-?: boolean;
};

type UserAccess2 = ModifierToAccess<UserRoles2>;

interface IForm {
    name: string;
    password: string;
}

const form: IForm = {
    name: "Viktor",
    password: "123",
};

const formValidation = {
    name: { isValid: true },
    password: {
        isValid: false,
        errorMessage: "Повинен бути бути більше 5 символів",
    },
};

type Validation<Type> = {
    [Property in keyof Type]:
        | { isValid: true }
        | { isValid: false; errorMessage: string };
};

type ModifierForm = Validation<IForm>;

type ReadOrWrite = "read" | "write";
type Bulk = "bulk" | "";

type Access = `can${Capitalize<ReadOrWrite>}${Capitalize<Bulk>}`;

type ReadOrWriteBulk<T> = T extends `can${infer R}` ? R : never;

type T = ReadOrWriteBulk<Access>;

type ErrorOrSuccess = "error" | "success";

type ResponseT = {
    result: `http${Capitalize<ErrorOrSuccess>}`;
};
