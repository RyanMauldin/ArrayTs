// export interface IArrayConstructor<T>  { 
//   [Symbol.species]: IArray<T>;
//   readonly prototype: IArray<T>;
//   // new <T>(arrayLength: number): Array<T>;
//   // new (arrayLength?: number | undefined): Array<any>;
//   // new <T>(items: IArray<T>): IArray<T> | Array<any>;
//   // new <T>(items: Array<T>): IArray<T> | Array<any>;
//   // new <T>(items: any): IArray<T> | Array<any>;
//   new <T>(source?: any): IArray<T>;
//   // <T>(arrayLength: number): Array<T>;
//   // (arrayLength?: number | undefined): Array<any>;
//   // <T>(items: IArray<T>): IArray<T> | Array<any>;
//   // <T>(items: Array<T>): IArray<T> | Array<any>;
//   // <T>(items: any): IArray<any> | Array<any>;
//   <T>(source?: any): IArray<T>;
//   // isArray(arg: any): arg is IArray<any> | Array<any>;
//   // IsArray<T>(): this is Array<T>;
//   // IsIArray<T>(): this is IArray<T>;
// }