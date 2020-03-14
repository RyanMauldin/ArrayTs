namespace ts {
    /**
     * **`IJsArrayEs5Core<T>`** is a *generic interface* that ***exposes*** [**`ES2015`**](http://www.ecma-international.org/ecma-262/6.0/)
     * *compatible* ***member definitions*** of the [**`JavaScript`**](https://www.javascript.com/) [**`array`**](https://www.w3schools.com/js/js_arrays.asp)
     * *type*, which are ***also defined*** by the *generic interface* **`Array<T>`** from [**`TypeScript`**](http://www.typescriptlang.org/)
     * *source library* [**`lib.es2015.core.d.ts`**](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es2015.core.d.ts).
     **/
    export interface IJsArrayEs2015Core<T> {
        /**
         * Returns the value of the first element in the array where predicate is true, and undefined otherwise.
         * @param predicate find calls predicate once for each element of the array, in ascending order, until it finds
         * one where predicate returns true. If such an element is found, find immediately returns that element value.
         * Otherwise, find returns undefined.
         * @param thisArg If provided, it will be used as the this value for each invocation of predicate. If it is not
         * provided, undefined is used instead.
         **/
        find<S extends T>(predicate: (this: void, value: T, index: number, obj: Array<T>) => value is S, thisArg?: any): S | undefined;
        find(predicate: (value: T, index: number, obj: Array<T>) => unknown, thisArg?: any): T | undefined;

        /**
         * Returns the index of the first element in the array where predicate is true, and -1 otherwise.
         * @param predicate find calls predicate once for each element of the array, in ascending order, until it finds
         * one where predicate returns true. If such an element is found, findIndex immediately returns that element
         * index. Otherwise, findIndex returns -1.
         * @param thisArg If provided, it will be used as the this value for each invocation of predicate. If it is not
         * provided, undefined is used instead.
         **/
        findIndex(predicate: (value: T, index: number, obj: Array<T>) => unknown, thisArg?: any): number;

        /**
         * Returns the this object after filling the section identified by start and end with value.
         * @param value value to fill array section with.
         * @param start index to start filling the array at. If start is negative, it is treated as length+start where
         * length is the length of the array.
         * @param end index to stop filling the array at. If end is negative, it is treated as length+end.
         **/
        fill(value: T, start?: number, end?: number): this;

        /**
         * Returns the this object after copying a section of the array identified by start and end to the same array
         * starting at position target.
         * @param target If target is negative, it is treated as length+target where length is the length of the array.
         * @param start If start is negative, it is treated as length+start. If end is negative, it is treated as length+end.
         * @param end If not specified, length of the this object is used as its default value.
         **/
        copyWithin(target: number, start: number, end?: number): this;
    }
}