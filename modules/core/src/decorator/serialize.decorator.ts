declare var Reflect: any;

export const METADATA_KEY_SERIALIZABLE = "SERIALIZABLE";

export interface SerializableProperty {

    key: string;
    name: string;
}

export function serializable(name?: string) {

    return function (context, key) {

        var serializable = Reflect.getMetadata(METADATA_KEY_SERIALIZABLE, context) || [];

        serializable.push({key: key, name: name || key});

        Reflect.defineMetadata(METADATA_KEY_SERIALIZABLE, serializable, context);
    };
}

export function getSerializable(context): Array<SerializableProperty> {

    return Reflect.getMetadata(METADATA_KEY_SERIALIZABLE, context) || [];
}