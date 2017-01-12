import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicSwitchModel,
    DynamicTextAreaModel,
} from "@ng2-dynamic-forms/core";

export const SEMANTIC_EXAMPLE_MODEL = [

    new DynamicSelectModel<string>(
        {
            id: "semanticSelect",
            label: "Example Select",
            options: [
                {
                    label: "Option 1",
                    value: "option-1",
                },
                {
                    label: "Option 2",
                    value: "option-2"
                },
                {
                    label: "Option 3",
                    value: "option-3"
                },
                {
                    label: "Option 4",
                    value: "option-4"
                }
            ],
            value: "option-3"
        }
    ),

    new DynamicInputModel({

        id: "semanticInput",
        label: "Example Input",
        placeholder: "example input",
        validators: {
            required: null
        },
        errorMessages: {
            required: "Field is required"
        }
    }),

    new DynamicSwitchModel({

        id: "semanticSwitch",
        label: "Example Switch",
        value: true
    }),

    new DynamicRadioGroupModel<string>({

        id: "semanticRadioGroup",
        label: "Example Radio Group",
        options: [
            {
                label: "Option 1",
                value: "option-1",
            },
            {
                label: "Option 2",
                value: "option-2"
            },
            {
                label: "Option 3",
                value: "option-3"
            },
            {
                label: "Option 4",
                value: "option-4"
            }
        ],
        value: "option-3"
    }),

    new DynamicTextAreaModel({

        id: "semanticTextArea",
        label: "Example Textarea",
        rows: 1,
        placeholder: "example Textarea"
    }),

    new DynamicCheckboxModel({

        id: "semanticCheckbox",
        label: "I do agree"
    })
];