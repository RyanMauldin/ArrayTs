namespace ts {
    /**
   * **`IArray<T>`** is a [TypeScript](http://www.typescriptlang.org/) *interface* in the [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs)
   * *namespace*, which ***enhances*** the [`JavaScript`](https://www.javascript.com/) [`array`](https://www.w3schools.com/js/js_arrays.asp)
   * *type* by ***exposing*** *extension methods*, ***similar*** to the [`IEnumerable<T>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8)
   * *interface* in [`Microsoft's`](https://www.microsoft.com/en-us/) [`.NET Core`](https://docs.microsoft.com/en-us/dotnet/core/)
   * *framework*. The ***generic*** [`Array<T>`](https://www.typescriptlang.org/docs/handbook/generics.html) *interface* is
   * being ***extended*** for the [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) *implementation* of the
   * [`IEnumerable<T>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8)
   * *interface* features, ***exposed*** to the [`JavaScript`](https://www.javascript.com/) [`array`](https://www.w3schools.com/js/js_arrays.asp)
   * *type*. ***See usage:***
   *
   * ```typescript
   * /// The following code is subject to change
   * /// <reference path="./ArrayTs/ArrayTs.ts"
   * const numbers: Array<number> = [ 1, 2, 3, 4 ];
   * let clonedNumbers: Array<number>;
   * if (!ArrayTs.IsNullOrEmpty(numbers)) clonedNumbers = (<ArrayTs.ArrayTs<number>>numbers).Clone();
   * for (const number of numbers) { console.log(number); }
   * ```
   **/
  export interface IEnumerableArray<T> extends Array<T> {
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
    ElementAt(index?: number): T;
    ElementAtOrDefault(index?: number): T | undefined;
    Except(source?: any): IArray<T>;
    //forEach(callbackfn: (value: T, index: number, array: IArray<T>) => void, thisArg?: any): void;
    First(predicate?: any): T;
    FirstOrDefault(predicate?: any): T | undefined;
    Get(): IArray<T>;
    GetGenericType(): string;
    GroupBy<TResult>(predicate?: any, keyName?: any, valueName?: any): IArray<TResult>
    GroupJoin<TResult>(source?: any, outerKey?: any, innerKey?: any, zipFunction?: any): IArray<TResult>;
    InnerJoin<TResult>(source?: any, outerKey?: any, innerKey?: any, zipFunction?: any): IArray<TResult>;
    Intersect<TResult>(source?: any): IArray<TResult>;
    IsArray<T>(): this is Array<T>;
    IsIArray<T>(): this is IArray<T>;
    Last(predicate?: any): T;
    LastOrDefault(predicate?: any): T | undefined;
    //Length(): number;
    Max(predicate?: any): number;
    Min(predicate?: any): number;
    OrderBy(predicate?: any): IArray<T>;
    OrderByDescending(predicate?: any): IArray<T>;
    Push(value?: any): number;
    Reverse(): IArray<T>
    Select<TResult>(predicate?: any): IArray<TResult>;
    SelectMany<TResult>(predicate?: any): IArray<TResult>;
    SequenceEqual(source?: any): boolean;
    Set(source?: any): void;
    Single(): T;
    SingleOrDefault(): T | undefined;
    Skip(index?: number): IArray<T>;
    SkipWhile(predicate?: any): IArray<T>;
    Slice(start?: number, end?: number): IArray<T>;
    Sort(predicate?: any): IArray<T>;
    Splice(start: number, deleteCount?: number): IArray<T>;
    Sum(): number;
    Take(count?: number): IArray<T>;
    TakeWhile(predicate?: any): IArray<T>
    ToArray(): Array<T>;
    Union<TResult>(source?: any): IArray<TResult>;
    Where(predicate?: any): IArray<T>;
    Zip<TResult>(source?: any, predicate?: any): IArray<TResult>
  }
}