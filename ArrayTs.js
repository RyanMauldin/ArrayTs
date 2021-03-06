"use strict";
/// <reference path="../Interfaces/IJsArrayEs5.ts" />
/// <reference path="../Interfaces/IJsArrayEs2015Core.ts" />
/// <reference path="../Interfaces/IJsArrayEs2015Iterable.ts" />
/// <reference path="../Interfaces/IJsArrayEs2015WellKnown.ts" />
/// <reference path="../Interfaces/IJsArrayIndexer.ts" />
/// <reference path="./IJsArray.ts" />
/// <reference path="../Interfaces/IEnumerableArray.ts" />
/// <reference path="../Interfaces/IDictionary.ts" />
/// <reference path="../Interfaces/IArrayIndexer.ts" />
var ts;
(function (ts) {
    // Validation expressions
    function IsNull(value) {
        return typeof value === "undefined" || value === null;
    }
    ts.IsNull = IsNull;
    ;
    function IsNullOrEmpty(value) {
        // TODO: add special case for Iterable to not use length
        return typeof value === "undefined" || value === null || value.length <= 0;
    }
    ts.IsNullOrEmpty = IsNullOrEmpty;
    ;
    function IsArray(source) {
        return !IsNull(source) && Array.isArray(source)
            && ts.GetGenericType() === ts.ConvertArray(source).GetGenericType();
    }
    ts.IsArray = IsArray;
    ;
    function IsArrayLike(source) {
        return !IsNull(source)
            && ts.GetGenericType() === ts.ConvertArrayLike(source).GetGenericType();
    }
    ts.IsArrayLike = IsArrayLike;
    function IsIArray(source) {
        return !IsNull(source) && source instanceof ts.IArray
            && ts.GetGenericType() === ts.ConvertIArray(source).GetGenericType();
    }
    ts.IsIArray = IsIArray;
    ;
    function IsIterable(source) {
        return !IsNull(source)
            && ts.GetGenericType() === ts.ConvertIterable(source).GetGenericType();
    }
    ts.IsIterable = IsIterable;
    function IsFunction(func) {
        return !IsNull(func) && typeof func === "function";
    }
    ts.IsFunction = IsFunction;
    ;
    function Contains(source, value) {
        if (IsNull(source))
            return false;
        if (IsIArray(source))
            for (let element of source)
                if (Compare(element, value) === 0)
                    return true;
        if (IsArray(source))
            for (let element of source)
                if (Compare(element, value) === 0)
                    return true;
        if (typeof source === "object") {
            const result = new Array();
            ts.Enumerator(source, function (element, key) {
                var sort = Compare(element, value);
                result.push(sort);
                if (sort === -1)
                    return false;
            });
            return result.reduce(function (previous, current) {
                if (previous === current)
                    return previous;
                var sum = previous + current;
                return sum === 0 ? -1 : sum;
            });
        }
        return Compare(source, value) === 0;
    }
    ts.Contains = Contains;
    ;
    function ContainsValue(source, value) {
        if (IsNull(source))
            return false;
        for (var element of source)
            if (Compare(element, value) === 0)
                return true;
        return false;
    }
    ts.ContainsValue = ContainsValue;
    ;
    function Compare(source, target) {
        const sourceType = typeof source;
        const targetType = typeof target;
        if (sourceType === "undefined" || targetType === "undefined")
            return sourceType === "undefined" ? -1 : targetType === "undefined" ? 1 : 0;
        if (sourceType !== targetType)
            throw new Error("ArgumentException: both objects must be of the same type.");
        if (source === null || target === null)
            return source === target ? 0 : source === null ? 1 : -1;
        if (source.Compare)
            return source.Compare(target);
        if (source.compare)
            return source.compare(target);
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
            var result = new Array();
            ts.Enumerator(source, function (value, key) {
                var sort = Compare(value, target[key]);
                result.push(sort);
                if (sort === -1)
                    return false;
            });
            if (result.length > 0) {
                return result.reduce(function (previous, current) {
                    if (previous === current)
                        return previous;
                    var sum = previous + current;
                    return sum === 0 ? -1 : sum;
                });
            }
            else {
                return 0;
            }
        }
        throw new Error("ArgumentException: Unable to compare objects.");
    }
    ts.Compare = Compare;
    ;
})(ts || (ts = {}));
var ts;
(function (ts) {
    function Convert(source) {
        if (ts.IsNull(source))
            return new ts.IArray();
        if (ts.IsIArray(source)) {
            // Try to cast individual elements.
            const sourceAnyIArray = source;
            if (sourceAnyIArray.IsIArray()) {
                const sourceIArray = ConvertIArray(sourceAnyIArray).Cast();
                if (sourceIArray.IsIArray() && sourceIArray.IsArray())
                    return sourceIArray;
                throw new Error("InvalidArgument: source has an unexpected value.");
            }
            // Try to cast whole type.
            return source;
        }
        if (ts.IsArray(source)) {
            // Try to cast individual elements.
            const sourceAnyArray = source;
            if (ts.IsArray(sourceAnyArray)) {
                const sourceIArray = ConvertArray(sourceAnyArray).Cast();
                if (sourceIArray.IsIArray() && sourceIArray.IsArray())
                    return sourceIArray;
                throw new Error("InvalidArgument: source has an unexpected value.");
            }
            // Try to cast whole type.
            return source;
        }
        if (ts.IsArrayLike(source)) {
            // Try to cast individual elements.
            const sourceAnyArray = source;
            if (ts.IsArrayLike(sourceAnyArray)) {
                const sourceIArray = ConvertArrayLike(sourceAnyArray).Cast();
                if (sourceIArray.IsIArray() && sourceIArray.IsArray())
                    return sourceIArray;
                throw new Error("InvalidArgument: source has an unexpected value.");
            }
            // Try to cast whole type.
            return source;
        }
        if (ts.IsIterable(source)) {
            // Try to cast individual elements.
            const sourceAnyArray = source;
            if (ts.IsIterable(sourceAnyArray)) {
                const sourceIArray = ConvertIterable(sourceAnyArray).Cast();
                if (sourceIArray.IsIArray() && sourceIArray.IsArray())
                    return sourceIArray;
                throw new Error("InvalidArgument: source has an unexpected value.");
            }
            // Try to cast whole type.
            return source;
        }
        if (typeof source === "object") {
            // Try to clone object keys.
            const sourceIArray = ConvertObject(source).Cast();
            if (sourceIArray.IsIArray() && sourceIArray.IsArray())
                return sourceIArray;
            throw new Error("InvalidArgument: source has an unexpected value.");
        }
        throw new Error("InvalidArgument: source has an unexpected value.");
    }
    ts.Convert = Convert;
    ;
    function ConvertIArray(source) {
        if (ts.IsNull(source))
            return new ts.IArray();
        return source;
    }
    ts.ConvertIArray = ConvertIArray;
    ;
    function ConvertArray(source) {
        if (ts.IsNull(source))
            return new ts.IArray();
        const sourceAnyArray = source;
        const sourceIArray = new ts.IArray();
        for (var index = 0; index < sourceAnyArray.length; index++) {
            const element = sourceAnyArray[index];
            sourceIArray.push(element);
        }
        return sourceIArray;
    }
    ts.ConvertArray = ConvertArray;
    ;
    function ConvertArrayLike(source) {
        if (ts.IsNull(source))
            return new ts.IArray();
        const sourceAnyArray = source;
        const sourceIArray = new ts.IArray();
        for (var index = 0; index < sourceAnyArray.length; index++) {
            const element = sourceAnyArray[index];
            sourceIArray.push(element);
        }
        return sourceIArray;
    }
    ts.ConvertArrayLike = ConvertArrayLike;
    ;
    function ConvertIterable(source) {
        if (ts.IsNull(source))
            return new ts.IArray();
        const sourceAnyArray = source;
        const sourceIArray = new ts.IArray();
        for (var element of sourceAnyArray)
            sourceIArray.push(element);
        return sourceIArray;
    }
    ts.ConvertIterable = ConvertIterable;
    ;
    function ConvertObject(source) {
        if (ts.IsNull(source))
            return new ts.IArray();
        // Try to clone object keys.
        const results = new ts.IArray();
        ts.Enumerator(source, function (element, key) {
            results[key] = element;
        });
        return results;
    }
    ts.ConvertObject = ConvertObject;
    ;
    function DeepClone(source) {
        if (ts.IsNull(source))
            return source;
        const sourceType = typeof source;
        if (ts.IsNull(sourceType) || ts.IsFunction(source) || source instanceof Date
            || ts.ContainsValue(["string", "number", "boolean"], sourceType))
            return source;
        if (sourceType === "object") {
            var result = new Array();
            ts.Enumerator(source, function (value) {
                var sourceClone = DeepClone(value);
                result.push(sourceClone);
                return true;
            });
            return result;
        }
        return source;
    }
    ts.DeepClone = DeepClone;
    ;
    // Comparison and compilation expressions
    function GetGenericType() {
        const genericType = {};
        return typeof genericType;
    }
    ts.GetGenericType = GetGenericType;
    ;
})(ts || (ts = {}));
var ts;
(function (ts) {
    function GetProperty(obj, key) {
        return obj[key];
    }
    ts.GetProperty = GetProperty;
    function SetProperty(obj, key, value) {
        obj[key] = value;
    }
    ts.SetProperty = SetProperty;
})(ts || (ts = {}));
var ts;
(function (ts) {
    function Enumerator(source, func) {
        if (ts.IsNull(source) || ts.IsNull(func))
            return;
        const length = source.length;
        if (ts.IsIArray(source) || ts.IsArray(source) || ts.IsArrayLike(source) || ts.IsIterable(source)) {
            for (var index = 0; index < length; index++)
                if (func(source[index], index) === false)
                    return;
        }
        else {
            for (var key in source)
                if (func(source[key], key) === false)
                    return;
        }
    }
    ts.Enumerator = Enumerator;
    ;
})(ts || (ts = {}));
var ts;
(function (ts) {
    // Comparison and compilation expressions
    function CompileExpression(expression) {
        if (ts.IsNull(expression))
            throw new Error("ArgumentNullException: expression has no value.");
        if (ts.IsFunction(expression))
            return expression;
        const expressionType = typeof expression;
        if (ts.ContainsValue(["number", "object"], expressionType))
            throw new Error("ArgumentException: expression is of unexpected type.");
        var parts = expression.split("=>");
        var args = parts.length > 0 ? parts.shift().trim().replace(/\(|\)/g, "") : null;
        var func = parts.length > 0 ? parts.join("=>").trim() : null;
        if (ts.IsNull(args) || ts.IsNull(func))
            throw new Error("ArgumentException: expression is invalid.");
        return new Function(args, "return (" + func + ");");
    }
    ts.CompileExpression = CompileExpression;
    ;
})(ts || (ts = {}));
/// <reference path="../types/IArrayTs.ts" />
/// <reference path="../functions/GlobalComparison.ts" />
/// <reference path="../functions/GlobalConversion.ts" />
/// <reference path="../functions/GlobalDictionary.ts" />
/// <reference path="../functions/GlobalEnumerator.ts" />
/// <reference path="../functions/GlobalExpression.ts" />
var ts;
/// <reference path="../types/IArrayTs.ts" />
/// <reference path="../functions/GlobalComparison.ts" />
/// <reference path="../functions/GlobalConversion.ts" />
/// <reference path="../functions/GlobalDictionary.ts" />
/// <reference path="../functions/GlobalEnumerator.ts" />
/// <reference path="../functions/GlobalExpression.ts" />
(function (ts) {
    //declare var IArray: IArrayConstructor;
    /**
     * **`ArrayTs<T>`** is a [`TypeScript`](http://www.typescriptlang.org/) class in the [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs)
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
     * const numbers: ts.IArray<number> = ts.Convert<number>([ 1, 2, 3, 4 ]);
     * let clonedNumbers: ts.IArray<number> = numbers.Clone();
     * for (const number of clonedNumbers) { console.log(number); }
     * ```
     **/
    //export class IArray<T> extends Array<T> implements ArrayTs<T>, IEnumerableArray<T>  {
    class IArray extends Array {
        constructor(source) {
            super();
            // delete all existing elements via splice, shouldn't be any.
            if (this.length > 0)
                this.splice(0, this.length);
            if (ts.IsNull(source))
                return;
            if (Number.isInteger(source)) {
                const arrayLength = source;
                if (arrayLength <= 0)
                    return;
                // add new elements via splice
                for (var index = 0; index < arrayLength; index++)
                    this.push();
                return;
            }
            if (ts.IsIArray(source) ||
                ts.IsArray(source) ||
                ts.IsArrayLike(source) ||
                ts.IsIterable(source)) {
                const anySource = ts.Convert(source).Cast();
                for (var index = 0; index < anySource.length; index++)
                    this.push(anySource[index]);
                return;
            }
            // attempt unknown casting or array types IArray<any>, Array<any>, ArrayLike<any>, Iterable<any>
            const anySource = ts.Convert(source).Cast();
            for (var index = 0; index < anySource.length; index++)
                this.push(anySource[index]);
            return;
        }
        new(source) {
            const results = (Object.create(IArray.prototype)).Cast();
            results.Set(source);
            return results;
        }
        isArray(arg) {
            return arg.IsArray();
        }
        // from<T>(arrayLike: ArrayLike<T>): T[];
        // from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
        // from<T>(iterable: ArrayLike<T> | Iterable<T>): T[];
        // from<T, U>(iterable: ArrayLike<T> | Iterable<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
        // from(iterable: any, mapfn?: any, thisArg?: any);
        from(iterable, mapfn, thisArg) {
            return new IArray(iterable).Cast().ToArray();
        }
        //of<T>(...items: T[]): T[];
        of(...items) {
            return new IArray(items).ToArray();
        }
        // [x: string]: T & IArray<any>;
        // isArray<T>(arg: any): arg is Array<any> {
        //     throw new Error("Method not implemented.");
        // }
        // prototype: any;
        // from<T>(arrayLike: ArrayLike<T>): T[]{};
        // from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
        // from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
        // from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
        // from(iterable: any, mapfn?: any, thisArg?: any) {
        //     throw new Error("Method not implemented.");
        // }
        // of<T>(...items: T[]): T[] {
        //     throw new Error("Method not implemented.");
        // }
        IsArray() {
            return ts.IsArray(this) && this instanceof Array;
        }
        IsIArray() {
            return ts.IsIArray(this) && this instanceof IArray;
        }
        Aggregate(predicate, seed) {
            if (ts.IsNull(predicate))
                throw new Error("ArgumentNullException: predicate is null.");
            let aggregateValue;
            // Use seed as default return value for empty lists, otherwise throw an exception.
            if (!ts.IsNull(seed)) {
                if (this.Any())
                    return seed;
                aggregateValue = seed;
            }
            else {
                if (this.Any())
                    throw Error("InvalidOperationException: source contains no elements.");
                aggregateValue = this[0];
            }
            let expression = ts.CompileExpression(predicate);
            for (var index = 1; index < this.length; index++)
                aggregateValue = expression(aggregateValue, this[index]);
            return aggregateValue;
        }
        All(predicate) {
            const results = ts.IsNull(predicate)
                ? this
                : this.Where(predicate);
            return results.length === this.length;
        }
        Any(predicate) {
            const results = ts.IsNull(predicate)
                ? this
                : this.Where(predicate);
            return results.length > 0;
        }
        Average() {
            if (this.length < 1)
                return 0;
            return this.Sum() / this.length;
        }
        Cast() {
            return this.Select((p) => p);
        }
        Clear() {
            if (this.length === 0)
                return;
            this.splice(0, this.length);
        }
        Clone() {
            return ts.DeepClone(this);
        }
        Concat(source) {
            const anyInstance = this.Cast();
            if (ts.IsNull(source))
                return anyInstance.Cast();
            const anySource = ts.Convert(source);
            return ts.Convert(anyInstance.concat(anySource)).Cast();
        }
        Contains(value) {
            return ts.Contains(this, value);
        }
        Count(predicate) {
            const results = ts.IsNull(predicate)
                ? this
                : this.Where(predicate);
            return results.length;
        }
        // Excluding DefaultIfEmpty
        Distinct() {
            if (this.length < 1)
                return this;
            var sortedResults = this.Sort(ts.Compare);
            var results = new IArray();
            results.push(sortedResults[0]);
            for (var previousIndex = 0, currentIndex = 1; currentIndex < sortedResults.length; previousIndex++, currentIndex++) {
                var previous = sortedResults[previousIndex];
                var current = sortedResults[currentIndex];
                if (ts.Compare(current, previous) !== 0)
                    results.push(current);
            }
            return results;
        }
        ElementAt(index) {
            const result = this.ElementAtOrDefault(index);
            if (ts.IsNull(result))
                throw new Error("No Results Found");
            return result;
        }
        ElementAtOrDefault(index) {
            if (this.length === 0 || index < 0 || index - 1 > this.length)
                return undefined;
            return this[index];
        }
        // From .net static array
        // // https://docs.microsoft.com/en-us/dotnet/api/system.array?view=netframework-4.8
        static Empty() {
            return new IArray();
        }
        Except(target) {
            const exceptTarget = ts.Convert(target);
            if (this.Any() || exceptTarget.Any())
                return this;
            const length = this.length;
            const results = new IArray();
            for (var index = 0; index < length; index++) {
                if (exceptTarget.Contains(this[index]))
                    continue;
                results.push(this[index]);
            }
            return results;
        }
        // public forEach(callbackfn: (value: T, index: number, array: IArray<T>) => void, thisArg?: any): void {
        //     const thisTypedArg: IArray<T> = <IArray<T>>thisArg;
        //     // const thisArgArray: Array<T> = thisTypedArg.ToArray();
        //     //var length = thisArgArray.length;
        //     const length: number = thisArg.length;
        //     for(var index = 0; index < length; index++) {
        //         const value: T = <T>thisArg[index];
        //         callbackfn(value, index, thisArg);
        //     }
        // };
        First(predicate) {
            var result = this.FirstOrDefault(predicate);
            if (ts.IsNull(result))
                throw new Error("No Results Found");
            return result;
        }
        FirstOrDefault(predicate) {
            const results = ts.IsNull(predicate)
                ? this
                : this.Where(predicate);
            return results.length > 0 ? results[0] : undefined;
        }
        Get() {
            return this;
        }
        GetGenericType() {
            return ts.GetGenericType();
        }
        GroupBy(predicate, keyName, valueName) {
            let results = new IArray();
            if (ts.IsNull(predicate)) {
                const obj = {};
                keyName = keyName || "key";
                ts.SetProperty(obj, keyName, 0);
                valueName = valueName || "value";
                const value = this.Clone();
                ts.SetProperty(obj, valueName, value);
                results.Push(obj);
                return results;
            }
            const expression = ts.CompileExpression(predicate);
            const keys = this.Select(expression).Distinct();
            const length = keys.length;
            for (var index = 0; index < length; index++) {
                const obj = {};
                keyName = keyName || "key";
                ts.SetProperty(obj, keyName, 0);
                valueName = valueName || "value";
                const value = this.Where(function (item) {
                    return expression(item) === keys[index];
                });
                ts.SetProperty(obj, valueName, value);
                results.Push(obj);
            }
            return results;
        }
        GroupJoin(source, outerKey, innerKey, zipFunction) {
            const length = this.length;
            const oKeyExpression = ts.CompileExpression(outerKey);
            const iKeyExpression = ts.CompileExpression(innerKey);
            const results = new IArray();
            for (var index = 0; index < length; index++) {
                var outerItem = this[index];
                var matches = ts.Convert(source).Where(function (item) {
                    return (ts.Compare(oKeyExpression(outerItem, item), iKeyExpression(item, outerItem)) === 0);
                });
                results.Push(matches);
            }
            return this.Zip(results, zipFunction);
        }
        // Same as join from microsoft documentation, however join already exists in ecma and is more of a concat...
        // results = [1, 2, 3, 4];
        // matches = [1, 2, 3];
        // results.splice.apply(results, [results.length, 0].concat(matches));
        // results ... (7) [1, 2, 3, 4, 1, 2, 3]
        InnerJoin(source, outerKey, innerKey, zipFunction) {
            const length = this.length;
            const oKeyExpression = ts.CompileExpression(outerKey);
            const iKeyExpression = ts.CompileExpression(innerKey);
            let results = new IArray();
            for (var index = 0; index < length; index++) {
                var outerItem = this[index];
                var matches = ts.Convert(source).Where(function (item) {
                    return ts.Compare(oKeyExpression(outerItem), iKeyExpression(item)) === 0;
                });
                const resultsLength = results.length;
                const applyArray = ts.Convert([resultsLength, 0])
                    .Concat(matches)
                    .Cast();
                results = results.Splice(applyArray.length, resultsLength);
            }
            return this.Zip(results, zipFunction);
        }
        Intersect(source) {
            const results = new IArray();
            if (ts.IsNull(source))
                return results;
            const anyInstance = this.Cast();
            const anySource = ts.Convert(source);
            if (anyInstance.length === 0 || anySource.length === 0)
                return results;
            for (var sourceIndex = 0; sourceIndex < anySource.length; sourceIndex++)
                for (var index = 0; index < anyInstance.length; index++)
                    if (ts.Compare(anyInstance[index], anySource[sourceIndex]) === 0)
                        results.Push(anyInstance[index]);
            return results;
        }
        Last(predicate) {
            const result = this.LastOrDefault(predicate);
            if (ts.IsNull(result))
                throw new Error("No Results Found");
            return result;
        }
        LastOrDefault(predicate) {
            var _a;
            const results = ts.IsNull(predicate)
                ? this
                : this.Where(predicate);
            return (_a = results.pop()) !== null && _a !== void 0 ? _a : undefined;
        }
        // public Length(): number {
        //   return this.length;
        // }
        // Excluding LongCount
        // Map<U>(this: Array<U>, ...args: any[]) : U[];
        // Map<U>(this: Array<T>, callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
        //     return [];
        // }
        Max(predicate) {
            var results = this.Select(predicate);
            return Math.max.apply(undefined, results);
        }
        Min(predicate) {
            var results = this.Select(predicate);
            return Math.min.apply(undefined, results);
        }
        OrderBy(predicate) {
            if (ts.IsNull(predicate))
                return ts.Convert(this.Sort(ts.Compare).ToArray());
            var expression = ts.CompileExpression(predicate);
            return ts.Convert(this.sort((a, b) => ts.Compare(expression(a), expression(b))));
        }
        OrderByDescending(predicate) {
            return this.OrderBy(predicate).Reverse();
        }
        Push(source) {
            // TODO: Improve push logic to handle arrays
            const element = source;
            this.push(element);
            return this.length;
        }
        Reverse() {
            return ts.Convert(this.ToArray().reverse());
        }
        Select(predicate) {
            if (ts.IsNull(predicate))
                return this.Cast();
            const length = this.length;
            const results = new IArray();
            const expression = ts.CompileExpression(predicate);
            for (var index = 0; index < length; index++)
                results.Push(expression(this[index]));
            return results;
        }
        SelectMany(predicate) {
            if (ts.IsNull(predicate))
                return this.Cast();
            let selectResults = this.Select(predicate);
            let results = new IArray();
            for (var index = 0; index < selectResults.length; index++)
                results.Splice(0, 0, selectResults[index]);
            return results;
        }
        SequenceEqual(source) {
            if (ts.IsNull(source))
                return false;
            if (this.length !== source.length)
                return false;
            const length = this.length;
            for (var index = 0; index < length; index++)
                if (ts.Compare(this[index], source[index]) !== 0)
                    return false;
            return true;
        }
        Set(source) {
            if (this.length > 0) {
                this.splice(0, this.length);
            }
            if (ts.IsNull(source))
                return this.length;
            const tSource = ts.Convert(source);
            if (tSource.length > 0) {
                tSource.forEach(element => {
                    this.push(element);
                });
            }
            return this.length;
        }
        Single() {
            if (this.length !== 1)
                throw new Error("Sequence does not contain a single element.");
            return this[0];
        }
        SingleOrDefault() {
            if (this.length > 1)
                throw new Error("Sequence does not contain a single element.");
            return this.length === 1 ? this[0] : undefined;
        }
        // TODO: try to remove internal calls;
        Skip(index) {
            return this.Slice(index, this.length);
        }
        SkipWhile(predicate) {
            var expression = ts.CompileExpression(predicate);
            var results = new IArray();
            const length = this.length;
            for (var index = 0; index < length; index++)
                if (expression(this[index]) !== true)
                    results.Push(this[index]);
            return results;
        }
        Slice(start, end) {
            return ts.Convert(this.ToArray().slice(start, end));
        }
        Sort(predicate) {
            return this.OrderBy(predicate);
        }
        // results = [1, 2, 3, 4];
        // matches = [1, 2, 3];
        // results.splice.apply(results, [results.length, 0].concat(matches));
        // results ... (7) [1, 2, 3, 4, 1, 2, 3]
        // var args = [start, number].concat(newItemsArray);
        // Array.prototype.splice.apply(theArray, args);
        /**
         * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
         * @param start The zero-based location in the array from which to start removing elements.
         * @param deleteCount The number of elements to remove.
         * @param items Elements to insert into the array in place of the deleted elements.
         **/
        Splice(start, end, ...items) {
            if (ts.IsNull(items))
                return ts.Convert(this.splice(start, end));
            const itemsArray = ts.Convert(items)
                .Cast()
                .ToArray();
            return ts.Convert(this.splice(start, end, ...itemsArray));
        }
        Sum() {
            const length = this.length;
            if (length === 0)
                return 0;
            var isInteger = function (value) {
                return parseInt(value) === parseFloat(value);
            };
            var sum = 0;
            for (let index = 0; index < length; index++) {
                var value = this[index];
                if (isNaN(value))
                    value = 0;
                var currentValue = isInteger(value)
                    ? parseInt(value)
                    : parseFloat(value);
                sum += currentValue;
            }
            return sum;
        }
        Take(count) {
            return this.Slice(0, count);
        }
        TakeWhile(predicate) {
            if (ts.IsNull(predicate))
                return this;
            var expression = ts.CompileExpression(predicate);
            const results = new IArray();
            const length = this.length;
            for (let index = 0; index < length; index++) {
                const item = this[index];
                if (expression(item) !== true)
                    return results;
                results.Push(item);
            }
            return results;
        }
        ToArray() {
            return this;
        }
        // TODO: Remove internal calls to other internal functions, try to
        // TODO: put in real functionality for performance.
        Union(source) {
            if (ts.IsNull(source))
                return this.Cast();
            return this.Cast()
                .Concat(ts.Convert(source))
                .Distinct()
                .Cast();
        }
        Where(predicate) {
            if (ts.IsNull(predicate))
                throw new Error("ArgumentNullException: predicate is null.");
            const results = new IArray();
            const expression = ts.CompileExpression(predicate);
            for (var index = 0; index < this.length; index++)
                if (expression(this[index]) === true)
                    results.push(this[index]);
            return results;
        }
        /**
         * Applies a *specified function* to the *corresponding elements* of *two sequences*, *producing* a sequence
         * of the results. The first *sequence* is the *array* itself, and the *func parameter* gets executed for
         * every element *zipped* in the sequence.
         *
         * ```typescript
         * const numbers: ts.IArray<number> = new ts.IArray<number>([ 1, 2, 3, 4 ]);
         * let clonedNumbers: ts.IArray<number> = numbers.Clone();
         * for (const number of clonedNumbers) { console.log(number); }
         *
         * const numbers: ts.IArray<number> = new ts.IArray<number>([ 1, 2, 3, 4 ]);
         * const words: ts.IArray<string> = new ts.IArray<string>([ "one", "two", "three" ]);
         * let zipped: ts.IArray<string> = new ts.IArray<string>();
         * if (!ts.IsNullOrEmpty(numbers) && !ts.IsNullOrEmpty(words))
         *     zipped = numbers.Cast<string>().Zip<string>(words, (first: any, second: any) => first + " " + second);
         * for (const zip of zipped) { console.log(zip); }
         * ```
         */
        // TODO: create type of ArrayLike<T>, Iterable<T>, Array<T>, IArray<T>, for source
        // TODO: to further define user knows when casting takes place. 
        Zip(source, predicate) {
            if (ts.IsNull(source))
                throw new Error("ArgumentNullException: source is null.");
            const anySource = ts.Convert(source);
            if (this.length === 0 || anySource.length === 0)
                return new IArray();
            const results = new IArray();
            if (ts.IsNull(predicate)) {
                for (var index = 0; index < this.length; index++) {
                    if (anySource.length <= index)
                        return results;
                    results.push((this[index]));
                }
                return results;
            }
            let expression = ts.CompileExpression(predicate);
            for (var index = 0; index < this.length; index++) {
                if (anySource.length <= index)
                    return results;
                const result = expression(this[index], anySource[index]);
                results.push((result));
            }
            return results;
        }
    }
    ts.IArray = IArray;
})(ts || (ts = {}));
