class User {
    name: string;
    age: number;

    constructor();
    constructor(name: string);
    constructor(age: number);
    constructor(name: string, age: number);
    constructor(ageOrName?: string | number, age?: number) {
        if (typeof ageOrName === "string") {
            this.name = ageOrName;
        } else if (typeof ageOrName === "number") {
            this.age = ageOrName;
        }
        if (typeof age === "number") {
            this.age = age;
        }
    }
}

const user = new User("Viktor");
const user2 = new User("Tom");
const user3 = new User(33);
const user4 = new User("Den", 33);
user.name = "Den";
console.log(user);

class Admin {
    role: number;
}
const admin = new Admin();
admin.role = 1;

enum PaymentStatus {
    Holded,
    Processed,
    Reversed,
}

class Payment {
    id: number;
    status: PaymentStatus = PaymentStatus.Holded;
    createdAt: Date = new Date();
    updatedAt: Date;

    constructor(id: number) {
        this.id = id;
    }

    getPaymentLifeTime(): number {
        return new Date().getTime() - this.createdAt.getTime();
    }

    unholdPayment(): void {
        if (this.status == PaymentStatus.Processed) {
            throw new Error("Платіж не може бути повернений!");
        }
        this.status = PaymentStatus.Reversed;
        this.updatedAt = new Date();
    }
}

const payment = new Payment(1);
payment.unholdPayment();
const time = payment.getPaymentLifeTime();

class User2 {
    skills: string[] = [];

    // addSkill(string or strin[])

    addSkill(skill: string): void;
    addSkill(skills: string[]): void;
    addSkill(skillOrSkills: string | string[]): void {
        if (Array.isArray(skillOrSkills)) {
            this.skills.concat(skillOrSkills);
        } else {
            this.skills.push(skillOrSkills);
        }
    }
}

function run(distance: number): number;
function run(distance: string): string;
function run(distance: number | string): number | string {
    if (typeof distance == "number") {
        return 1;
    } else {
        return "";
    }
}

class User3 {
    _login: string;
    password: string;
    createdAt: Date;

    set login(login: string) {
        this._login = "user-" + login;
        this.createdAt = new Date();
    }

    get login() {
        return this._login;
    }

    async getPassword(p: string) {}

    // set password(p: string) {
    //     //sync
    // }
}

const user5 = new User3();
user5.login = "dray";
console.log(user5);
console.log(user5.login);

interface ILogger {
    log(...args: unknown[]): void;
    error(...args: unknown[]): void;
}

class Logger implements ILogger {
    log(...args: unknown[]): void {
        console.log(...args);
    }
    error(...args: unknown[]): void {
        console.log(...args);
    }
}

interface IPayable {
    pay(paymentId: number): void;
    price?: number;
}

interface IDeletable {
    delete(): void;
}

class User4 implements IPayable, IDeletable {
    delete(): void {
        ///
    }
    pay(paymentId: number | string): void {
        ///
    }
    price?: number | undefined;
}

type PaymentStatus2 = "new" | "paid";

class Payment2 {
    id: number;
    status: PaymentStatus2 = "new";

    constructor(id: number) {
        this.id = id;
    }

    pay() {
        this.status = "paid";
    }
}

class PersistedPayment extends Payment2 {
    databaseId: number;
    paidAt: Date;

    constructor() {
        const id = Math.random();
        super(id);
    }

    save() {
        // Зберігаємо в базу
    }

    override pay(date?: Date): void {
        super.pay();
        if (date) {
            this.paidAt = date;
        }
    }
}

class User5 {
    name: string = "user";

    constructor() {
        console.log(this.name);
    }
}

class Admin2 extends User {
    name: string = "admin";

    constructor() {
        super();
        console.log(this.name);
    }
}
new Admin();

class HttpError extends Error {
    code: number;
    constructor(message: string, code?: number) {
        super(message);
        this.code = code ?? 500;
    }
}

class User6 {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

// Наслідування
// class Users extends Array<User6> {
//     searchByName(name: string) {
//         return this.filter((u) => u.name === name);
//     }

//     override toString(): string {
//         return this.map((u) => u.name).join(", ");
//     }
// }

// const users = new Users();
// users.push(new User("Vika"));
// users.toString();

// Композиція
class UserList {
    users: User[];

    push(u: User) {
        this.users.push(u);
    }
}

class Payment3 {
    date: Date;
}

// class UserWithPayment extends Payment {
//     name: string;
// }

class UserWithPayment {
    user: User6;
    payment: Payment3;

