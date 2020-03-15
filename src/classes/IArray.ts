/// <reference path="../types/IArrayTs.ts" />
/// <reference path="../functions/GlobalComparison.ts" />
/// <reference path="../functions/GlobalConversion.ts" />
/// <reference path="../functions/GlobalDictionary.ts" />
/// <reference path="../functions/GlobalEnumerator.ts" />
/// <reference path="../functions/GlobalExpression.ts" />

namespace ts {
    
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
    export class IArray<T> extends Array<T> implements IArrayTs<T> {
        [Symbol.species]: IArray<T>;
        readonly prototype!: IArray<T>;

        // static new <T>(): IArray<T> {
        //     return Object.create(IArray.prototype);
        // }

        public new <T>(source: number): IArray<T>;
        public new <T>(source?: number | undefined): IArray<T>;
        public new <T>(source: IArray<T>): IArray<T>;
        public new <T>(source: IArray<any>): IArray<T>;
        public new <T>(source: Array<T>): IArray<T>;
        public new <T>(source: Array<any>): IArray<T>;
        public new <T>(source: ArrayLike<T>): IArray<T>;
        public new <T>(source: ArrayLike<any>): IArray<T>;
        public new <T>(source: Iterable<T>): IArray<T>;
        public new <T>(source: Iterable<any>): IArray<T>;
        public new <T>(source: any): IArray<T>;
        public new <T>(source?: any): IArray<T> {
            const sourceIArray: IArray<T> = (<IArray<any>>Object.create(IArray.prototype)).Cast<T>();
            sourceIArray.Set(source);
            return sourceIArray;
        }

        public constructor(source: number);
        public constructor(source?: number | undefined);
        public constructor(source: IArray<T>);
        public constructor(source: IArray<any>);
        public constructor(source: Array<T>);
        public constructor(source: Array<any>);
        public constructor(source: ArrayLike<T>);
        public constructor(source: ArrayLike<any>);
        public constructor(source: Iterable<T>);
        public constructor(source: Iterable<any>);
        public constructor(source: any);
        public constructor(source?: any) {
            super();
            // delete all existing elements via splice, shouldn't be any.
            if (this.length > 0) this.splice(0, this.length);
            if (IsNull(source)) return;
            if (Number.isInteger(source!)){
                const arrayLength: number = (<number>source!);
                if (arrayLength <= 0) return;
                // add new elements via splice
                for (var index = 0; index < arrayLength; index++)
                    this.push();
                return;
            }

            if (IsIArray<T>(source!) || IsArray<T>(source!) || IsArrayLike<T>(source!) || IsIterable<T>(source!)) {
                const sourceIArray: IArray<T> = Convert<any>(source!).Cast<T>();
                for (var index = 0; index < sourceIArray.length; index++)
                    this.push(sourceIArray[index]);
                return;
            }

            // attempt unknown casting or array types IArray<any>, Array<any>, ArrayLike<any>, Iterable<any>
            const sourceIArray: IArray<T> = Convert<any>(source!).Cast<T>();
            for (var index = 0; index < sourceIArray.length; index++)
                this.push(sourceIArray[index]);
            return;
        }

        [x: string]: T & any;
        
