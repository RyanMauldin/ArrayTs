namespace ts {

    //declare var IArray: IArrayConstructor;

    /**
  * **`ArrayTs<T>`** is a [TypeScript](http://www.typescriptlang.org/) class in the [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs)
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
    export class IArray<T> extends Array<T> implements ArrayTs<T>, IEnumerableArray<T>  {
        readonly prototype!: IArray<T>;

        constructor(...args: Array<any>): IArray<T> {
            super();
            this.Clear();
            for (var arg of args) {
                if (typeof arg === "number") // check for arrayLength
                    this.Set(new Array<T>(<number>arg));
                else if (IsIArray(arg) || IsArray(arg) || this.IsArray(arg)) // check for sources
                    this.Set(this.Cast<any>().Concat<any>(Convert<any>(arg)).Cast<T>());
            }
        }

        new <T>(...args: Array<any>): IArray<T> {
            this.Clear();
            return new IArray<T>(args);
        };

        public IsArray(args: any): args is IArray<any> {
            return IsIArray<T>(args) && args! instanceof IArray;
        }

        public Aggregate(predicate?: any, seed?: T): T {
            let aggregateValue: T;
            if (IsNull(predicate)) throw Error("ArgumentNullException: predicate is null.");
            // Use seed as default return value for empty lists, otherwise throw an exception.
            if (!IsNull(seed)) {
                if (this.Empty()) return seed!;
                aggregateValue = seed!;
            } else {
                if (this.Empty()) throw Error("InvalidOperationException: source contains no elements.");
                    aggregateValue =this[0];
            }
            const length: number = this.Length();
            let compiledFunction: Function = CompileExpression(predicate);
            for (var index = 1; index < length; index++)
                aggregateValue = compiledFunction(aggregateValue, this[index]);
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
            const length: number = this.length;
            if (length < 1) return 0;
            return this.Sum() / length;
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
            return instanceIArray.Concat(sourceIArray).Cast<TResult>();
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
            const length: number = this.length;
            if (length < 1) return this;

            var sortedResults = this.Sort(Compare);
            const sortedLength: number = sortedResults.Length();
            var results = new IArray<T>();
            results.push(sortedResults[0]);
            for (var previousIndex = 0, currentIndex = 1; currentIndex < sortedLength; previousIndex++, currentIndex++) {
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
            const length: number = this.length;
            if (length === 0 || index < 0 || index - 1 > length) return null;
            return <T>this[index];
        }

        public Empty(): boolean {
            return this.length === 0;
        }

        public Except(target: any): IArray<T> {
            const exceptTarget: IArray<T> = Convert<T>(target);
            if (this.Empty() || exceptTarget.Empty()) return this;

            const length: number = this.length;
            const results: IArray<T> = new IArray<T>();
            for (var index = 0; index < length; index++) {
                if (exceptTarget.Contains(this[index])) continue;
                results.push(this[index]);
            }

            return results;
        }

        public First(predicate?: Function): T {
            var result = this.FirstOrDefault(predicate);
            if (IsNull(result)) throw "No Results Found";
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

            const compiledFunction: Function = CompileExpression(predicate);
            const keys: IArray<T> = this.Select<T>(compiledFunction).Distinct();
            const length: number = keys.Length();

            for (var index = 0; index < length; index++) {
                const obj: any = <T>{};
                keyName = keyName || "key";
                SetProperty(obj, keyName, <any>0);
                valueName = valueName || "value";
                const value: IArray<T> = this.Where(function(item: any) {
                    return compiledFunction(item) === keys[index];
                });
                SetProperty(obj, valueName, value);
                results.Push(obj);
            }

            return results;
        }

        GroupJoin<TResult>(source: any, outerKey: any, innerKey: any, zipFunction: Function): IArray<TResult> {
            const length: number = this.Length();
            const oKeyCompiledFunction: Function = CompileExpression(outerKey);
            const iKeyCompiledFunction: Function = CompileExpression(innerKey);
            const results: IArray<TResult> = new IArray<TResult>();

            for (var index = 0; index < length; index++) {
                var outerItem = this[index];
                var matches = (Convert<TResult>(source)).Where(function(item: any) {
                    return Compare(oKeyCompiledFunction(outerItem, item), iKeyCompiledFunction(item, outerItem)) === 0;
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
            const oKeyCompiledFunction: Function = CompileExpression(outerKey);
            const iKeyCompiledFunction: Function = CompileExpression(innerKey);
            let results: IArray<TResult> = new IArray<TResult>();
            for (var index = 0; index < length; index++) {
                var outerItem = this[index];
                var matches = (Convert<TResult>(source)).Where(function(item: any) {
                    return Compare(oKeyCompiledFunction(outerItem), iKeyCompiledFunction(item)) === 0;
                });

                const resultsLength: number = results.Length();
                const applyArray: IArray<any> = Convert<any>([resultsLength, 0]).Concat<any>(matches).Cast<number>();
                results = results.Splice(applyArray.Length(), resultsLength);
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
            if (instanceIArray.Empty() || sourceIArray.Empty()) return results;
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
            var compiledFunction = CompileExpression(predicate);
            return Convert<T>(this.Sort((a: T, b: T) => Compare(compiledFunction(a), compiledFunction(b))));
        }

        public OrderByDescending(predicate?: any) {
            return this.OrderBy(predicate).Reverse();
        }

        public Push(source?: any): number {
            const sourceIArray: IArray<T> = Convert<T>(source);
            const thisArray: Array<T> = <Array<T>>this;
            sourceIArray.forEach((element: T) => {
                thisArray.push(element);
            });
            return thisArray.length;
        }

        public Reverse(): IArray<T> {
            return Convert<T>(this.ToArray().reverse());
        }

        public Select<TResult>(predicate?: any): IArray<TResult> {
            if (IsNull(predicate)) return this.Cast<TResult>();
            const length: number = this.length;
            const results: IArray<TResult> = new IArray<TResult>();
            const compiledFunction: Function = CompileExpression(predicate);

            for (var index = 0; index < length; index++)
                results.Push(compiledFunction(this[index]));

            return results;
        }

        public SelectMany<TResult>(predicate?: any): IArray<TResult>{
            if (typeof predicate === "undefined") return this.Cast<TResult>();
                var results = this.Select(predicate);
                const length: number = results.Length();
                var array = <any>[];
                for (var index = 0; index < length; index++){
                const resultsLength: number = array.length;
                const applyArray: IArray<any> = Convert<any>([resultsLength, 0]).Concat<any>(results[index]).Cast<number>();
                this.Splice(resultsLength, 0).Concat(applyArray);
            }

            return array;
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
            if (IsNull(source)){
                this.Splice(0, this.Length());
                return this.Length();
            }

            Convert<T>(source).forEach(element => {
                this.Push(element);
            });

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
            var compiledFunction = CompileExpression(predicate);
            var results = new IArray<T>();
            const length: number = this.Length();
            for (var index = 0; index < length; index++)
            if (compiledFunction(this[index]) !== true)
                results.Push(this[index]);
            return results;
        }

        public Slice(start?: number, end?: number): IArray<T> {
            return Convert<T>(this.ToArray().slice(start, end));
        }

        public Sort(predicate?: Function): IArray<T> {
            return this.OrderBy(predicate);
        }

        // // results = [1, 2, 3, 4];
        // // matches = [1, 2, 3];
        // // results.splice.apply(results, [results.length, 0].concat(matches));
        // // results ... (7) [1, 2, 3, 4, 1, 2, 3]
        // public Splice(start: number, deleteCount: number): IArray<T> {
        //     let results: Array<T> = this.ToArray();
        //     const length: number = results.length;
        //     let items: Array<number> = [length, 0].concat(new Array<number>());
        //     if (IsNull(items))
        //         results = results.splice(start, deleteCount);
        //     else
        //         results = results.splice(start, deleteCount, items);
        //     return Convert<T>(results);
        // };

        // results = [1, 2, 3, 4];
        // matches = [1, 2, 3];
        // results.splice.apply(results, [results.length, 0].concat(matches));
        // results ... (7) [1, 2, 3, 4, 1, 2, 3]
        public Splice(start: number, deleteCount: number, ...items: any): IArray<T> {
            let results: Array<number> = this.Cast<number>();
            const length: number = results.length;
            let mergeItems: IArray<number> = Convert<number>(items);
            mergeItems = Convert<number>([length, <number>0].concat(new Array<number>()));
            if (IsNull(mergeItems))
                results = results.splice.apply(results, start, deleteCount);
            else
                results = results.splice.apply(mergeItems, start, deleteCount);
            return Convert<T>(results);
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
            var compiledFunction = CompileExpression(predicate!);
            const results: IArray<T> = new IArray<T>();
            const length: number = this.Length();
            for (let index: number = 0; index < length; index++) {
                const item = this[index];
                if (compiledFunction(item) !== true) return results;
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
            const compiledFunction: Function = CompileExpression(predicate);
            for (var index = 0; index < length; index++)
                if (compiledFunction(this[index]) === true)
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
            const length: number = instanceIArray.Length();
            let compiledFunction: Function = CompileExpression(predicate);
            const sourceIArray: IArray<any> = Convert<any>(source);
            const sourceLength: number = sourceIArray.Length();
            const results: IArray<any> = new IArray<any>();
            for (var index = 0; index < length; index++) {
                if (sourceLength <= index) return results;
                const result: any = compiledFunction(instanceIArray[index], sourceIArray[index])
                results.Push(result);
            }
            return results;
        }
    }
}