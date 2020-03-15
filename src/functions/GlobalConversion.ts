namespace ts {
    export function Convert<T>(source: any): IArray<T> {
        if (IsNull(source)) return new IArray<T>();

        if (IsIArray<any>(source)) {
            // Try to cast individual elements.
            const sourceAnyIArray: IArray<any> = <IArray<any>>source;
            if (sourceAnyIArray.IsIArray<any>()) {
                const sourceIArray: IArray<T> = sourceAnyIArray.Cast<T>();
                return sourceIArray;
            }

            // Try to cast whole type.
            return <IArray<T>>(<IArray<any>>source);
        }

        if (IsArray<any>(source)) {
            // Try to cast individual elements.
            const sourceAnyArray: Array<any> = <Array<any>>source;
            if (IsArray<any>(sourceAnyArray)) {
                const sourceIArray: IArray<T> = new IArray<T>();
                for (var index = 0; index < sourceAnyArray.length; index++) {
                    const element: any = sourceAnyArray[index];
                    sourceIArray.push(<T>element);
                }

                if (sourceIArray.IsIArray() && sourceIArray.IsArray<T>())
                    return sourceIArray;

                throw new Error("InvalidArgument: source has an unexpected value.");
            }

            // Try to cast whole type.
            return <IArray<T>>(<IArray<any>>source);
        }
    
        // Try to clone object keys.
        const results: IArray<T> = new IArray<T>();

        if (typeof source === "object") {
            Enumerator(source, function(element: any, key: any) {
            results[key] = <any>element;
        });

        return results;
        }

        throw new Error("InvalidArgument: source has an unexpected value.");
    };

    export function DeepClone<T>(source: any): any {
        if (IsNull(source)) return source;

        const sourceType: string = typeof source!;
        if (IsNull(sourceType) || IsFunction(source!) || source! instanceof Date
            || Contains(["string", "number", "boolean"], sourceType!))
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
}