        isArray(arg: any): arg is IArray<any> {
            return arg.IsArray();
        }
        // from<T>(arrayLike: ArrayLike<T>): T[];
        // from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
        // from<T>(iterable: ArrayLike<T> | Iterable<T>): T[];
        // from<T, U>(iterable: ArrayLike<T> | Iterable<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
        // from(iterable: any, mapfn?: any, thisArg?: any);
        from(iterable: any, mapfn?: any, thisArg?: any): any[] {
            return new IArray<any>(iterable).Cast<T>().ToArray();
        }
        //of<T>(...items: T[]): T[];
        of<T>(...items: T[]): T[] {
            return new IArray<T>(items).ToArray();
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
        

        public IsArray<T>(): this is Array<T> {
            return IsArray<T>(this) && this! instanceof Array;
        }

        public IsIArray<T>(): this is IArray<T> {
            return IsIArray<T>(this) && this! instanceof IArray;
        }

        public Aggregate(predicate?: any, seed?: T): T {
            let aggregateValue: T;
            if (IsNull(predicate)) throw Error("ArgumentNullException: predicate is null.");
            // Use seed as default return value for empty lists, otherwise throw an exception.
            if (!IsNull(seed)) {
                if (this.Any()) return seed!;
                aggregateValue = seed!;
            } else {
                if (this.Any()) throw Error("InvalidOperationException: source contains no elements.");
                    aggregateValue =this[0];
            }

            let expression: Function = CompileExpression(predicate);
            for (var index = 1; index < this.length; index++)
                aggregateValue = expression(aggregateValue, this[index]);
            return aggregateValue;
        }

        public All(predicate?: any): boolean {
            const results: IArray<T> = IsNull(predicate) ? this : this.Where(predicate!);
            return results.length === this.length;
        }

        public Any(predicate?: any): boolean {
            const results: IArray<T> = IsNull(predicate) ? this : this.Where(predicate!);
            return results.length > 0;
        }

        public Average(): number {
            if (this.length < 1) return 0;
            return this.Sum() / this.length;
        }

        public Cast<TResult>(): IArray<TResult>{
            return this.Select<TResult>((p: T) => <TResult>(<any>p));
        }

        public Clear(): void {
            if (this.length === 0) return;
            this.splice(0, this.length);
        }

        public Clone(): IArray<T> {
            return DeepClone(this);
        }

        public Concat<TResult>(source?: any): IArray<TResult> {
            const instanceIArray: IArray<any> = this.Cast<any>();
            if (IsNull(source)) return instanceIArray.Cast<TResult>();
            const sourceIArray: IArray<any> = Convert<any>(source);
            return Convert<any>(instanceIArray.concat(sourceIArray)).Cast<TResult>();
        }

        public Contains(value?: any): boolean {
            return Contains(this, value);
        }

        public Count(predicate?: any): number {
            const results: IArray<T> = IsNull(predicate) ? this : this.Where(predicate!);
            return results.length;
        }

        // Excluding DefaultIfEmpty

        public Distinct(): IArray<T> {
            if (this.length < 1) return this;
            var sortedResults = this.Sort(Compare);
            var results = new IArray<T>();
            results.push(sortedResults[0]);
            for (var previousIndex = 0, currentIndex = 1; currentIndex < sortedResults.length; previousIndex++, currentIndex++) {
                var previous = sortedResults[previousIndex];
                var current = sortedResults[currentIndex];

                if (Compare(current, previous) !== 0)
                    results.push(current);
            }

            return results;
        }

        public ElementAt(index: any): T {
            var result = this.ElementAtOrDefault(index);
            if (result === null) throw new Error("No Results Found");
            return result;
        }

        public ElementAtOrDefault(index: any): T | null {
            if (this.length === 0 || index < 0 || index - 1 > this.length) return null;
            return <T>this[index];
        }

        // From .net static array
        // // https://docs.microsoft.com/en-us/dotnet/api/system.array?view=netframework-4.8
        public static Empty<T>(): IArray<T> {
            return new IArray<T>();
        }

        public Except(target: any): IArray<T> {
            const exceptTarget: IArray<T> = Convert<T>(target);
            if (this.Any() || exceptTarget.Any()) return this;

            const length: number = this.length;
            const results: IArray<T> = new IArray<T>();
            for (var index = 0; index < length; index++) {
                if (exceptTarget.Contains(this[index])) continue;
                results.push(this[index]);
            }

            return results;
        }

        // public forEach(callbackfn: (value: T, index: number, array: IArray<T>) => void, thisArg?: any): void {
        //     const thisTypedArg: IArray<T> = <IArray<T>>thisArg;
        //     // const thisArgArray: Array<T> = thisTypedArg.ToArray();
        //     //var length = thisArgArray.length;
        //     const length: number = thisArg.Length();
        //     for(var index = 0; index < length; index++) {
        //         const value: T = <T>thisArg[index];
        //         callbackfn(value, index, thisArg);
        //     }
        // };

        public First(predicate?: Function): T {
            var result = this.FirstOrDefault(predicate);
            if (IsNull(result)) throw new Error("No Results Found");
            return result!;
        }

        public FirstOrDefault(predicate?: Function): T | null {
            const results: IArray<T> = IsNull(predicate) ? this : this.Where(predicate);
            return results.Length() > 0 ? results[0] : null;
        }

        public Get(): IArray<T> {
            return this;
        }

        public GetGenericType(): string {
            return GetGenericType<T>();
        }

        public GroupBy<TResult>(predicate?: any, keyName?: any, valueName?: any): IArray<TResult> {
            let results: IArray<TResult> = new IArray<TResult>();
            if (IsNull(predicate)) {
                const obj: any = <T>{};
                keyName = keyName || "key";
                SetProperty(obj, keyName, <any>0);
                valueName = valueName || "value";
                const value: IArray<T> = this.Clone();
                SetProperty(obj, valueName, value);
                results.Push(obj);
                return results;
            }

            const expression: Function = CompileExpression(predicate);
            const keys: IArray<T> = this.Select<T>(expression).Distinct();
            const length: number = keys.Length();

            for (var index = 0; index < length; index++) {
                const obj: any = <T>{};
                keyName = keyName || "key";
                SetProperty(obj, keyName, <any>0);
                valueName = valueName || "value";
                const value: IArray<T> = this.Where(function(item: any) {
                    return expression(item) === keys[index];
                });
                SetProperty(obj, valueName, value);
                results.Push(obj);
            }

            return results;
        }

        GroupJoin<TResult>(source: any, outerKey: any, innerKey: any, zipFunction: Function): IArray<TResult> {
            const length: number = this.Length();
            const oKeyExpression: Function = CompileExpression(outerKey);
            const iKeyExpression: Function = CompileExpression(innerKey);
            const results: IArray<TResult> = new IArray<TResult>();

            for (var index = 0; index < length; index++) {
                var outerItem = this[index];
                var matches = (Convert<TResult>(source)).Where(function(item: any) {
                    return Compare(oKeyExpression(outerItem, item), iKeyExpression(item, outerItem)) === 0;
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
        InnerJoin<TResult>(source: any, outerKey: any, innerKey: any, zipFunction: any): IArray<TResult> {
            const length: number = this.Length();
            const oKeyExpression: Function = CompileExpression(outerKey);
            const iKeyExpression: Function = CompileExpression(innerKey);
            let results: IArray<number> = new IArray<number>();
            for (var index = 0; index < length; index++) {
                var outerItem = this[index];
                var matches = (Convert<TResult>(source)).Where(function(item: any) {
                    return Compare(oKeyExpression(outerItem), iKeyExpression(item)) === 0;
                });

                const resultsLength: number = results.Length();
                const applyArray: IArray<any> = Convert<any>([resultsLength, 0]).Concat<any>(matches).Cast<number>();
                results = results.Splice(applyArray.length, resultsLength);
            }

            return this.Zip<TResult>(results, zipFunction);
        }

        public Intersect<TResult>(source?: any): IArray<TResult> {
            const results: IArray<TResult> = new IArray<TResult>();
            if (IsNull(source)) return results;
            const instanceIArray: IArray<T> = this;
            const length: number = instanceIArray.Length();
            const sourceIArray: IArray<any> = Convert<any>(source);
            const sourceLength: number = sourceIArray.Length();
            if (instanceIArray.Any() || sourceIArray.Any()) return results;
            for (var sourceIndex = 0; sourceIndex < sourceLength; sourceIndex++)
                for (var index = 0; index < length; index++)
                    if (Compare(this[index], source[sourceIndex]) === 0)
                        results.Push(this[index]);
            return results;
        }

        public Last(predicate?: any): T {
            var result = this.LastOrDefault(predicate);
            if (result === null) throw "No Results Found";
            return result;
        }

        public LastOrDefault(predicate?: any): T | null {
            var results = typeof predicate === "undefined" ? this : this.Where(predicate);
            return results.ToArray().pop() || null;
        }

        public Length(): number {
            const thisArray: Array<T> = <Array<T>>this;
            return thisArray.length;
        }

        // Excluding LongCount
        // Map<U>(this: Array<U>, ...args: any[]) : U[];
        // Map<U>(this: Array<T>, callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
        //     return [];
        // }

        public Max(predicate?: any) {
            var results = this.Select(predicate);
            return Math.max.apply(null, <any>results);
        }

        public Min(predicate?: any) {
            var results = this.Select(predicate);
            return Math.min.apply(null, <any>results);
        }

        public OrderBy(predicate?: any) {
            if (IsNull(predicate)) return Convert<T>(this.Sort(Compare).ToArray());
            var expression = CompileExpression(predicate);
            return Convert<T>(this.sort((a: T, b: T) => Compare(expression(a), expression(b))));
        }

        public OrderByDescending(predicate?: any) {
            return this.OrderBy(predicate).Reverse();
        }

        public Push(source?: any): number {
            // TODO: Imporove push logic to handle arrays
            const element: T = <T>source;
            this.push(element);
            return this.length;
        }

        public Reverse(): IArray<T> {
            return Convert<T>(this.ToArray().reverse());
        }

        public Select<TResult>(predicate?: any): IArray<TResult> {
            if (IsNull(predicate)) return this.Cast<TResult>();
            const length: number = this.length;
            const results: IArray<TResult> = new IArray<TResult>();
            const expression: Function = CompileExpression(predicate);

            for (var index = 0; index < length; index++)
                results.Push(expression(this[index]));

            return results;
        }

        public SelectMany<TResult>(predicate?: any): IArray<TResult>{
            if (IsNull(predicate)) return this.Cast<TResult>();
            let selectResults: IArray<T> = this.Select(predicate);
            let results: IArray<TResult> = new IArray<TResult>();
            for (var index = 0; index < selectResults.length; index++)
                results.Splice(0, 0, selectResults[index]);
            return results;
        }

        public SequenceEqual(source?: any): boolean {
            if (IsNull(source)) return false;
            if (this.length !== source.length) return false;
            const length: number = this.Length();
            for (var index = 0; index < length; index++)
            if (Compare(this[index], source[index]) !== 0) return false;
            return true;
        }

        public Set(source?: any): number {
            if (this.length > 0) {
                this.splice(0, this.length);
            }

            if (IsNull(source))
                return this.length;

            const sourceIArray: IArray<T> = Convert<T>(source);
            if (sourceIArray.length > 0) {
                sourceIArray.forEach(element => {
                    this.push(element);
                });
            }

            return this.length;
        }

        public Single(): T {
            if (this.length !== 1) throw new Error("Sequence does not contain a single element.");
            return this[0];
        }

        public SingleOrDefault(): T | null {
            const length: number = this.length;
            if (length > 1) throw new Error("Sequence does not contain a single element.");
            return length === 1 ? this[0] : null;
        }

        public Skip(index: any): IArray<T> {
            return this.Slice(index, this.length);
        }

        public SkipWhile(predicate?: any): IArray<T> {
            var expression = CompileExpression(predicate);
            var results = new IArray<T>();
            const length: number = this.Length();
            for (var index = 0; index < length; index++)
            if (expression(this[index]) !== true)
                results.Push(this[index]);
            return results;
        }

        public Slice(start?: number, end?: number): IArray<T> {
            return Convert<T>(this.ToArray().slice(start, end));
        }

        public Sort(predicate?: Function): IArray<T> {
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
        public Splice(start: number, end: number, ...items: any): IArray<T> {
            if (IsNull(items)) return Convert<T>(this.splice(start, end));
            const itemsArray: Array<T> = Convert<any>(items).Cast<T>().ToArray();
            return Convert<T>(this.splice(start, end, ...itemsArray));
        }

        public Sum() {
            const length: number = this.Length();
            if (length === 0) return 0;

            var isInteger = function(value: any) {
                return parseInt(value) === parseFloat(value);
            };

            var sum = 0;
            for (let index = 0; index < length; index++) {
                var value = this[index];
                if (isNaN(<any>value)) value = <any>0;
                var currentValue = isInteger(value) ? parseInt(<any>value) : parseFloat(<any>value);
                sum += currentValue;
            }

            return sum;
        }

        Take(count?: any): IArray<T> {
            return this.Slice(0, count);
        }

        public TakeWhile(predicate?: any): IArray<T> {
            if (IsNull(predicate)) return this;
            var expression = CompileExpression(predicate!);
            const results: IArray<T> = new IArray<T>();
            const length: number = this.Length();
            for (let index: number = 0; index < length; index++) {
                const item = this[index];
                if (expression(item) !== true) return results;
                results.Push(item);
            }

            return results;
        }

        public ToArray(): Array<T> {
            return <Array<T>>this;
        }

        public Union<TResult>(source: any): IArray<TResult> {
            if (IsNull(source)) return this.Cast<TResult>();
            return this.Cast<any>().Concat(Convert<any>(source)).Distinct().Cast<TResult>();
        }

        public Where(predicate?: any): IArray<T> {
            const length: number = this.Length();
            const results: IArray<T> = new IArray<T>();
            const expression: Function = CompileExpression(predicate);
            for (var index = 0; index < length; index++)
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
         * const numbers: ts.IArray<number> = ts.Convert<number>([ 1, 2, 3, 4 ]);
         * let clonedNumbers: ts.IArray<number> = numbers.Clone();
         * for (const number of clonedNumbers) { console.log(number); }
         *
         * const numbers: ts.IArray<number> = ts.Convert<number>([ 1, 2, 3, 4 ]);
         * const words: ts.IArray<string> = ts.Convert<string>([ "one", "two", "three" ]);
         * let zipped: ts.IArray<string> = new ts.IArray<string>();
         * if (!ts.IsNullOrEmpty(numbers) && !ts.IsNullOrEmpty(words))
         *     zipped = numbers.Cast<any>().Zip<any>(words, (first: any, second: any) => first + " " + second).Cast<string>();
         * for (const zip of zipped) { console.log(zip); }
         * ```
         */
        public Zip<TResult>(source?: any, predicate?: any): IArray<TResult> {
            const instanceIArray: IArray<T> = this;
            if (IsNull(predicate)) return instanceIArray.Cast<TResult>();
            let expression: Function = CompileExpression(predicate);
            const sourceIArray: IArray<any> = Convert<any>(source);
            const sourceLength: number = sourceIArray.Length();
            const results: IArray<any> = new IArray<any>();
            for (var index = 0; index < instanceIArray.length; index++) {
                if (sourceLength <= index) return results;
                const result: any = expression(instanceIArray[index], sourceIArray[index])
                results.Push(result);
            }
            return results;
        }
    }
}