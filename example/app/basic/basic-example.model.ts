import {
    DynamicFormModel,
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicTextAreaModel,
} from "@ng2-dynamic-forms/core";

export const BASIC_EXAMPLE_MODEL: DynamicFormModel = new DynamicFormModel([

    new DynamicSelectModel<string>({

        id: "basicSelect",
        label: "Example Select",
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
        label: "Example Input",
        maxLength: 51,
        placeholder: "example input"
    }),

    new DynamicCheckboxGroupModel(
        {
            id: "basixCheckboxGroup",
            items: [
                new DynamicCheckboxModel({

                    id: "checkboxGroup1",
                    label: "Checkbox 1"
                }),
                new DynamicCheckboxModel({

                    id: "checkboxGroup2",
                    label: "Checkbox 2"
                })
            ],
            label: "Example Checkbox Group"
        }
    ),

    new DynamicRadioGroupModel<string>({

        id: "basicRadioGroup",
        label: "Example Radio Group",
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

        id: "basicTextArea",
        label: "Example Textarea",
        rows: 5,
        placeholder: "example Textarea",
    }),

    new DynamicCheckboxModel({

        id: "basicCheckbox",
        label: "I do agree"
    })
]);
