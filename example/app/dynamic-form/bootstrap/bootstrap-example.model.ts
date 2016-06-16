import {
    DynamicFormModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioModel,
    DynamicTextAreaModel,
} from "@ng2-dynamic-forms/core";

export const BOOTSTRAP_EXAMPLE_MODEL: DynamicFormModel = new DynamicFormModel([

    new DynamicSelectModel<string>({

        cls: "col-sm-9",
        id: "bootstrapSelect",
        label: {
            cls: "control-label col-sm-3",
            text: "Example Option"
        },
        options: [
            {
                text: "Option 1",
                value: "option-1",
            },
            {
                disabled: true,
                text: "Option 2",
                value: "option-2"
            },
            {
                text: "Option 3",
                value: "option-3"
            },
            {
                text: "Option 4",
                value: "option-4"
            }
        ],
        value: "option-3"
    }),
    
    new DynamicInputModel({

        cls: "col-sm-9",
        id: "bootstrapInput",
        label: {
            cls: "control-label col-sm-3",
            text: "Example Input"
        },
        maxLength: 51,
        placeholder: "example input",
        prefix: "Prefix",
        suffix: "Suffix"
    }),

    new DynamicTextAreaModel({

        cls: "col-sm-9",
        id: "bootstrapTextArea",
        label: {
            cls: "control-label col-sm-3",
            text: "Example Textarea"
        },
        rows: 5,
        placeholder: "example Textarea",
    }),

    new DynamicCheckboxModel({
        
        cls: "col-sm-offset-3 col-sm-9",
        id: "bootstrapCheckbox",
        label: {
            text:  "I do agree"
        }
    })
]);
