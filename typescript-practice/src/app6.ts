// import "reflect-metadata";

// interface IUserService2 {
//     getUsersInDatabase(): number;
// }

// const POSITIVE_METADATA_KEY = Symbol("POSITIVE_METADATA_KEY");

// // @nullUser
// // @threeUserAdvanced
// // @setUsers(2)
// // @log()
// // @setUserAdvanced(4)
// // @timeUserAdvanced
// class UserService2 implements IUserService2 {
//     private _users: number;

//     // @Log2()
//     // set users(num: number) {
//     //     this._users = num;
//     // }

//     // get users() {
//     //     return this._users;
//     // }

//     // @Log
//     // @catchError({ rethrow: true })
//     getUsersInDatabase(): number {
//         return this._users;
//     }

//     setUsersInDatabase(@Positive() num: number): void {
//         this._users = num;
//     }
// }

// function Positive() {
//     return (
//         target: Object,
//         propertyKey: string | symbol,
//         parameterIndex: number
//     ) => {
//         console.log(Reflect.getOwnMetadata("design:type", target, propertyKey));
//         console.log(
//             Reflect.getOwnMetadata("design:paramtypes", target, propertyKey)
//         );
//         console.log(
//             Reflect.getOwnMetadata("design:returntype", target, propertyKey)
//         );
//         let existParams: number[] =
//             Reflect.getOwnMetadata(
//                 POSITIVE_METADATA_KEY,
//                 target,
//                 propertyKey
//             ) || [];
//         existParams.push(parameterIndex);
//         Reflect.defineMetadata(
//             POSITIVE_METADATA_KEY,
//             existParams,
//             target,
//             propertyKey
//         );
//     };
// }

// function nullUser(target: Function) {
//     target.prototype.users = 0;
// }

// function setUsers(users: number) {
//     console.log("setUsers init");
//     return (target: Function) => {
//         console.log("setUsrs run");
//         target.prototype.users = users;
//     };
// }

// function log() {
//     console.log("log init");
//     return (target: Function) => {
//         console.log("log run");
//         console.log(target);
//     };
// }

// function threeUserAdvanced<T extends { new (...args: any[]): {} }>(
//     constructor: T
// ) {
//     return class extends constructor {
//         users = 3;
//     };
// }

// function timeUserAdvanced<T extends { new (...args: any[]): {} }>(
//     constructor: T
// ) {
//     return class extends constructor {
//         createdAt = new Date();
//     };
// }

// function setUserAdvanced(users: number) {
//     return <T extends { new (...args: any[]): {} }>(constructor: T) => {
//         return class extends constructor {
//             users = users;
//         };
//     };
// }

// // function logUsers(obj: IUserService2) {
// //     console.log("Users: ", obj.users);
// //     return obj;
// // }
// type CreatedAt = {
//     createdAt: Date;
// };

// function Log(
//     target: Object,
//     propertyKey: string | symbol,
//     descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
// ): TypedPropertyDescriptor<(...args: any[]) => any> | void {
//     console.log(target);
//     console.log(propertyKey);
//     console.log(descriptor);
//     descriptor.value = () => {
//         console.log("no Error");
//     };
// }

// function catchError({ rethrow }: { rethrow: boolean } = { rethrow: false }) {
//     return (
//         target: Object,
//         propertyKey: string | symbol,
//         descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
//     ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
//         const method = descriptor.value;
//         descriptor.value = async (...args: any[]) => {
//             {
//                 try {
//                     const res = await method?.apply(target, args);
//                     return res;
//                 } catch (e) {
//                     if (e instanceof Error) {
//                         console.log(e.message);
//                         if (rethrow) {
//                             throw e;
//                         }
//                     }
//                 }
//             }
//         };
//     };
// }

// function Max(max: number) {
//     return (
//         target: Object,
//         propertyKey: string | symbol,
//         descriptor: PropertyDescriptor
//     ) => {
//         let value: number;
//         const setter = function (newValue: number) {
//             if (newValue > max) {
//                 console.log(`Не можна встановити значення більше ${max}`);
//             } else {
//                 value = newValue;
//             }
//         };

//         const getter = function () {
//             return value;
//         };

//         Object.defineProperty(target, propertyKey, {
//             set: setter,
//             get: getter,
//         });
//     };
// }

// function Log2() {
//     return (
//         target: Object,
//         propertyKey: string | symbol,
//         descriptor: PropertyDescriptor
//     ) => {
//         const set = descriptor.set;
//         descriptor.set = (...args: any) => {
//             console.log(args);
//             set?.apply(target, args);
//         };
//     };
// }
// // console.log(new UserService2().getUsersInDatabase());
// console.log(new UserService2());
// // console.log((new UserService2() as IUserService & CreatedAt).createdAt);
// // console.log(nullUser(new UserService2()).getUsersInDatabase());
// // console.log(logUsers(nullUser(new UserService2())).getUsersInDatabase());

// function Uni(name: string): any {
//     console.log(`Ініціалізація ${name}`);
//     return function () {
//         console.log(`Визов ${name}`);
//     };
// }

// // @Uni("Клас")
// // class MyClass {
// //     @Uni("Властивість")
// //     props?: any;

// //     @Uni("Статична Властивість")
// //     static prop2?: any;

// //     @Uni("Метод")
// //     method(@Uni("Параметр метода") _: any) {}

// //     @Uni("Статистичний метод")
// //     metho2d(@Uni("Параметр статичного метода") _: any) {}

// //     constructor(@Uni("Параметр конструктора") _: any) {}
// // }
