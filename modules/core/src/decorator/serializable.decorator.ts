declare let Reflect;

export const METADATA_KEY_SERIALIZABLE = "SERIALIZABLE";

export interface SerializableProperty {

    key: string;
    name: string;
}

export function serializable(name?: string): (target, key) => void {

    return function (target, key) {
        Reflect.defineMetadata(METADATA_KEY_SERIALIZABLE, {key: key, name: name || key}, target, key);
    };
}

export function getSerializables(target): SerializableProperty[] {

    let serializables = [];

    for (let key in target) {

        let metadata = Reflect.getMetadata(METADATA_KEY_SERIALIZABLE, target, key);

        if (metadata) {
            serializables.push(metadata);
        }
    }

    return serializables;
}

export function serialize(target, prototype?): Object {

    return getSerializables(prototype || target).reduce((prev, prop: SerializableProperty) => {

        prev[prop.name] = target[prop.key];

        return prev;

    }, {});
}