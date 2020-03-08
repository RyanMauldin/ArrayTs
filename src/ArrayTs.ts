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
 * ```typescript
 * const numbers: ts.IArray<number> = ts.Convert<number>([ 1, 2, 3, 4 ]);
 * let clonedNumbers: ts.IArray<number> = numbers.Clone();
 * for (const number of clonedNumbers) { console.log(number); }
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
 *
 * [**`ArrayTs (2020)`**](https://github.com/RyanMauldin/ArrayTs) gained its *origins* from an earlier
 * [`JavaScript`](https://www.javascript.com/) based *project* [**`ArrayJs (2013)`**](https://github.com/EmptyCubes/Array.js).
 * [**`ArrayJs`**](https://github.com/EmptyCubes/Array.js), ***differed*** in *implementation semantics*, in that the
 * [`IEnumerable<T>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8)
 * *extension methods* exposed to the [`JavaScript`](https://www.javascript.com/) [`array`](https://www.w3schools.com/js/js_arrays.asp)
 * *type*, were previously ***coupled*** *directly* to the the [`JavaScript`](https://www.javascript.com/)
 * [`array`](https://www.w3schools.com/js/js_arrays.asp) *type*, through ***prototype*** *extension method definitions*,
 * e.g., ***`Array.prototype.zip = function (second, zipFn) {...}`***.
 *
 * When ***prototype*** *extension method definitions* are used in ***isolation*** of other ***conflicting***
 * *libraries*, the *extended* ***prototype*** *coding conventions* are ***practical*** and *work* as ***intended***.
 * ***Prototype*** *extension method definitions* are *available* to be *called* ***directly*** from the
 * *code context* of the extended ***root type***, e.g. [`JavaScript`](https://www.javascript.com/)
 * [`array`](https://www.w3schools.com/js/js_arrays.asp) *type*. ***Prototype-based*** *extension method*
 * approaches will typically not *incur* additional *code implementation overhead* costs, in regards to
 * ***downstream*** *code implementation complexity*.
 * 
 * Utilizing ***prototype-based***, *extension method conventions*, was **not** a *favorable design approach*,
 * when contemplating the *redesign* with [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs).
 * The ***stance*** [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) is taking ***now***, is that *this library*
 * ***must*** be *reliable* and *resilient* to *failure*, throughout an application's ***entire*** *development*
 * *life-cycle*. [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) **must** remain *resilient to failure* when
 * *adding* or *swapping out*, additional *external* [`JavaScript`](https://www.javascript.com/) or
 * [TypeScript](http://www.typescriptlang.org/) *repository packages* from *popular sources*, e.g.
 * [npm](https://www.npmjs.com/) or [bower](https://bower.io/). [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs)
 * will remain ***side-effect free***, while developers are ***implementing*** *solution configuration changes*, as well as when
 * *upgrading* [TypeScript](http://www.typescriptlang.org/) versions. [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs)
 * ***now*** has the *capability* to gain ***adoption*** by the *development community*, as *code integration*
 * is ***safeguarded*** by the [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) *namespace*.
 *
 * For [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) to *achieve* this *new* ***desired level*** of *dependability*
 * and *supportability*; the *new redesign* ***avoided*** *use of*, and *included* ***removal of*** *all* ***prototype***
 * *extension method definitions*, throughout the *library*. *Pitfalls* for *extending* ***prototype*** *method definitions*
 * on a ***common type***, such as the *built-in* [`JavaScript`](https://www.javascript.com/) [`array`](https://www.w3schools.com/js/js_arrays.asp)
 * *type*, placed [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) at *great risk* for ***external*** *package repository*
 * [**`integration failures`**](https://stackoverflow.com/questions/8859828/javascript-what-dangers-are-in-extending-array-prototype),
 * e.g. when consuming other ***well-known*** *repository library packages* from ***popular*** *package repository sources*,
 * e.g. [npm](https://www.npmjs.com/) or [bower](https://bower.io/).
 * 
 * *Importing* ***external*** *repository packages* into a project always has the *potential* to ***introduce*** *extension method*
 * ***naming collisions*** between *repository packages*. For *libraries* which do ***compete*** with *extending* the
 * [`JavaScript`](https://www.javascript.com/) [`array`](https://www.w3schools.com/js/js_arrays.asp) *type*, with their own
 * ***prototype*** *extension method definitions*. This is *especially true* for [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs),
 * when *considering* the following ***implemented*** *method names*, e.g. ***`Clone(), Count(), Contains()`***. These
 * ***implemented*** *method names*, are in fact ***commonly*** *used names*, from within the *software development space*,
 * and are *likely* to be the ***first*** *method names* to ***collide*** with other *library* design *implementations*. As well,
 * the ***`Clone()`*** *method* does ***not*** *exist* on the [`IEnumerable<T>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8)
 * *interface* for instance, and is *custom* to this [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) *implementation*.
 * However, there is a very high likelihood, that other common ***external*** *repository packages* have already extended
 * the [`JavaScript`](https://www.javascript.com/) [`array`](https://www.w3schools.com/js/js_arrays.asp) *type* with their
 * own ***`Clone()`*** *extension method*, which is why [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) *removed all*
 * ***prototype-based*** *extension methods* and ***provided*** *cleaner community interoperability* through ***interfaces***
 * and ***namespaces***.
 **/
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
     * ***Note:*** the [**`ArrayTs<T>`**](https://github.com/RyanMauldin/ArrayTs) type is utilizing the [**`Intersection Types`**](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
     * method to *pull* together *needed facets* and is implemented by **`ts.IArray<T>`**.
     * 
     * ```typescript
     * const numbers: ts.IArray<number> = ts.Convert<number>([ 1, 2, 3, 4 ]);
     * let clonedNumbers: ts.IArray<number> = numbers.Clone();
     * for (const number of clonedNumbers) { console.log(number); }
     * ```
     **/
    export type ArrayTs<T> =
      IEnumerableArray<T>
      & IDictionary<T>
      & IArrayConstructor
      & IArrayIndexer
      & Array<T>;
}
