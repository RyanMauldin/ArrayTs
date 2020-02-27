/// <reference path="./ArrayTs.d.ts" />

/**
 * **ArrayTs** is a [TypeScript](http://www.typescriptlang.org/) library which *enhances* the *javascript* [`array`](https://www.w3schools.com/js/js_arrays.asp) *type* by exposing additional extension methods,
 * similar to the [`IEnumerable`](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=netframework-4.8) *interface* in [Microsoft's](https://www.microsoft.com/en-us/) [.NET Core](https://docs.microsoft.com/en-us/dotnet/core/) *framework*.
 * The *generic* [`Array&lt;T>`](https://www.typescriptlang.org/docs/handbook/generics.html) *interface* is being *extended* for the [ArrayTs (2020)](https://github.com/RyanMauldin/ArrayTs) implementation of the [`IEnumerable`](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=netframework-4.8) *interface*
 * features, *exposed* to the *javascript* [`array`](https://www.w3schools.com/js/js_arrays.asp) *type*. The [ArrayJs (2013)](https://github.com/EmptyCubes/Array.js) version differed in implementation semantics,
 * in that the [`IEnumerable`](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=netframework-4.8) *interface extension methods* exposed to the *javascript* [`array`](https://www.w3schools.com/js/js_arrays.asp) *type*,
 * were previously *coupled*, *directly* to the *javascript* [`array`](https://www.w3schools.com/js/js_arrays.asp) *type*, extended through *prototype extension method definitions*, e.g., `Array.prototype.zip = function (second, zipFn) {...}`.
 *
 * When *prototype extension method definitions* are used in **isolation** of other *conflicting* libraries, the *extended prototype coding conventions* are **practical**. *Prototype extension method* *definitions*
 * align themselves to be **directly** *called* off of the *root type* that is already being dealt with from a library standpoint, e.g. *javascript* [`array`](https://www.w3schools.com/js/js_arrays.asp) *type*. Having
 * *direct access* to the *extension methods* off of the *root type* further *minimizes* the amount of code needed to be *implemented* by the *developer*, and the *developer* is less likely to need to explicitly cast
 * all generically typed facets to be explicitly defined. The [TypeScript](http://www.typescriptlang.org/) compiler with *generics* or *complicated interfaces*, and the overall *code aesthetics* and *readability* when
 * dealing with the *extended type* will be at its most *condensed* and *concise* state. Utilizing *prototype extension method conventions* however, was **not** a *favorable approach* when contemplating the *redesign*
 * of **ArrayTs**. The *stance* **ArrayTs** is taking **now**, is that *this library* **must** be *reliable* and *resilient* to *failure* throughout an application's *entire development life-cycle*. **ArrayTs** **must**
 * remain *resilient to failure* when *adding* or *swapping out*, additional *external* *javascript* or [TypeScript](http://www.typescriptlang.org/) *repository packages* from *popular sources*, e.g. [npm](https://www.npmjs.com/).
 * **ArrayTs** should also remain *side-effect free* while developers are implementing *solution configuration changes*, as well as when *upgrading* [TypeScript](http://www.typescriptlang.org/) versions. **ArrayTs**
 * *now has* the *capability* to *adopt* a *favorable audience*.
 *
 * For this new *desired level* of *stability* in this **ArrayTs** library to be possible, this redesign had *avoided* using any *prototype extension method definitions* throughout. *Pitfalls* for *extending prototype
 * method definitions* on a *common type*, such as the *built-in* *javascript* [`array`](https://www.w3schools.com/js/js_arrays.asp) *type*, placed **ArrayTs** at *great risk* for *external package repository integration*
 * [failures](https://stackoverflow.com/questions/8859828/javascript-what-dangers-are-in-extending-array-prototype), e.g. when consuming other *well-known repository library packages* from *popular package repository sources*,
 * e.g. [npm](https://www.npmjs.com/). *External repository packages* have the *capability* to *introduce* *extension method name collisions* for libraries which **compete** to *extend* the *javascript* [`array`](https://www.w3schools.com/js/js_arrays.asp) *type*,
 * with their own *prototype extension* method definitions. This is especially true for **ArrayTs**, when considering the following used method names, e.g. `Clone()`, `Count()`, `Contains()`. These used method names are
 * commonly used names in the industry in general, even beyond any specific usage withing the intended [`IEnumerable`](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=netframework-4.8) *interface*
 * *space*, especially *non-IEnumerable* implemented methods such as `Clone()`. `Clone()`, for instance, is *custom* to this **ArrayTs** list of *extension methods*, and is **not listed** as an [`IEnumerable`](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=netframework-4.8) *interface*
 * method. However, `Clone()` could *very easily* be *encountered* within other *common repository packages*.
 *
 * [Original ArrayJs (2013)](https://github.com/EmptyCubes/Array.js) Authors: [Jack Godwin](https://github.com/KodingSykosis) & [Ryan Mauldin](https://github.com/ryanmauldin)
 *
 * [Current ArrayTs (2020)](https://github.com/RyanMauldin/ArrayTs) Author: [Ryan Mauldin](https://github.com/ryanmauldin).
 *
 *
 * **Major Refactor Notes**
 *
 * **02/27/2020** - [Ryan Mauldin](https://github.com/ryanmauldin), refactored the original ArrayJS library to use a completely [TypeScript](http://www.typescriptlang.org/) & non-prototype based approach.
 *
 * ```typescript
 * // Usage:
 * /// <reference path="./ArrayTs/ArrayTs.ts"
 * const numbers: Array<number> = [ 1, 2, 3, 4 ];
 * const words: Array<string> = [ "one", "two", "three" ];
 * let zipped = new Array<string>();
 * if (!ArrayTs.IsNullOrEmpty(numbers) && !ArrayTs.IsNullOrEmpty(words))
 *     zipped = (<ArrayTs.Get<string>>words).Zip(numbers, (first: string, second: number) => first + " " + second);
 * for (const zip of zipped) { console.log(zip); }
 * ```
 **/
