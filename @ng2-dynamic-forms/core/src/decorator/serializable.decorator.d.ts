/// <reference types="core-js" />
export declare const METADATA_KEY_SERIALIZABLE: string;
export interface SerializableProperty {
    key: string;
    name: string;
}
export declare function serializable(name?: string): (target: any, key: any) => void;
export declare function getSerializables(target: any): Array<SerializableProperty>;
