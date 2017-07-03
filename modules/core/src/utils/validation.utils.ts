import { Utils } from "./core.utils";

export class ValidationUtils {

    static isValidatorConfig(value: any): boolean {

        if (Utils.isTrueObject(value)) {
            return value.hasOwnProperty("name") && value.hasOwnProperty("args");
        }

        return false;
    }
}