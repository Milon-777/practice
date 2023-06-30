var revenue = 1000;
var bonus = 500;
var c = "sdt";
var d = true;
var res = revenue + bonus;
console.log(res);
function getFullName(user) {
    return "".concat(user.firstname, " ").concat(user.surname);
}
var user = {
    firstname: "Roman",
    surname: "Strizhak",
    country: "Ukraine",
    age: 21,
    skills: {
        js: true,
        html: true,
        css: true
    }
};
console.log(getFullName(user));
var info;
var skills = [1, "Developer"];
var arr = [1, "text", true, false, true];
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 1] = "SUCCESS";
    StatusCode[StatusCode["IN_PROCESS"] = 2] = "IN_PROCESS";
    StatusCode[StatusCode["FAILED"] = 3] = "FAILED";
})(StatusCode || (StatusCode = {}));
var obj1 = {
    message: "Payment successful",
    statusCode: StatusCode.SUCCESS
};
function action(status) {
    console.log(status);
}
action(obj1.statusCode);
action(2);
function compute() {
    return 3;
}
console.log(2 /* Roles.USER */);
var aaa = 15;
