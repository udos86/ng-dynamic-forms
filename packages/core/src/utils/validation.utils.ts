export class ValidationUtils {

    static isDynamicValidatorDescriptor(value: any): boolean {

        if (value && typeof value === "object") {
            return value.hasOwnProperty("name") && value.hasOwnProperty("args");
        }

        return false;
    }
}