/**
 * Created by Jack on 6/29/2014.
 * Updated by Ryan Mauldin on 2/26/2020
 */

interface Array<T> {
    Aggregate(func: Function): T;
    All(predicate?: Function): boolean;
    Any(predicate?: Function): boolean;
    average(): number;
    contains(value: any): boolean;
    count(predicate?: Function): number;
    distinct(): Array<T>;
    elementAt(index: number): any;
    elementAtOrDefault(index: number): any;
    except(array: Array<T>): Array<T>;
    first(predicate?: Function): any;
    firstOrDefault(predicate?: Function): any;
    groupBy(predicate: Function, keyName: string, valName: string): Array<T>;
    groupJoin(inner: Array<T>, outerKey: Function, innerKey: Function, zipFn: Function);
    innerJoin(inner: Array<T>, outerKey: Function, innerKey: Function, zipFn: Function);
    intersect(array: Array<T>): Array<T>;
    last(predicate?: Function): any;
    lastOrDefault(predicate: Function): any;
    max(selector: Function): number;
    min(selector: Function): number;
    orderBy(selector: Function): Array<T>;
    orderByDescending(selector: Function): Array<T>;
    select(selector: Function): Array<any>;
    selectMany(selector: Function): Array<any>;
    sequenceEqual(array: Array<T>): boolean;
    single(): any;
    singleOrDefault(): any;
    skip(index: number): Array<T>;
    skipWhile(predicate: Function): Array<T>;
    sum(): number;
    take(count: number): Array<T>;
    takeWhile(predicate: Function): Array<T>;
    union(array: Array<T>): Array<T>;
    where(predicate: Function): Array<T>;
    Zip(secondSequence: Array<T>, zipFunction: Function): Array<T>;
}