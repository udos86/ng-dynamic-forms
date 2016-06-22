import {
    DynamicFormModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicTextAreaModel,
} from "@ng2-dynamic-forms/core";

export const EXAMPLE_MODEL: DynamicFormModel = new DynamicFormModel([

    new DynamicSelectModel<string>({

        id: "exampleSelect",
        label: {
            text: "Example Select"
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

        id: "exampleInput",
        label: {
            text: "Example Input"
        },
        maxLength: 51,
        placeholder: "example input"
    }),

    new DynamicRadioGroupModel<string>({

        cls: {
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            },
            label: "control-label"
        },
        id: "exampleRadioGroup",
        label: {
            text: "Example Radio Group"
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

    new DynamicTextAreaModel({

        id: "exampleTextArea",
        label: {
            text: "Example Textarea"
        },
        rows: 5,
        placeholder: "example Textarea",
    }),

    new DynamicCheckboxModel({

        id: "exampleCheckbox",
        label: {
            text:  "I do agree"
        }
    })
]);