namespace ArrayTs {
  /**
   * **`Get<T>`** is a [TypeScript](http://www.typescriptlang.org/) class in the `ArrayTs` *namespace*, which extends the *generic* [`Array<T>`](https://www.typescriptlang.org/docs/handbook/generics.html) *type*.
   * *`Get<T>`* *enhances* the *javascript* [`array`](https://www.w3schools.com/js/js_arrays.asp) *type* by *exposing* **additional** *extension methods*, which *incorporate* a *naming strategy* similar to the [`IEnumerable`](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=netframework-4.8) *interface*,
   * provided with [Microsoft's](https://www.microsoft.com/en-us/) [.NET Core](https://docs.microsoft.com/en-us/dotnet/core/) framework. The `Clone()` method is a **Deep clone**,
   * which will *surf* the *array object graph* and create an *identical copy*.
   *
   * ```typescript
   * // Usage:
   * /// <reference path="./ArrayTs/ArrayTs.ts"
   * const numbers: Array<number> = [ 1, 2, 3, 4 ];
   * let clonedNumbers: Array<number>;
   * if (!ArrayTs.IsNullOrEmpty(numbers)) clonedNumbers = (<ArrayTs.Get<number>>numbers).Clone();
   * for (const number of numbers) { console.log(number); }
   * ```
   **/
  export class Get<T> extends Array<T> {
    Aggregate(func: Function, seed?: T): T {
      let aggregateValue: T;
      if (typeof func === "undefined" || func === null)
        throw Error("ArgumentNullException: func is null.");

      // Use seed as default return value for empty lists, otherwise throw an exception.
      if (typeof seed !== "undefined" && seed === null) {
        if (this.length === 0) return seed;
        aggregateValue = seed;
      } else {
        if (this.length === 0)
          throw Error(
            "InvalidOperationException: source contains no elements."
          );
        aggregateValue = this[0];
      }

      let compiledFunction = CompileExpression(func);
      for (var i = 1, len = this.length; i < len; i++)
        aggregateValue = compiledFunction(aggregateValue, this[i]);
      return aggregateValue;
    }

    All(predicate: any): boolean {
      var results =
        typeof predicate === "undefined" ? this : this.Where(predicate);
      return results.length === this.length;
    }

