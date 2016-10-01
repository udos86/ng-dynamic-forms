declare var Reflect: any;

export const METADATA_KEY_SERIALIZABLE = "SERIALIZABLE";

export interface SerializableProperty {

    key: string;
    name: string;
}

export function serializable(name?: string) {

    return function (target, key) {

        Reflect.defineMetadata(METADATA_KEY_SERIALIZABLE, {key: key, name: name || key}, target, key);
    };
}

export function getSerializables(target): Array<SerializableProperty> {

    let serializables = [];

    for (let key in target) {

        let metadata = Reflect.getMetadata(METADATA_KEY_SERIALIZABLE, target, key);

        if (metadata) {
            serializables.push(metadata);
        }
    }

    return serializables;
}