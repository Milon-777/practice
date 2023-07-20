"use strict";
const serverConfig = {
    protocol: "https",
    port: 3000,
    role: "admin",
};
const serverConfig2 = {
    protocol: "https",
    port: 3000,
    role: "admin",
    log: (msg) => {
        console.log(msg);
    },
};
const startServer = (protocol, port, log) => {
    log(`Server started on ${protocol}://server:${port}`);
    return "Server started";
};
startServer(serverConfig2.protocol, serverConfig2.port, serverConfig2.log);
const styles = {
    position: "absolute",
    top: "20px",
    left: "50px",
};
const startServer2 = (config) => {
    console.log(`Server started on ${config.protocol}://server:${config.port}`);
    return "Server started";
};
startServer2(serverConfig2);
const PI = 3.14;
let PIClone;
const department = {
    name: "web-dev",
    budget: 50000,
};
function transformDepartment(department, amount) {
    return {
        name: department.name,
        projectBudget: amount,
    };
}
const mainProject = transformDepartment(department, 4000);
function printMsg(msg) {
    if (Array.isArray(msg)) {
        msg.forEach((m) => console.log(m));
    }
    else if (isNumber(msg)) {
        console.log(msg);
    }
    else {
        console.log(msg);
    }
    console.log(msg);
}
printMsg(4);
function isNumber(n) {
    return typeof n === "number";
}
function repairVehicle(vehicle) {
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
function isCar(car) {
    return car.wheels !== undefined;
}
function isShip(ship) {
    return ship.sail !== undefined;
}
function calculateArea(a, b) {
    if (b) {
        const rect = {
            a,
            b,
            area: a * b,
        };
        return rect;
    }
    else {
        const square = {
            side: a,
            area: a * a,
        };
        return square;
    }
}