    Any(predicate: any): boolean {
      var results =
        typeof predicate === "undefined" ? this : this.Where(predicate);

      return results.length > 0;
    }

    Average() {
      return this.Sum() / this.length;
    }

    Clone() {
      return DeepClone(this);
    }

    //concat is already in ecma...

    Contains(value: any) {
      return (
        this.Count(function(item: any) {
          return Compare(item, value) === 0;
        }) > 0
      );
    }

    Count(qry?: any) {
      var results = typeof qry === "undefined" ? this : this.Where(qry);

      return results.length;
    }

    // Excluding DefaultIfEmpty

    Distinct() {
      if (this.length < 1) return this;

      var sortedResults = this.sort(Compare);
      var results = [];
      results.push(sortedResults[0]);
      for (var i = 0, j = 1, len = sortedResults.length; j < len; i++, j++) {
        var previous = sortedResults[i];
        var current = sortedResults[j];

        if (Compare(current, previous) !== 0) results.push(current);
      }

      return results;
    }

    ElementAt(index: any) {
      var result = this.ElementAtOrDefault(index);

      if (result === null) throw "No Results Found";

      return result;
    }

    ElementAtOrDefault(index: any) {
      if (this.length === 0 || index < 0 || index - 1 > this.length)
        return null;

      return this[index];
    }

    // Excluding Empty

    Except(array: any) {
      if (this.length === 0 || array.length === 0) return this;

      var results = [];
      for (var i = 0, len = this.length; i < len; i++) {
        if (array.contains(this[i])) continue;

        results.push(this[i]);
      }

      return results;
    }

    First(qry: any) {
      var result = this.FirstOrDefault(qry);

      if (result === null) throw "No Results Found";

      return result;
    }

    FirstOrDefault(predicate?: Function) {
      var results =
        typeof predicate === "undefined" ? this : this.Where(predicate);

      return results.length > 0 ? results[0] : null;
    }

    GroupBy(exp: any, keyName: any, valName: any) {
      var compiled = CompileExpression(exp);
      var keys = (<any>this.Select(compiled)).distinct();
      var results = [];

      for (var i = 0, len = keys.length; i < len; i++) {
        var obj = <any>{};
        obj[keyName || "key"] = keys[i];
        obj[valName || "value"] = this.Where(function(item: any) {
          return compiled(item) === keys[i];
        });

        results.push(obj);
      }

      return results;
    }

    GroupJoin(inner: any, outerKey: any, innerKey: any, func: Function) {
      var iKey = CompileExpression(innerKey);
      var oKey = CompileExpression(outerKey);
      var results = [];

      for (var i = 0, len = this.length; i < len; i++) {
        var outerItem = this[i];
        var matches = inner.where(function(item: any) {
          return Compare(oKey(outerItem, item), iKey(item, outerItem)) === 0;
        });

        results.push(matches);
      }

      return this.Zip(results, func);
    }

    // Same as join from microsoft documentation, however join already exists in ecma and is more of a concat...
    InnerJoin(inner: any, outerKey: any, innerKey: any, func: any) {
      var iKey = CompileExpression(innerKey);
      var oKey = CompileExpression(outerKey);
      var results = <any>[];

      for (var i = 0; i < this.length; i++) {
        var outerItem = this[i];
        var matches = inner.Where(function(item: any) {
          return Compare(oKey(outerItem), iKey(item)) === 0;
        });

        results.splice.apply(results, [results.length, 0].concat(matches));
      }

      return this.Zip(results, func);
    }

    Intersect(array: any) {
      if (this.length === 0 || array.length === 0) return [];

      var results = [];
      for (var i = 0; i < array.length; i++)
        for (var j = 0; j < this.length; j++)
          if (Compare(this[j], array[i]) === 0) results.push(this[j]);

      return results;
    }

    Last(qry: any) {
      var result = this.LastOrDefault(qry);

      if (result === null) throw "No Results Found";

      return result;
    }

    LastOrDefault(qry: any) {
      var results = typeof qry === "undefined" ? this : this.Where(qry);

      return results.pop() || null;
    }

