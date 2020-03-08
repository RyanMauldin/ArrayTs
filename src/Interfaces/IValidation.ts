namespace ts {
    // Comparison and compilation expressions

  export function IsNull(value?: any): boolean {
    return typeof value === "undefined" || value === null;
  };

  export function IsNullOrEmpty(value?: any): boolean {
    return typeof value === "undefined" || value === null || value!.length <= 0;
  };

  export function GetGenericType<T>(): string {
    const genericType: T = <T>{};
    return typeof genericType;
  };

  export function IsArray(source?: any): boolean {
    return Array.isArray(source);
  };

  export function IsIArray<T>(source?: any): boolean {
    return !IsNull(source) && source! instanceof IArray
      && GetGenericType<T>() === (<IArray<T>>source!).GetGenericType();
  };

  export function IsFunction(func?: any): boolean {
    return !IsNull(func) && typeof func! === "function";
  };

  export function Contains(source?: any, value?: any): boolean {
    if (IsNull(source)) return false;

    if (IsIArray(source!))
      for (let element of (<IArray<any>>source!))
        if (Compare(element, value) === 0) return true;

    if (IsArray(source!))
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

  export function CompileExpression(expression: any): Function {
    if (IsNull(expression))
      throw new Error("ArgumentNullException: expression has no value.");
    if (IsFunction(expression!)) return expression;
    const expressionType: string = typeof expression!;
    if (Contains(["number", "object"], expressionType))
      throw new Error("ArgumentException: expression is of unexpected type.");

    var parts = expression!.split("=>");
    var args = parts.length > 0 ? parts.shift().trim().replace(/\(|\)/g, "") : null;
    var func = parts.length > 0 ? parts.join("=>").trim() : null;

    if (IsNull(args) || IsNull(func))
      throw new Error("ArgumentException: expression is invalid.");

    return new Function(args, "return (" + func + ");");
  };

  export function Enumerator(source: any, func: Function) {
    const length: number = source.length;
    if (IsArray(source))
      for (var index = 0; index < length; index++)
        if (func(source[index], index) === false) return;
        else for (var key in source)
          if (func(source[key], key) === false) return;
  };

  export function Convert<T>(source: any): IArray<T> {
    if (IsNull(source)) return new IArray<T>();
    if (IsIArray<T>(source) || IsArray(source) || source.IsArray()) return <IArray<T>>source;
    const results: IArray<T> = new IArray<T>();

    if (typeof source === "object") {
      const arrayResults: Array<T> = new Array<T>();

      Enumerator(source, function(element: any, key: any) {
        arrayResults[key] = <T>element;
      });
      
      for(const element of arrayResults)
        results.Push(<T>element);

      return results;
    }

    throw new Error("InvalidArgument: value has an unexpected value.");
  };

  export function GetProperty<T extends IDictionary<K>, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  export function SetProperty<T extends IDictionary<K>, K extends keyof T>(obj: T, key: K, value: any): void {
    obj[key] = value;
  }
}