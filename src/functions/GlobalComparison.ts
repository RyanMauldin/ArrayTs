namespace ts {
  // Validation expressions
  export function IsNull(value?: any): boolean {
    return typeof value === "undefined" || value === null;
  };

  export function IsNullOrEmpty(value?: any): boolean {
    return typeof value === "undefined" || value === null || value!.length <= 0;
  };

  export function IsArray<T>(source?: any): boolean {
    return !IsNull(source) && Array.isArray(source!)
      && GetGenericType<T>() === Convert<T>(source!).GetGenericType();
  };

  export function IsArrayLike<T>(source?: any): source is ArrayLike<T> {
    return !IsNull(source)
      && GetGenericType<T>() === (source!).GetGenericType();
  }

  export function IsIArray<T>(source?: any): boolean {
    return !IsNull(source) && source! instanceof IArray
      && GetGenericType<T>() === (source!).GetGenericType();
  };

  export function IsIterable<T>(source?: any): source is Iterable<T> {
    return !IsNull(source)
      && GetGenericType<T>() === (source!).GetGenericType();
  }

  export function IsFunction(func?: any): boolean {
    return !IsNull(func) && typeof func! === "function";
  };

  export function Contains(source?: any, value?: any): boolean {
    if (IsNull(source)) return false;

    if (IsIArray<any>(source!))
      for (let element of (<IArray<any>>source!))
        if (Compare(element, value) === 0) return true;

    if (IsArray<any>(source!))
      for (let element of (<Array<any>>source!))
        if (Compare(element, value) === 0) return true;

    if (typeof source! === "object") {
      const result: Array<any> = new Array<any>();

      Enumerator(source!, function(element: any, key: any) {
        var sort = Compare(element, value);
        result.push(sort);
        if (sort === -1) return false;
      });

      return result.reduce(function(previous: any, current: any) {
        if (previous === current) return previous;
        var sum = previous + current;
        return sum === 0 ? -1 : sum;
      });
    }

    return Compare(source!, value) === 0;
  };

  export function Compare(source: any, target: any): number {
    const sourceType: string = typeof source;
    const targetType: string = typeof target;
    if (sourceType === "undefined" || targetType === "undefined")
      return sourceType === "undefined" ? -1 : targetType === "undefined" ? 1 : 0;

    if (sourceType !== targetType)
      throw new Error("ArgumentException: both objects must be of the same type.");

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
      var result = new Array<any>();

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
  };
}