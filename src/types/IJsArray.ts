
namespace ts {
    /**
     * **`IJsArray<T>`** is a *generic interface* that ***exposes*** [**`ES5`**](https://www.w3schools.com/js/js_es5.asp)
     * and [**`ES2015`**](http://www.ecma-international.org/ecma-262/6.0/) *compatible* ***member definitions*** of the
     * [**`JavaScript`**](https://www.javascript.com/) [**`array`**](https://www.w3schools.com/js/js_arrays.asp) *type*,
     * which are ***also defined*** by the *generic interface* **`Array<T>`** from [**`TypeScript`**](http://www.typescriptlang.org/)
     * *source libraries* [**`lib.es5.d.ts`**](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts),
     * [**`lib.es2015.core.d.ts`**](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es2015.core.d.ts),
     * [**`lib.es2015.iterable.d.ts`**](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es2015.iterable.d.ts),
     * and [**`lib.es2015.symbol.wellknown.d.ts`**](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es2015.symbol.wellknown.d.ts)
     **/
    export type IJsArray<T> =
        IJsArrayEs5<T>
        & IJsArrayEs2015Core<T>
        & IJsArrayEs2015Iterable<T>
        & IJsArrayEs2015WellKnown<T>;
        // TODO: https://github.com/microsoft/TypeScript/blob/master/lib/lib.es2016.array.include.d.ts
        // TODO: https://github.com/microsoft/TypeScript/blob/master/lib/lib.es2019.array.d.ts

}