    constructor(user: User, payment: Payment3) {
        this.payment = payment;
        this.user = user;
    }
}

class Vehicle {
    public brand: string;
    private damages: string[];
    private _model: string;
    protected run: number;
    private price: number;
    // #price: number;

    set model(m: string) {
        this._model = m;
    }

    get model() {
        return this._model;
    }

    isPriceEqual(v: Vehicle) {
        return this.price === v.price;
    }

    addDamage(damage: string) {
        this.damages.push(damage);
    }
}

class EuroTruck extends Vehicle {
    setRun(km: number) {
        this.run = km / 0.62;
    }
}

class Product {
    constructor(public id: number, public name: string, public price: number) {}
}

class Delivery {
    constructor(public date: Date) {}
}

class HomeDelivery extends Delivery {
    constructor(public date: Date, public address: string) {
        super(date);
    }
}

class ShopDelivery extends Delivery {
    constructor(public shopId: number) {
        super(new Date());
    }
}

type DeliveryOptions = HomeDelivery | ShopDelivery;

class Cart {
    private products: Product[] = [];
    private delivery: DeliveryOptions;
    private totalPrice: number = 0;

    public addProduct(p: Product): void {
        this.products.push(p);
    }

    public deleteProduct(productId: number): void {
        this.products = this.products.filter(
            (p: Product) => p.id !== productId
        );
    }

    public getSum(): number {
        return this.products
            .map((p: Product) => p.price)
            .reduce((p1: number, p2: number) => p1 + p2);
    }

    public setDelivery(delivery: DeliveryOptions): void {
        this.delivery = delivery;
    }

    public checkout() {
        if (this.products.length == 0) {
            throw new Error("Нема ні одного товару в кошику");
        }
        if (!this.delivery) {
            throw new Error("Не вказан спосіб доставки");
        }
        return { success: true };
    }
}

const cart = new Cart();
cart.addProduct(new Product(1, "Печіво", 10));
cart.addProduct(new Product(2, "Торт", 20));
cart.addProduct(new Product(3, "Шоколад", 40));
cart.deleteProduct(1);
cart.setDelivery(new HomeDelivery(new Date(), "Адреса"));
console.log(cart.getSum());
console.log(cart.checkout());

class UserService {
    private static db: any;

    static getUser(id: number) {
        // return UserService.db.findById(id);
    }

    constructor(id: number) {}

    create() {
        UserService.db;
    }

    static {
        UserService.db = "sdf";
    }
}

UserService.getUser(1);
const inst = new UserService(1);
inst.create();

class Payment4 {
    private date: Date = new Date();

    getDate(this: Payment4) {
        return this.date;
    }

    getDateArrow = () => {
        return this.date;
    };
}

const p = new Payment4();

const user1 = {
    id: 1,
    paymentDate: p.getDate.bind(p),
    paymentDateArrow: p.getDateArrow,
};

// console.log(p.getDate());
// console.log(user1.paymentDate());
// console.log(user1.paymentDateArrow());

class PaymentPersistent extends Payment4 {
    save() {
        return super.getDate();
    }
}

console.log(new PaymentPersistent().save());

class UserBuilder {
    name: string;

    setName(name: string): this {
        this.name = name;
        return this;
    }

    isAdmin(): this is AdminBuilder {
        return this instanceof AdminBuilder;
    }
}

class AdminBuilder extends UserBuilder {
    roles: string[];
}

const res = new UserBuilder().setName("Vasya");
const res2 = new AdminBuilder().setName("Vasya Admin");

let user6: UserBuilder | AdminBuilder = new UserBuilder();
if (user6.isAdmin()) {
    console.log(user6);
} else {
    console.log(user6);
}

abstract class Controller {
    abstract handle(req: unknown): void;

    handleWithLogs(req: unknown) {
        console.log("Start");
        this.handle(req);
        console.log("End");
    }
}

class UserController extends Controller {
    handle(req: unknown): void {
        console.log(req);
    }
}
const c = new UserController();
c.handleWithLogs("request");

abstract class LoggerTest {
    abstract log(message: string): void;

    printDate(date: Date): void {
        this.log(date.toString());
    }
}

class DateLogger extends LoggerTest {
    log(message: string): void {
        console.log(message);
    }
    logWithDate(message: string): void {
        this.printDate(new Date());
        this.log(message);
    }
}

const dateL = new DateLogger();
dateL.printDate(new Date());