    // Excluding LongCount
    // Map<U>(this: Array<U>, ...args: any[]) : U[];
    // Map<U>(this: Array<T>, callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
    //     return [];
    // }

    Max(qry: any) {
      var results = this.Select(qry);
      return Math.max.apply(null, <any>results);
    }

    Min(qry: any) {
      var results = this.Select(qry);
      return Math.min.apply(null, <any>results);
    }

    // Excluding OfType

    OrderBy(qry: any) {
      if (typeof qry === "undefined") return this.sort(Compare);

      var compiled = CompileExpression(qry);

      return this.sort(function(a, b) {
        return Compare(compiled(a), compiled(b));
      });
    }

    OrderByDescending(qry: any) {
      return this.OrderBy(qry).reverse();
    }

    // Excluding Range
    // Excluding Repeat
    // Reverse already a part of ecma.

    Select(qry: any) {
      if (typeof qry === "undefined") return this;

      var compiled = CompileExpression(qry);
      var results = [];

      for (var i = 0, len = this.length; i < len; i++)
        results.push(compiled(this[i]));

      return results;
    }

    SelectMany(qry: any) {
      if (typeof qry === "undefined") return this;

      var results = this.Select(qry);
      var array = <any>[];

      for (var i = 0, len = results.length; i < len; i++)
        array.splice.apply(array, [array.length, 0].concat(results[i]));

      return array;
    }

    SequenceEqual(array: any) {
      if (typeof array === "undefined" || array === null) return false;

      if (this.length !== array.length) return false;

      for (var i = 0, len = this.length; i < len; i++)
        if (Compare(this[i], array[i]) !== 0) return false;

      return true;
    }

    Single() {
      if (this.length !== 1)
        throw "Sequence does not contain a single element.";

      return this[0];
    }

    SingleOrDefault() {
      if (this.length > 1) throw "Sequence does not contain a single element.";

      return this.length === 1 ? this[0] : null;
    }

    Skip(index: any) {
      return this.slice(index, this.length);
    }

    SkipWhile(qry: any) {
      var compiled = CompileExpression(qry);
      var results = [];

      for (var i = 0, len = this.length; i < len; i++)
        if (compiled(this[i]) !== true) results.push(this[i]);

      return results;
    }

    Sum() {
      if (this.length === 0) return 0;

      var isInt = function(val: any) {
        return parseInt(val) === parseFloat(val);
      };

      var sum = 0;
      for (var i = 0, len = this.length; i < len; i++) {
        var val = this[i];
        if (isNaN(<any>val)) val = <any>0;

        var cur = isInt(val) ? parseInt(<any>val) : parseFloat(<any>val);
        sum += cur;
      }

      return sum;
    }

    Take(count: any) {
      return this.slice(0, count);
    }

    TakeWhile(qry: any) {
      var compiled = CompileExpression(qry);
      var results = [];

      for (var i = 0, len = this.length; i < len; i++) {
        var item = this[i];
        if (compiled(item) !== true) return results;

        results.push(item);
      }

      return results;
    }

    // Excluding ThenBy
    // Excluding ThenByDescending
    // Excluding ToArray ... lol
    // Excluding ToDictionary
    // Excluding ToList
    // Excluding ToLookup

    Union(array: any) {
      if (typeof array === "undefined" || array === null) return this;

      return (<any>this.concat(array)).distinct();
    }

    Where(predicate: any): Array<T> {
      var compiledFunction = CompileExpression(predicate);
      var results = [];

      for (var i = 0, len = this.length; i < len; i++)
        if (compiledFunction(this[i]) === true) results.push(this[i]);

      return results;
    }
    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     * The first sequence is the array itself, and the func parameter gets executed for every element zipped in the
     * sequence.
     *
     * ```typescript
     * // Usage:
     * /// <reference path="./ArrayTs/ArrayTs.ts"
     * const numbers: Array<number> = [ 1, 2, 3, 4 ];
     * const words: Array<string> = [ "one", "two", "three" ];
     * let zipped = new Array<string>();
     * if (!ArrayTs.IsNullOrEmpty(numbers) && !ArrayTs.IsNullOrEmpty(words))
     *     zipped = (<ArrayTs.Get<string>>words).Zip(numbers, (first: string, second: number) => first + " " + second);
     * for (const zip of zipped) { console.log(zip); }
     * ```
     */
    Zip(second: any, func: Function): Array<T> {
      const results = new Array<T>();
      let compiledFunction: Function = func;
      if (typeof func !== "function" || func === null)
        compiledFunction = CompileExpression(func);

      for (var index = 0, length = this.length; index < length; index++)
        if (second.length > index)
          results.push(compiledFunction(this[index], second[index]));

      return results;
    }
  }

