declare let Reflect: any;

export const METADATA_KEY_SERIALIZABLE = "SERIALIZABLE";

export interface SerializableProperty {

    key: string;
    name: string;
}

export function serializable(name?: string): (target: any, key: string) => void {

    return function (target, key) {
        Reflect.defineMetadata(METADATA_KEY_SERIALIZABLE, {key: key, name: name || key}, target, key);
    };
}

export function getSerializables(target: any): SerializableProperty[] {

    let serializables = [];

    for (let key in target) {

        let metadata = Reflect.getMetadata(METADATA_KEY_SERIALIZABLE, target, key);

        if (metadata) {
            serializables.push(metadata);
        }
    }

    return serializables;
}

export function serialize(target: any, prototype?: any): Object {

    return getSerializables(prototype || target).reduce((prev: any, prop: SerializableProperty) => {

        prev[prop.name] = target[prop.key];

        return prev;

    }, {});
}