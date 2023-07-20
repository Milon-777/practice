type Config = { protocol: "http" | "https"; port: 3000 | 3001 };
type Role = {
    role: string;
};
type ConfigWithRole = Config & Role;

interface IConfig2 {
    protocol: "http" | "https";
    port: 3000 | 3001;
    log: (msg: string) => void;
}
interface IRole {
    role: string;
}

interface IConfigWithRole extends IConfig2, IRole {}

const serverConfig: Config & Role = {
    protocol: "https",
    port: 3000,
    role: "admin",
};

const serverConfig2: IConfigWithRole = {
    protocol: "https",
    port: 3000,
    role: "admin",
    log: (msg: string): void => {
        console.log(msg);
    },
};

type StartFunction = (
    protocol: "http" | "https",
    port: 3000 | 3001,
    log: (msg: string) => void
) => string;

const startServer: StartFunction = (protocol, port, log): "Server started" => {
    log(`Server started on ${protocol}://server:${port}`);
    return "Server started";
};

startServer(serverConfig2.protocol, serverConfig2.port, serverConfig2.log);

interface IStyles {
    [key: string]: string;
}

const styles: IStyles = {
    position: "absolute",
    top: "20px",
    left: "50px",
};

interface IBasicConfig {
    protocol: string;
    port: number;
}

const startServer2 = (config: IBasicConfig): "Server started" => {
    console.log(`Server started on ${config.protocol}://server:${config.port}`);
    return "Server started";
};

startServer2(serverConfig2);

const PI = 3.14;
let PIClone: typeof PI;

const department: Department = {
    name: "web-dev",
    budget: 50000,
};

interface Department {
    name: string;
    budget: number;
}

interface Project {
    name: string;
    projectBudget: number;
}

function transformDepartment(department: Department, amount: number): Project {
    return {
        name: department.name,
        projectBudget: amount,
    };
}

const mainProject: Project = transformDepartment(department, 4000);

function printMsg(msg: string[] | number | boolean): void {
    if (Array.isArray(msg)) {
        msg.forEach((m) => console.log(m));
    } else if (isNumber(msg)) {
        console.log(msg);
    } else {
        console.log(msg);
    }
    console.log(msg);
}

printMsg(4);

function isNumber(n: unknown): n is number {
    return typeof n === "number";
}

interface Car {
    name: "car";
    engine: string;
    wheels: {
        number: number;
        type: string;
    };
}

interface Ship {
    name: "ship";
    engine: string;
    sail: string;
}

function repairVehicle(vehicle: Car | Ship) {
    // if (isCar(vehicle)) {
    //     vehicle.wheels;
    // } else if (isShip(vehicle)) {
    //     vehicle.sail;
    // } else {
    //     vehicle;
    // }
    switch (vehicle.name) {
        case "car":
            console.log(vehicle.wheels);
            break;
        case "ship":
            console.log(vehicle.sail);
            break;
        default:
            console.log("error");
            break;
    }
}

function isCar(car: Car | Ship): car is Car {
    return (car as Car).wheels !== undefined;
}

function isShip(ship: Car | Ship): ship is Ship {
    return (ship as Ship).sail !== undefined;
}

interface Square {
    side: number;
    area: number;
}
interface Rect {
    a: number;
    b: number;
    area: number;
}

function calculateArea(a: number): Square;
function calculateArea(a: number, b: number): Rect;
function calculateArea(a: number, b?: number): Square | Rect {
    if (b) {
        const rect: Rect = {
            a,
            b,
            area: a * b,
        };
        return rect;
    } else {
        const square: Square = {
            side: a,
            area: a * a,
        };
        return square;
    }
}
