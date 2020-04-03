import { ContainsValue, IsNull, IsArray, IsArrayLike, IsFunction, IsIArray, IsIterable } from "./GlobalComparison";
import { Enumerator } from "./GlobalEnumerator";
import { ArrayTs } from "../classes/ArrayTs";

export function Convert<T>(source: any): IArray<T> {
    if (IsNull(source)) return <IArray<T>>(new ArrayTs<T>());

    if (IsIArray<any>(source)) {
        // Try to cast individual elements.
        const sourceAnyIArray: IArray<any> = <IArray<any>>source;
        if (sourceAnyIArray.IsIArrayInstance<any>()) {
            const sourceIArray: IArray<T> = ConvertIArray<any>(sourceAnyIArray).Cast<T>()
            if (sourceIArray.IsIArrayInstance() && sourceIArray.IsArrayInstance<T>())
                return sourceIArray;

            throw new Error("InvalidArgument: source has an unexpected value.");
        }

        // Try to cast whole type.
        return <IArray<T>>(<IArray<any>>source);
    }

    if (IsArray<any>(source)) {
        // Try to cast individual elements.
        const sourceAnyArray: Array<any> = <Array<any>>source;
        if (IsArray<any>(sourceAnyArray)) {
            const sourceIArray: IArray<T> = ConvertArray<any>(sourceAnyArray).Cast<T>()
            if (sourceIArray.IsIArray() && sourceIArray.IsArrayInstance<T>())
                return sourceIArray;

            throw new Error("InvalidArgument: source has an unexpected value.");
        }

        // Try to cast whole type.
        return <IArray<T>>(<IArray<any>>source);
    }

    if (IsArrayLike<any>(source)) {
        // Try to cast individual elements.
        const sourceAnyArray: ArrayLike<any> = <ArrayLike<any>>source;
        if (IsArrayLike<any>(sourceAnyArray)) {
            const sourceIArray: IArray<T> = ConvertArrayLike<any>(sourceAnyArray).Cast<T>()
            if (sourceIArray.IsIArray() && sourceIArray.IsArrayInstance<T>())
                return sourceIArray;

            throw new Error("InvalidArgument: source has an unexpected value.");
        }

        // Try to cast whole type.
        return <IArray<T>>(<IArray<any>>source);
    }

    if (IsIterable<any>(source)) {
        // Try to cast individual elements.
        const sourceAnyArray: Iterable<any> = <Iterable<any>>source;
        if (IsIterable<any>(sourceAnyArray)) {
            const sourceIArray: IArray<T> = ConvertIterable<any>(sourceAnyArray).Cast<T>();
            if (sourceIArray.IsIArray() && sourceIArray.IsArrayInstance<T>())
                return sourceIArray;

            throw new Error("InvalidArgument: source has an unexpected value.");
        }

        // Try to cast whole type.
        return <IArray<T>>(<IArray<any>>source);
    }

    if (typeof source === "object") {
        // Try to clone object keys.
        const sourceIArray: IArray<T> = ConvertObject<any>(source).Cast<T>();
        if (sourceIArray.IsIArray() && sourceIArray.IsArrayInstance<T>())
            return sourceIArray;
        
        throw new Error("InvalidArgument: source has an unexpected value.");
    }

    throw new Error("InvalidArgument: source has an unexpected value.");
};

export function ConvertIArray<T>(source?: IArray<T>): IArray<T> {
    if (IsNull(source)) return <IArray<T>>(new ArrayTs<T>());
    return <IArray<T>>source;
};

export function ConvertArray<T>(source?: Array<T>): IArray<T> {
    if (IsNull(source)) return <IArray<T>>(new ArrayTs<T>());
    const sourceAnyArray: Array<T> = <Array<T>>source;
    const sourceIArray: IArray<T> = <IArray<T>>(new ArrayTs<T>());
    for (var index = 0; index < sourceAnyArray.length; index++) {
        const element: any = sourceAnyArray[index];
        sourceIArray.push(<T>element);
    }
    return sourceIArray;
};

export function ConvertArrayLike<T>(source?: ArrayLike<T>): IArray<T> {
    if (IsNull(source)) return <IArray<T>>(new ArrayTs<T>());
    const sourceAnyArray: ArrayLike<T> = <ArrayLike<T>>source;
    const sourceIArray: IArray<T> = <IArray<T>>(new ArrayTs<T>());
    for (var index = 0; index < sourceAnyArray.length; index++) {
        const element: any = sourceAnyArray[index];
        sourceIArray.push(<T>element);
    }
    return sourceIArray;
};

export function ConvertIterable<T>(source?: Iterable<T>): IArray<T> {
    if (IsNull(source)) return <IArray<T>>(new ArrayTs<T>());
    const sourceAnyArray: Iterable<T> = <Iterable<T>>source;
    const sourceIArray: IArray<T> = new ArrayTs<T>();
    for (var element of sourceAnyArray)
        sourceIArray.push(<T>element);
    return sourceIArray;
};

export function ConvertObject<T>(source: any): IArray<T> {
    if (IsNull(source)) return <IArray<T>>(new ArrayTs<T>());
    // Try to clone object keys.
    const results: IArray<T> = new ArrayTs<T>();
    Enumerator(source, function(element: any, key: any) {
        results[key] = <any>element;
    });
    return results;
};

export function DeepClone<T>(source: any): any {
    if (IsNull(source)) return source;

    const sourceType: string = typeof source!;
    if (IsNull(sourceType) || IsFunction(source!) || source! instanceof Date
        || ContainsValue(["string", "number", "boolean"], sourceType!))
        return source!;

    if (sourceType! === "object") {
        var result = new Array<any>();

        Enumerator(source!, function(value: any) {
            var sourceClone = DeepClone(value);
            result.push(sourceClone);
            return true;
        });

        return result;
    }

    return source!;
};

// Comparison and compilation expressions
export function GetGenericType<T>(): string {
    const genericType: T = <T>{};
    return typeof genericType;
};