namespace ts {
    export function Enumerator(source: any, func: Function) {
        if (IsNull(source) || IsNull(func)) return;
        const length: number = source.length;
        if (IsIArray<any>(source) || IsArray<any>(source) || IsArrayLike<any>(source) || IsIterable<any>(source)){
            for (var index = 0; index < length; index++)
                if (func(source[index], index) === false) return;
        }
        else {
            for (var key in source)
                if (func(source[key], key) === false) return;
        }
    };
}