/**
 * Created by Jack on 6/29/2014.
 * Updated by Ryan Mauldin on 2/26/2020
 */

/**
 * **`Array<T>`** is a [TypeScript](http://www.typescriptlang.org/) *interface* which
 * ***enhances*** the [`JavaScript`](https://www.javascript.com/) [`array`](https://www.w3schools.com/js/js_arrays.asp)
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
 * if (!ArrayTs.IsNullOrEmpty(numbers)) clonedNumbers = (<ArrayTs.Get<number>>numbers).Clone();
 * for (const number of numbers) { console.log(number); }
 * ```
 * 
 * **Version Specifics:**
 * 
 * ***Current Version:*** [**`ArrayTs (2020)`**](https://github.com/RyanMauldin/ArrayTs)
 * ***, Author:*** [**`Ryan Mauldin`**](https://github.com/ryanmauldin)
 * 
 * **Refactor Notes:**
 * 
 * ***02/27/2020:*** [**`Ryan Mauldin`**](https://github.com/ryanmauldin)
 * ***, refactored*** the *original* [**`ArrayJs (2013)`**](https://github.com/EmptyCubes/Array.js)
 * *library* using a ***completely*** [TypeScript](http://www.typescriptlang.org/)
 * ***& non prototype-based*** *approach*.
 * 
 * **History:**
 * 
 * ***Original Version:*** [**`ArrayJs (2013)`**](https://github.com/EmptyCubes/Array.js)
 * ***, Authors:*** [**`Jack Godwin`**](https://github.com/KodingSykosis) ***&***
 * [**`Ryan Mauldin`**](https://github.com/ryanmauldin)
 **/
interface Array<T> {
  Aggregate(func: Function, seed?: T): T;
  All(predicate?: Function): boolean;
  Any(predicate?: Function): boolean;
  Average(): number;
  Contains(value: any): boolean;
  Count(predicate?: Function): number;
  Distinct(): Array<T>;
  ElementAt(index: number): any;
  ElementAtOrDefault(index: number): any;
  Except(array: Array<T>): Array<T>;
  First(predicate?: Function): any;
  FirstOrDefault(predicate?: Function): any;
  GroupBy(predicate: Function, keyName: string, valName: string): Array<T>;
  GroupJoin(inner: Array<T>, outerKey: Function, innerKey: Function, zipFn: Function): Array<T>;
  InnerJoin(inner: Array<T>, outerKey: Function, innerKey: Function, zipFn: Function): Array<T>;
  Intersect(array: Array<T>): Array<T>;
  Last(predicate?: Function): any;
  LastOrDefault(predicate: Function): any;
  Max(selector: Function): number;
  Min(selector: Function): number;
  OrderBy(selector: Function): Array<T>;
  OrderByDescending(selector: Function): Array<T>;
  Select(selector: Function): Array<any>;
  SelectMany(selector: Function): Array<any>;
  SequenceEqual(array: Array<T>): boolean;
  Single(): any;
  SingleOrDefault(): any;
  Skip(index: number): Array<T>;
  SkipWhile(predicate: Function): Array<T>;
  Sum(): number;
  Take(count: number): Array<T>;
  TakeWhile(predicate: Function): Array<T>;
  Union(array: Array<T>): Array<T>;
  Where(predicate: Function): Array<T>;
  Zip(second: Array<T>, zipFunction: Function): Array<T>;
}
