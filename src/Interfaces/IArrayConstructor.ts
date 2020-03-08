namespace ts {
    export interface IArrayConstructor {
      new <T>(): IArray<T>;
      new <T>(length?: number): IArray<T>;
      new <T>(...source: any): IArray<T>;
      (): IArray<any>;
      <T>(length?: number): IArray<T>;
      <T>(...source: any): IArray<T>;
      IsArray(args?: any): args is IArray<any>;
      readonly prototype: IArray<any>;
    }
}