  export function IsNull(value: any[] | Get<any> | undefined | null): boolean {
    return typeof value === "undefined" || value === null;
  }

  export function IsNullOrEmpty(
    value: any[] | Get<any> | undefined | null
  ): boolean {
    return typeof value === "undefined" || value === null || value.length <= 0;
  }

  // Comparison and compilation expressions
  // tslint:disable-next-line
  export function DeepClone(source: any): any {
    const sourceType: string = typeof source;
    if (
      sourceType === "undefined" ||
      source == null ||
      sourceType === "string" ||
      sourceType === "number" ||
      sourceType === "boolean" ||
      sourceType === "function" ||
      source instanceof Date
    )
      return source;

    if (typeof source === "object") {
      var result = <any>[];

      Enumerator(source, function(val: any, key: any) {
        var sourceClone = DeepClone(val);
        result.push(sourceClone);
        return true;
      });

      return result;
    }

    return source;
  }

  // tslint:disable-next-line
  export function Compare(source: any, target: any): number {
    const sourceType: string = typeof source;
    const targetType: string = typeof target;
    if (sourceType === "undefined" || targetType === "undefined")
      return sourceType === "undefined"
        ? -1
        : targetType === "undefined"
        ? 1
        : 0;

    if (sourceType !== targetType)
      throw new Error(
        "ArgumentException: both objects must be of the same type."
      );

    if (source === null || target === null)
      return source === target ? 0 : source === null ? 1 : -1;

    if (source.Compare) return source.Compare(target);

    if (source.compare) return source.compare(target);

    if (sourceType === "string")
      return source > target ? 1 : source < target ? -1 : 0;

    if (sourceType === "number")
      return source < target ? -1 : source > target ? 1 : 0;

    if (sourceType === "boolean")
      return source === target ? 0 : source ? 1 : -1;

    if (sourceType === "function") {
      var sourceValue = source();
      var targetValue = target();
      return Compare(sourceValue, targetValue);
    }

    if (source instanceof Date)
      return source > target ? 1 : source < target ? -1 : 0;

    if (sourceType === "object") {
      var result = <any>[];

      Enumerator(source, function(value: any, key: any) {
        var sort = Compare(value, target[key]);
        result.push(sort);
        if (sort === -1) return false;
      });

      return result.reduce(function(previous: any, current: any) {
        if (previous === current) return previous;
        var sum = previous + current;
        return sum === 0 ? -1 : sum;
      });
    }

    throw new Error("ArgumentException: Unable to compare objects.");
  }

  // tslint:disable-next-line
  export function CompileExpression(expression: any): Function {
    if (typeof expression === "undefined" || expression === null)
      throw new Error("ArgumentNullException: expression has no value.");
    if (typeof expression === "number" || typeof expression === "object")
      throw new Error("ArgumentException: expression is of unexpected type.");
    if (typeof expression === "function") return expression;

    var parts = expression.split("=>");
    var args =
      parts.length > 0
        ? parts
            .shift()
            .trim()
            .replace(/\(|\)/g, "")
        : null;
    var func = parts.length > 0 ? parts.join("=>").trim() : null;

    if (
      typeof args === "undefined" ||
      args === null ||
      typeof func === "undefined" ||
      func === null
    )
      throw new Error("ArgumentException: expression is invalid.");

    return new Function(args, "return (" + func + ");");
  }

  export function Enumerator(source: any, func: Function) {
    if (Array.isArray(source))
      for (var i = 0, len = source.length; i < len; i++)
        if (func(source[i], i) === false) return;
        else
          for (var key in source) if (func(source[key], key) === false) return;
  }
}
