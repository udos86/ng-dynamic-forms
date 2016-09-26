declare var Reflect:any;

export const METADATA_KEY_SERIALIZABLE = "SERIALIZABLE";

export function serializable(context, key) {

    var serializable = Reflect.getMetadata(METADATA_KEY_SERIALIZABLE, context) || [];

    serializable.push(key);

    Reflect.defineMetadata(METADATA_KEY_SERIALIZABLE, serializable, context);
}

export function getSerializable (context): Array<string> {

    return Reflect.getMetadata(METADATA_KEY_SERIALIZABLE, context) || [];
}