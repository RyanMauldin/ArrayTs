namespace ts {
    /**
     * **`IJsArrayEs5Iterable<T>`** is a *generic interface* that ***exposes*** [**`ES2015`**](http://www.ecma-international.org/ecma-262/6.0/)
     * *compatible* ***member definitions*** of the [**`JavaScript`**](https://www.javascript.com/) [**`array`**](https://www.w3schools.com/js/js_arrays.asp)
     * *type*, which are ***also defined*** by the *generic interface* **`Array<T>`** from [**`TypeScript`**](http://www.typescriptlang.org/)
     * *source library* [**`lib.es2015.iterable.d.ts`**](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es2015.iterable.d.ts).
     **/
    export interface IJsArrayEs2015Iterable<T> {
        /** Iterator **/
        [Symbol.iterator](): IterableIterator<T>;

        /**
         * Returns an iterable of key, value pairs for every entry in the array.
         **/
        entries(): IterableIterator<[number, T]>;

        /**
         * Returns an iterable of keys in the array.
         **/
        keys(): IterableIterator<number>;

        /**
         * Returns an iterable of values in the array.
         **/
        values(): IterableIterator<T>;
    }
}