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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Player_login;
class Box {
    constructor(width, volume, content) {
        this.height = 500;
        this.width = width;
        this.volume = volume;
        this._content = content;
    }
    calculateVolume() {
        if (!this.volume) {
            this.volume = this.width * this.height;
            console.log(`Об'єм посилки: ${this.volume}`);
        }
        else {
            console.log(`Об'єм посилки: ${this.volume}`);
        }
    }
    checkBoxSize(transport) {
        if (typeof transport === "number") {
            return transport >= this.width ? "Ok" : "Not ok";
        }
        else {
            return transport.some((t) => t >= this.width) ? "Ok" : "Not ok";
        }
    }
    // get content() {
    //     return this._content;
    // }
    // set content(value) {
    //     this._content = `Date: ${new Date().toTimeString()}, Content: ${value}`;
    // }
    content(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = yield new Date().toTimeString();
            this._content = `Date: ${date}, Content: ${value}`;
            console.log(this._content);
            // return this._content;
        });
    }
}
const firstBox = new Box(250);
firstBox.volume = 5000;
console.log(firstBox.calculateVolume());
console.log(firstBox.checkBoxSize(270));
// console.log((firstBox.content = "Test"));
console.log(firstBox.content);
// class Userr2 {
//     name: string;
// }
// const user12 = new Userr2();
// user12.name = "Alex";
class Styles {
}
const style = new Styles();
style.color = "black";
style.font = "Roboto";
class PresentBox extends Box {
    constructor(wrap, width) {
        super(width);
        this.height = 600;
        this.wrap = wrap;
    }
    content(value, text) {
        const _super = Object.create(null, {
            content: { get: () => super.content }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const date = yield new Date().toTimeString();
            if (!text) {
                _super.content.call(this, value);
            }
            else {
                this._content = `Date: ${date}, Content: ${value}, Text: ${text !== null && text !== void 0 ? text : "No text"}`;
            }
            console.log(this._content);
            // return this._content;
        });
    }
}
console.log(new PresentBox("wrapper", 200).content("TV", "Gift"));
class CUserForm {
    constructor() {
        this.valid = false;
    }
    isValid(login) {
        return login.length > 3;
    }
}
function setName() {
    return "COD";
}
class Player {
    constructor(login) {
        _Player_login.set(this, void 0);
        this.logIn = () => {
            return `Player ${__classPrivateFieldGet(this, _Player_login, "f")} is online!`;
        };
        __classPrivateFieldSet(this, _Player_login, login, "f");
    }
    get password() {
        return this._password;
    }
    set password(newPassword) {
        //Validation ...
        this._password = newPassword;
    }
    static getGameName() {
        return Player.game;
    }
    connect() {
        //Doing smth...
        return this;
    }
    isPro() {
        return this instanceof CompetitivePlayer;
    }
}
_Player_login = new WeakMap();
(() => {
    Player.game = setName();
})();
console.log(Player.getGameName);
class CompetitivePlayer extends Player {
    isConsented() {
        this.consent ? "Yes" : "No";
    }
    checkLogin() {
        return this.logIn();
    }
}
const player = new Player("test");
console.log(player.logIn());
const test1 = player.logIn;
test1();
const player4 = new CompetitivePlayer("test2");
console.log(player4.checkLogin());
const somePlayer = new CompetitivePlayer("Test3");
somePlayer.isPro() ? console.log(somePlayer) : console.log(somePlayer);
// new Player("tes");
// const player = new Player();
// player.password = "1235";
// console.log(player.password);
// player.login = "new_login";
// const competivePlayer = new CompetitivePlayer();
class Userr3 {
    constructor(email, name) {
        this.email = email;
        this.name = name;
    }
}
class Userr4 {
    constructor(email, name) {
        this.email = email;
        this.name = name;
    }
}
class AbstractVehicle {
    stopEngine(time) {
        return "Engine stopped!";
    }
}
class Vehicle3 extends AbstractVehicle {
    constructor() {
        super(...arguments);
        this.startEngine = (time) => {
            return `Started`;
        };
    }
}
