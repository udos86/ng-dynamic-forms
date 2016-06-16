import {
    DynamicFormModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicTextAreaModel,
} from "@ng2-dynamic-forms/core";

export const BASIC_EXAMPLE_MODEL: DynamicFormModel = new DynamicFormModel([

    new DynamicSelectModel<string>({

        id: "basicSelect",
        label: {
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
            }
        ],
        value: "option-3"
    }),
    
    new DynamicInputModel({

        id: "basicInput",
        label: {
            text: "Example Input"
        },
        maxLength: 51,
        placeholder: "example input"
    }),

    new DynamicTextAreaModel({

        id: "basicTextArea",
        label: {
            text: "Example Textarea"
        },
        rows: 5,
        placeholder: "example Textarea",
    }),

    new DynamicCheckboxModel({

        id: "basicCheckbox",
        label: {
            text:  "I do agree"
        }
    })
]);
