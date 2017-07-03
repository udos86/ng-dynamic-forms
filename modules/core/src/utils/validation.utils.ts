import { AbstractControl } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { Utils } from "./core.utils";

export class ValidationUtils {

    static createErrorMessages(control: AbstractControl, model: DynamicFormControlModel) {

        return Object.keys(control.errors || {}).map(errorCode => {

            let error = control.getError(errorCode),
                message = `Validation error: ${errorCode}`,
                messageKey = Utils.equals(errorCode, "minlength", "maxlength") ? errorCode.replace("length", "Length") : errorCode;

            if (model.errorMessages.hasOwnProperty(messageKey)) {

                message = (model.errorMessages[messageKey] as string).replace(/\{\{\s*(.+?)\s*\}\}/mg,
                    (match: string, expression: string) => {

                        let propertySource: any = model,
                            propertyName: string = expression;

                        if (expression.indexOf("validator.") >= 0) {

                            propertySource = error;
                            propertyName = expression.replace("validator.", "");
                        }

                        return propertySource[propertyName] ? propertySource[propertyName] : null;
                    });
            }

            return message;
        });
    }

    static isValidatorConfig(value: any): boolean {

        if (Utils.isTrueObject(value)) {
            return value.hasOwnProperty("name") && value.hasOwnProperty("args");
        }

        return false;
    }
}