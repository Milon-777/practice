class Box {
    width: number;
    height: number = 500;
    volume: number | undefined;
    _content: string | undefined;

    constructor(width: number, volume?: number, content?: string) {
        this.width = width;
        this.volume = volume;
        this._content = content;
    }

    calculateVolume(): void {
        if (!this.volume) {
            this.volume = this.width * this.height;
            console.log(`Об'єм посилки: ${this.volume}`);
        } else {
            console.log(`Об'єм посилки: ${this.volume}`);
        }
    }

    checkBoxSize(transport: number): string;
    checkBoxSize(transport: Array<number>): string;
    checkBoxSize(transport: number | Array<number>): string {
        if (typeof transport === "number") {
            return transport >= this.width ? "Ok" : "Not ok";
        } else {
            return transport.some((t) => t >= this.width) ? "Ok" : "Not ok";
        }
    }

    // get content() {
    //     return this._content;
    // }

    // set content(value) {
    //     this._content = `Date: ${new Date().toTimeString()}, Content: ${value}`;
    // }

    async content(value: string) {
        const date = await new Date().toTimeString();
        this._content = `Date: ${date}, Content: ${value}`;
        console.log(this._content);
        // return this._content;
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
    [s: string]: string | ((s: string) => boolean);

    // method(style:string) {
    // return true;
    // }
}
const style = new Styles();
style.color = "black";
style.font = "Roboto";

class PresentBox extends Box {
    wrap: string;
    height: number = 600;

    constructor(wrap: string, width: number) {
        super(width);
        this.wrap = wrap;
    }

    override async content(value: string, text?: string) {
        const date = await new Date().toTimeString();

        if (!text) {
            super.content(value);
        } else {
            this._content = `Date: ${date}, Content: ${value}, Text: ${
                text ?? "No text"
            }`;
        }

        console.log(this._content);
        // return this._content;
    }
}

console.log(new PresentBox("wrapper", 200).content("TV", "Gift"));

interface IUser2 {
    login: string;
    password: string;
    token?: number;
}

interface IValidation2 {
    valid: boolean;
    isValid: (data: string) => boolean;
}

class CUserForm implements IUser2, IValidation2 {
    login: string;
    password: string;
    valid: boolean = false;
    token: number;
    isValid(login: string) {
        return login.length > 3;
    }
}

function setName() {
    return "COD";
}

class Player {
    private static game: string;

    #login: string;
    private _password: string;
    public server: string;
    protected consent: boolean;

    constructor(login: string) {
        this.#login = login;
    }

    static {
        Player.game = setName();
    }

    get password() {
        return this._password;
    }

    set password(newPassword: string) {
        //Validation ...
        this._password = newPassword;
    }

    static getGameName() {
        return Player.game;
    }

    logIn = () => {
        return `Player ${this.#login} is online!`;
    };

    connect() {
        //Doing smth...
        return this;
    }

    isPro(): this is CompetitivePlayer {
        return this instanceof CompetitivePlayer;
    }
}

console.log(Player.getGameName);

class CompetitivePlayer extends Player {
    private isConsented() {
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

const somePlayer: Player | CompetitivePlayer = new CompetitivePlayer("Test3");
somePlayer.isPro() ? console.log(somePlayer) : console.log(somePlayer);

// new Player("tes");
// const player = new Player();
// player.password = "1235";
// console.log(player.password);
// player.login = "new_login";

// const competivePlayer = new CompetitivePlayer();

class Userr3 {
    public email: string;
    public name: string;

    constructor(email: string, name: string) {
        this.email = email;
        this.name = name;
    }
}

class Userr4 {
    constructor(public email: string, public name: string) {}
}

interface IEngine {
    model: string;
    capacity: number;
    startEngine: (time: Date) => string;
}

abstract class AbstractVehicle {
    model: string;
    capacity: number;
    abstract startEngine: (time: Date) => string;
    stopEngine(time: Date): string {
        return "Engine stopped!";
    }
}

class Vehicle3 extends AbstractVehicle {
    startEngine = (time: Date) => {
        return `Started`;
    };
}
