import { DynamicInputModel } from "@ng-dynamic-forms/core";
import { customValidator } from "../app.validators";

export const ASYNC_SAMPLE_FORM_MODEL = [

    new DynamicInputModel({

        id: "asyncInput",
        label: "Sample Async Input",
        validators: {
            customValidator: {
                name: customValidator.name,
                args: null
            }
        },
        errorMessages: {
            customValidator: "Invalid"
        }
    })
];