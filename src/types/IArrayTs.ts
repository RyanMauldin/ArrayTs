/// <reference path="./IJsArray.ts" />
/// <reference path="../Interfaces/IEnumerableArray.ts" />
/// <reference path="../Interfaces/IDictionary.ts" />
/// <reference path="../Interfaces/IArrayIndexer.ts" />

namespace ts {
    /**
     * [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) is a [`TypeScript`](http://www.typescriptlang.org/) *library*
     * which ***enhances*** the [`JavaScript`](https://www.javascript.com/) [`array`](https://www.w3schools.com/js/js_arrays.asp)
     * *type* by ***exposing*** *extension methods*, ***similar*** to the [`IEnumerable<T>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8)
     * *interface* in [`Microsoft's`](https://www.microsoft.com/en-us/) [`.NET Core`](https://docs.microsoft.com/en-us/dotnet/core/)
     * *framework*. The ***generic*** [`Array<T>`](https://www.typescriptlang.org/docs/handbook/generics.html) *interface* is
     * being ***extended*** for the [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) *implementation* of the
     * [`IEnumerable<T>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8)
     * *interface* features, ***exposed*** to the [`JavaScript`](https://www.javascript.com/) [`array`](https://www.w3schools.com/js/js_arrays.asp)
     * *type*. ***See usage:***
     * 
     * ***Note:*** the [**`IArrayTs<T>`**](https://github.com/RyanMauldin/ArrayTs) type is utilizing the [**`Intersection Types`**](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
     * method to *pull* together *needed facets* and is implemented by **`ts.IArray<T>`**.
     * 
     * ```typescript
     * const numbers: ts.IArray<number> = new ts.IArray<number>([ 1, 2, 3, 4 ]);
     * let clonedNumbersDesc: ts.IArray<number> = numbers.Clone().OrderByDescending();
     * for (const number of clonedNumbers) { console.log(number); }
     * ```
     **/
    export type IArrayTs<T> =
        IEnumerableArray<T> //IArrayConstructor<T>
      & IDictionary<T>
      & IJsArray<T>
      & IArrayIndexer;
}
