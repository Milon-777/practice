"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class User {
    constructor(ageOrName, age) {
        if (typeof ageOrName === "string") {
            this.name = ageOrName;
        }
        else if (typeof ageOrName === "number") {
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
}
const admin = new Admin();
admin.role = 1;
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus[PaymentStatus["Holded"] = 0] = "Holded";
    PaymentStatus[PaymentStatus["Processed"] = 1] = "Processed";
    PaymentStatus[PaymentStatus["Reversed"] = 2] = "Reversed";
})(PaymentStatus || (PaymentStatus = {}));
class Payment {
    constructor(id) {
        this.status = PaymentStatus.Holded;
        this.createdAt = new Date();
        this.id = id;
    }
    getPaymentLifeTime() {
        return new Date().getTime() - this.createdAt.getTime();
    }
    unholdPayment() {
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
    constructor() {
        this.skills = [];
    }
    addSkill(skillOrSkills) {
        if (Array.isArray(skillOrSkills)) {
            this.skills.concat(skillOrSkills);
        }
        else {
            this.skills.push(skillOrSkills);
        }
    }
}
function run(distance) {
    if (typeof distance == "number") {
        return 1;
    }
    else {
        return "";
    }
}
class User3 {
    set login(login) {
        this._login = "user-" + login;
        this.createdAt = new Date();
    }
    get login() {
        return this._login;
    }
    getPassword(p) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
const user5 = new User3();
user5.login = "dray";
console.log(user5);
console.log(user5.login);
class Logger {
    log(...args) {
        console.log(...args);
    }
    error(...args) {
        console.log(...args);
    }
}
class User4 {
    delete() {
        ///
    }
    pay(paymentId) {
        ///
    }
}
class Payment2 {
    constructor(id) {
        this.status = "new";
        this.id = id;
    }
    pay() {
        this.status = "paid";
    }
}
class PersistedPayment extends Payment2 {
    constructor() {
        const id = Math.random();
        super(id);
    }
    save() {
        // Зберігаємо в базу
    }
    pay(date) {
        super.pay();
        if (date) {
            this.paidAt = date;
        }
    }
}
class User5 {
    constructor() {
        this.name = "user";
        console.log(this.name);
    }
}
class Admin2 extends User {
    constructor() {
        super();
        this.name = "admin";
        console.log(this.name);
    }
}
new Admin();
class HttpError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code !== null && code !== void 0 ? code : 500;
    }
}
class User6 {
    constructor(name) {
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
    push(u) {
        this.users.push(u);
    }
}
class Payment3 {
}
// class UserWithPayment extends Payment {
//     name: string;
// }
class UserWithPayment {
    constructor(user, payment) {
        this.payment = payment;
        this.user = user;
    }
}
class Vehicle {
    // #price: number;
    set model(m) {
        this._model = m;
    }
    get model() {
        return this._model;
    }
    isPriceEqual(v) {
        return this.price === v.price;
    }
    addDamage(damage) {
        this.damages.push(damage);
    }
}
class EuroTruck extends Vehicle {
    setRun(km) {
        this.run = km / 0.62;
    }
}
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class Delivery {
    constructor(date) {
        this.date = date;
    }
}
class HomeDelivery extends Delivery {
    constructor(date, address) {
        super(date);
        this.date = date;
        this.address = address;
    }
}
class ShopDelivery extends Delivery {
    constructor(shopId) {
        super(new Date());
        this.shopId = shopId;
    }
}
class Cart {
    constructor() {
        this.products = [];
        this.totalPrice = 0;
    }
    addProduct(p) {
        this.products.push(p);
    }
    deleteProduct(productId) {
        this.products = this.products.filter((p) => p.id !== productId);
    }
    getSum() {
        return this.products
            .map((p) => p.price)
            .reduce((p1, p2) => p1 + p2);
    }
    setDelivery(delivery) {
        this.delivery = delivery;
    }
    checkout() {
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
    static getUser(id) {
        // return UserService.db.findById(id);
    }
    constructor(id) { }
    create() {
        UserService.db;
    }
}
(() => {
    UserService.db = "sdf";
})();
UserService.getUser(1);
const inst = new UserService(1);
inst.create();
class Payment4 {
    constructor() {
        this.date = new Date();
        this.getDateArrow = () => {
            return this.date;
        };
    }
    getDate() {
        return this.date;
    }
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
    setName(name) {
        this.name = name;
        return this;
    }
    isAdmin() {
        return this instanceof AdminBuilder;
    }
}
class AdminBuilder extends UserBuilder {
}
const res = new UserBuilder().setName("Vasya");
const res2 = new AdminBuilder().setName("Vasya Admin");
let user6 = new UserBuilder();
if (user6.isAdmin()) {
    console.log(user6);
}
else {
    console.log(user6);
}
class Controller {
    handleWithLogs(req) {
        console.log("Start");
        this.handle(req);
        console.log("End");
    }
}
class UserController extends Controller {
    handle(req) {
        console.log(req);
    }
}
const c = new UserController();
c.handleWithLogs("request");
class LoggerTest {
    printDate(date) {
        this.log(date.toString());
    }
}
class DateLogger extends LoggerTest {
    log(message) {
        console.log(message);
    }
    logWithDate(message) {
        this.printDate(new Date());
        this.log(message);
    }
}
const dateL = new DateLogger();
dateL.printDate(new Date());
