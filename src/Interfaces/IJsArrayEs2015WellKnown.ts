namespace ts {
    /**
     * **`IJsArrayEs5Iterable<T>`** is a *generic interface* that ***exposes*** [**`ES2015`**](http://www.ecma-international.org/ecma-262/6.0/)
     * *compatible* ***member definitions*** of the [**`JavaScript`**](https://www.javascript.com/) [**`array`**](https://www.w3schools.com/js/js_arrays.asp)
     * *type*, which are ***also defined*** by the *generic interface* **`Array<T>`** from [**`TypeScript`**](http://www.typescriptlang.org/)
     * *source library* [**`lib.es2015.symbol.wellknown.d.ts`**](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es2015.symbol.wellknown.d.ts).
     **/
    export interface IJsArrayEs2015WellKnown<T> {
        /**
         * From Array<T> Interface definition: lib.es2015.symbol.wellknown.d.ts: Returns an object whose properties 
         * have the value 'true' when they will be absent when used in a 'with' statement.
         **/
        [Symbol.unscopables](): {
            copyWithin: boolean;
            entries: boolean;
            fill: boolean;
            find: boolean;
            findIndex: boolean;
            keys: boolean;
            values: boolean;
        };
    }
}