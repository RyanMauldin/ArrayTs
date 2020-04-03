import { IDictionary } from "../interfaces/IDictionary"; 

export function GetProperty<T extends IDictionary<K>, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

export function SetProperty<T extends IDictionary<K>, K extends keyof T>(obj: T, key: K, value: any): void {
    obj[key] = value;
}