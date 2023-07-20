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
const p1 = {};
class User9 {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
function getData(id, name) {
    return new User9(id, name);
}
function getMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        return [{ name: "Analytics", url: "analytics" }];
    });
}
function getArray(x) {
    return __awaiter(this, void 0, void 0, function* () {
        return [yield x];
    });
}
