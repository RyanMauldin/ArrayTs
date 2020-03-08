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
  export interface IEnumerableArray<T> extends IArrayConstructor {
    /**
     * From Array<T> Interface definition: lib.es2015.symbol.wellknown.d.ts: Returns an object whose properties 
     * ave the value 'true' when they will be absent when used in a 'with' statement.
     */
    [Symbol.unscopables](): {
      copyWithin: boolean;
      entries: boolean;
      fill: boolean;
      find: boolean;
      findIndex: boolean;
      keys: boolean;
      values: boolean;
    };

    /**
     * From Array<T> Interface definition: lib.es2015.iterable.d.ts:
     */

    /** Iterator */
    [Symbol.iterator](): IterableIterator<T>;

    /**
     * Returns an iterable of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, T]>;

    /**
     * Returns an iterable of keys in the array
     */
    keys(): IterableIterator<number>;

    /**
     * Returns an iterable of values in the array
     */
    values(): IterableIterator<T>;

    // /**
    //  * From Array<T> Interface definition: lib.es2015.core.d.ts:
    //  * Returns the value of the first element in the array where predicate is true, and undefined
    //  * otherwise.
    //  * @param predicate find calls predicate once for each element of the array, in ascending
    //  * order, until it finds one where predicate returns true. If such an element is found, find
    //  * immediately returns that element value. Otherwise, find returns undefined.
    //  * @param thisArg If provided, it will be used as the this value for each invocation of
    //  * predicate. If it is not provided, undefined is used instead.
    //  */
    // find<S extends T>(predicate: (this: void, value: T, index: number, obj: Array<T>) => value is S, thisArg?: any): S | undefined;
    // find(predicate: (value: T, index: number, obj: Array<T>) => unknown, thisArg?: any): T | undefined;

    // /**
    //  * Returns the index of the first element in the array where predicate is true, and -1
    //  * otherwise.
    //  * @param predicate find calls predicate once for each element of the array, in ascending
    //  * order, until it finds one where predicate returns true. If such an element is found,
    //  * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
    //  * @param thisArg If provided, it will be used as the this value for each invocation of
    //  * predicate. If it is not provided, undefined is used instead.
    //  */
    // findIndex(predicate: (value: T, index: number, obj: Array<T>) => unknown, thisArg?: any): number;

    // /**
    //  * Returns the this object after filling the section identified by start and end with value
    //  * @param value value to fill array section with
    //  * @param start index to start filling the array at. If start is negative, it is treated as
    //  * length+start where length is the length of the array.
    //  * @param end index to stop filling the array at. If end is negative, it is treated as
    //  * length+end.
    //  */
    // fill(value: T, start?: number, end?: number): this;

    // /**
    //  * Returns the this object after copying a section of the array identified by start and end
    //  * to the same array starting at position target
    //  * @param target If target is negative, it is treated as length+target where length is the
    //  * length of the array.
    //  * @param start If start is negative, it is treated as length+start. If end is negative, it
    //  * is treated as length+end.
    //  * @param end If not specified, length of the this object is used as its default value.
    //  */
    // copyWithin(target: number, start: number, end?: number): this;

    



    // /**
    //  * From Array<T> Interface definition: lib.es5.d.ts:
    //  * Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.
    //  */
    // length: number;
    // /**
    //  * Returns a string representation of an array.
    //  */
    // toString(): string;
    // /**
    //  * Returns a string representation of an array. The elements are converted to string using their toLocalString methods.
    //  */
    // toLocaleString(): string;
    // /**
    //  * Removes the last element from an array and returns it.
    //  */
    // pop(): T | undefined;
    // /**
    //  * Appends new elements to an array, and returns the new length of the array.
    //  * @param items New elements of the Array.
    //  */
    // push(...items: Array<T>): number;
    // /**
    //  * Appends new elements to an array, and returns the new length of the array.
    //  * @param items New elements of the Array.
    //  */
    // push(...items: IArray<T>): number;
    // /**
    //  * Combines two or more arrays.
    //  * @param items Additional items to add to the end of array1.
    //  */
    // concat(...items: Array<ConcatArray<T>>): IArray<T>;
    // /**
    //  * Combines two or more arrays.
    //  * @param items Additional items to add to the end of array1.
    //  */
    // concat(...items: Array<(T | ConcatArray<T>)>): IArray<T>;
    // /**
    //  * Adds all the elements of an array separated by the specified separator string.
    //  * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
    //  */
    // join(separator?: string): string;
    // /**
    //  * Reverses the elements in an Array.
    //  */
    // reverse(): IArray<T>;
    // /**
    //  * Removes the first element from an array and returns it.
    //  */
    // shift(): T | undefined;
    // /**
    //  * Returns a section of an array.
    //  * @param start The beginning of the specified portion of the array.
    //  * @param end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
    //  */
    // slice(start?: number, end?: number): IArray<T>;
    // /**
    //  * Sorts an array.
    //  * @param compareFn Function used to determine the order of the elements. It is expected to return
    //  * a negative value if first argument is less than second argument, zero if they're equal and a positive
    //  * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
    //  * ```ts
    //  * [11,2,22,1].sort((a, b) => a - b)
    //  * ```
    //  */
    // sort(compareFn?: (a: T, b: T) => number): this;
    // /**
    //  * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
    //  * @param start The zero-based location in the array from which to start removing elements.
    //  * @param deleteCount The number of elements to remove.
    //  */
    // splice(start: number, deleteCount?: number): IArray<T>;
    // /**
    //  * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
    //  * @param start The zero-based location in the array from which to start removing elements.
    //  * @param deleteCount The number of elements to remove.
    //  * @param items Elements to insert into the array in place of the deleted elements.
    //  */
    // splice(start: number, deleteCount: number, ...items: Array<T>): IArray<T>;
    // /**
    //  * Inserts new elements at the start of an array.
    //  * @param items  Elements to insert at the start of the Array.
    //  */
    // unshift(...items: Array<T>): number;
    // /**
    //  * Returns the index of the first occurrence of a value in an array.
    //  * @param searchElement The value to locate in the array.
    //  * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
    //  */
    // indexOf(searchElement: T, fromIndex?: number): number;
    // /**
    //  * Returns the index of the last occurrence of a specified value in an array.
    //  * @param searchElement The value to locate in the array.
    //  * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
    //  */
    // lastIndexOf(searchElement: T, fromIndex?: number): number;
    // /**
    //  * Determines whether all the members of an array satisfy the specified test.
    //  * @param callbackfn A function that accepts up to three arguments. The every method calls
    //  * the callbackfn function for each element in the array until the callbackfn returns a value
    //  * which is coercible to the Boolean value false, or until the end of the array.
    //  * @param thisArg An object to which the this keyword can refer in the callbackfn function.
    //  * If thisArg is omitted, undefined is used as the this value.
    //  */
    // every(callbackfn: (value: T, index: number, array: Array<T>) => unknown, thisArg?: any): boolean;
    // /**
    //  * Determines whether the specified callback function returns true for any element of an array.
    //  * @param callbackfn A function that accepts up to three arguments. The some method calls
    //  * the callbackfn function for each element in the array until the callbackfn returns a value
    //  * which is coercible to the Boolean value true, or until the end of the array.
    //  * @param thisArg An object to which the this keyword can refer in the callbackfn function.
    //  * If thisArg is omitted, undefined is used as the this value.
    //  */
    // some(callbackfn: (value: T, index: number, array: Array<T>) => unknown, thisArg?: any): boolean;
    // /**
    //  * Performs the specified action for each element in an array.
    //  * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
    //  * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
    //  */
    // forEach(callbackfn: (value: T, index: number, array: Array<T>) => void, thisArg?: any): void;
    // /**
    //  * Calls a defined callback function on each element of an array, and returns an array that contains the results.
    //  * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
    //  * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
    //  */
    // map<U>(callbackfn: (value: T, index: number, array: Array<T>) => U, thisArg?: any): IArray<U>;
    // /**
    //  * Returns the elements of an array that meet the condition specified in a callback function.
    //  * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
    //  * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
    //  */
    // filter<S extends T>(callbackfn: (value: T, index: number, array: Array<T>) => value is S, thisArg?: any): IArray<S>;
    // /**
    //  * Returns the elements of an array that meet the condition specified in a callback function.
    //  * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
    //  * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
    //  */
    // filter(callbackfn: (value: T, index: number, array: Array<T>) => unknown, thisArg?: any): IArray<T>;
    // /**
    //  * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
    //  * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
    //  * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
    //  */
    // reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: Array<T>) => T): T;
    // reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: Array<T>) => T, initialValue: T): T;
    // /**
    //  * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
    //  * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
    //  * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
    //  */
    // reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: Array<T>) => U, initialValue: U): U;
    // /**
    //  * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
    //  * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
    //  * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
    //  */
    // reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: Array<T>) => T): T;
    // reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: Array<T>) => T, initialValue: T): T;
    // /**
    //  * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
    //  * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
    //  * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
    //  */
    // reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: Array<T>) => U, initialValue: U): U;

    [index: number]: T;

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
    ElementAtOrDefault(index?: number): T | null;
    Empty(): boolean;
    Except(source?: any): IArray<T>;
    First(predicate?: any): T;
    FirstOrDefault(predicate?: any): T | null;
    Get(): IArray<T>;
    GetGenericType(): string;
    GroupBy<TResult>(predicate?: any, keyName?: any, valueName?: any): IArray<TResult>
    GroupJoin<TResult>(source?: any, outerKey?: any, innerKey?: any, zipFunction?: any): IArray<TResult>;
    InnerJoin<TResult>(source?: any, outerKey?: any, innerKey?: any, zipFunction?: any): IArray<TResult>;
    Intersect<TResult>(source?: any): IArray<TResult>;
    IsArray(args: any): args is IArray<any>;
    Last(predicate?: any): T;
    LastOrDefault(predicate?: any): T | null;
    Length(): number;
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
    SingleOrDefault(): T | null;
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