interface User1 {
    name: string;
    age?: number;
    email: string;
}

type partial = Partial<User1>;
const p1: partial = {};

type required = Required<User1>;
type readonly = Readonly<User1>;
type requiredAndReadonly = Required<Readonly<User1>>;

interface PaymentPersistent2 {
    id: number;
    sum: number;
    from: string;
    to: string;
}

type Payment1 = Omit<PaymentPersistent2, "id">;
type PaymentRequisits = Pick<PaymentPersistent2, "from" | "to">;
type ExtractEx = Extract<"from" | "to" | Payment1, string>;
type ExcludeEx = Exclude<"from" | "to" | Payment1, string>;

class User9 {
    constructor(public id: number, public name: string) {}
}

function getData(id: number, name: string): User9 {
    return new User9(id, name);
}
type RT = ReturnType<typeof getData>;
type RT2 = ReturnType<() => void>;
type RT3 = ReturnType<<T>() => T>;
type RT4 = ReturnType<<T extends string>() => T>;
type PT = Parameters<typeof getData>;
type first = PT[0];
type CP = ConstructorParameters<typeof User9>;
type IT = InstanceType<typeof User9>;

type A = Awaited<Promise<string>>;

interface IMenu {
    name: string;
    url: string;
}

async function getMenu(): Promise<IMenu[]> {
    return [{ name: "Analytics", url: "analytics" }];
}

type R = Awaited<ReturnType<typeof getMenu>>;

async function getArray<T>(x: T): Promise<Awaited<T>[]> {
    return [await x];
}
