namespace ts {
    export interface IArrayConstructor extends ArrayConstructor {
      
      [Symbol.species]: IArrayConstructor;
      (): IArray<any>;
      <T>(): IArray<T>;
      <T>(arrayLength?: number): IArray<any>;
      <T>(source: IArray<T>): IArray<T>;
      <T>(source: Array<T>): IArray<T>;
      (source: any): IArray<any>;
      (...args: any): IArray<any>;
      new (): IArray<any>;
      new <T>(): IArray<T>;
      new <T>(arrayLength?: number): IArray<T>;
      new <T>(source: IArray<T>): IArray<T>;
      new <T>(source: Array<T>): IArray<T>;
      new <T>(source: any): IArray<T>;
      new <T>(...source: any): IArray<T>;
      IsArray<T>(): this is Array<T>;
      IsIArray<T>(): this is IArray<T>;
    }
}