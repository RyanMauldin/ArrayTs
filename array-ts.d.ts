/**
 * Created by by Ryan Mauldin on 3/25/2020.
 */

/**
 * [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) is a [**`TypeScript`**](http://www.typescriptlang.org/) *library*
 * which ***enhances*** the [**`JavaScript`**](https://www.javascript.com/) [**`array`**](https://www.w3schools.com/js/js_arrays.asp)
 * *type* by ***exposing*** *extension methods*, ***similar*** to the [**`IEnumerable<T>`**](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8)
 * *interface* in [**`Microsoft's`**](https://www.microsoft.com/en-us/) [**`.NET Core`**](https://docs.microsoft.com/en-us/dotnet/core/)
 * *framework*. The ***generic*** [**`Array<T>`**](https://www.typescriptlang.org/docs/handbook/generics.html) *interface* is
 * being ***extended*** for the [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) *implementation* of the
 * [**`IEnumerable<T>`**](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8)
 * *interface* features, ***exposed*** to the [**`JavaScript`**](https://www.javascript.com/) [**`array`**](https://www.w3schools.com/js/js_arrays.asp)
 * *type*.
 *
 * [**`TypeScript`**](http://www.typescriptlang.org/) **code:**
 * ```typescript
 * var IArray = require("array-ts");
 * const numbers: Array<number> = [ 1, 2, 3, 4 ];
 * let clonedNumbers: IArray<number> = new IArray<number>();
 * if (!IArray.IsNullOrEmpty(numbers))
 *     clonedNumbers = (<IArray<number>>numbers).Clone();
 * console.log("Cloned numbers greater than 2:");
 * for (const number of clonedNumbers.Where(p => p > 2))
 *     console.log(number);
 * ```
 **/
declare interface IArray<T> extends Array<T> {
    [Symbol.species]: IArray<T>;
    [x: string]: T & any;
    isArray(arg: any): arg is IArray<any>;      
    from(iterable: any, mapfn?: any, thisArg?: any): any[];
    of<T>(...items: T[]): T[]; 
    IsArrayInstance<T>(): this is Array<T>;
    IsIArrayInstance<T>(): this is IArray<T>;
    Aggregate(predicate?: any, seed?: T): T;
    All(predicate?: any): boolean;
    Any(predicate?: any): boolean;
    Average(): number; 
    Cast<TResult>(): IArray<TResult>;
    Clear(): void;
    Clone(): IArray<T>;
    Concat<TResult>(source?: any): IArray<TResult>;
    Contains(value?: any): boolean;
    Count(predicate?: any): number;
    Distinct(): IArray<T>;
    ElementAt(index: any): T;
    ElementAtOrDefault(index: any): T | undefined;
    Except(target: any): IArray<T>;
    First(predicate?: Function): T;
    FirstOrDefault(predicate?: Function): T | undefined;
    Get(): IArray<T>;
    GetGenericType(): string;
    GroupBy<TResult>(predicate?: any, keyName?: any, valueName?: any): IArray<TResult>;
    GroupJoin<TResult>(source: any, outerKey: any, innerKey: any, zipFunction: Function): IArray<TResult>;
    InnerJoin<TResult>(source: any, outerKey: any, innerKey: any, zipFunction: any): IArray<TResult>;
    Intersect<TResult>(source?: any): IArray<TResult>;
    Last(predicate?: any): T;
    LastOrDefault(predicate?: any): T | undefined;
    Max(predicate?: any): number;
    Min(predicate?: any): number;
    OrderBy(predicate?: any): IArray<T>;
    OrderByDescending(predicate?: any): IArray<T>;
    Push(source?: any): number;
    Reverse(): IArray<T>;
    Select<TResult>(predicate?: any): IArray<TResult>;
    SelectMany<TResult>(predicate?: any): IArray<TResult>;
    SequenceEqual(source?: any): boolean;
    Set(source?: any): number;
    Single(): T;
    SingleOrDefault(): T | undefined;
    Skip(index: any): IArray<T>;
    SkipWhile(predicate?: any): IArray<T>;
    Slice(start?: number, end?: number): IArray<T>;
    Sort(predicate?: Function): IArray<T>;
    Splice(start: number, end: number, ...items: any): IArray<T>;
    Sum(): number;
    Take(count?: any): IArray<T>;
    TakeWhile(predicate?: any): IArray<T>;
    ToArray(): Array<T>;
    Union<TResult>(source: any): IArray<TResult>;
    Where(predicate?: any): IArray<T>;
    Zip<TResult>(source?: any, predicate?: any): IArray<TResult>;
}