declare var Reflect: any;

export const METADATA_KEY_PREFIX_SERIALIZABLE = "SERIALIZABLE";

export interface SerializableProperty {

    key: string;
    name: string;
}

export function getSerializableMetadataKey(target): string {
    return `${METADATA_KEY_PREFIX_SERIALIZABLE}_${target.constructor.name.toUpperCase()}`;
}

export function serializable(name?: string) {

    return function (target, key) {

        let metadataKey = getSerializableMetadataKey(target),
            serializable = Reflect.getMetadata(metadataKey, target) || [];

        serializable.push({key: key, name: name || key});

        Reflect.defineMetadata(metadataKey, serializable, target);
    };
}

export function getSerializables(target): Array<SerializableProperty> {

    let serializables = [],
        prototype = Object.getPrototypeOf(target);

    while (prototype) {

        serializables.push(...Reflect.getMetadata(getSerializableMetadataKey(prototype), prototype) || []);
        prototype = Object.getPrototypeOf(prototype);
    }

    return serializables;
}