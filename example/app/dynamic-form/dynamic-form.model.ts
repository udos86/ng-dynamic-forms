import {
    DynamicFormModel,
    DynamicFormCheckboxModel,
    DynamicFormTextInputModel,
    DynamicFormRadioModel
} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_MODEL = new DynamicFormModel([

    new DynamicFormRadioModel<string>({

        id: "exampleOption",
        label: "Example Option",
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
                selected: true,
                text: "Option 3",
                value: "option-3"
            }
        ]
    }),
    
    new DynamicFormTextInputModel({

        hideLabel: true,
        id: "exampleInput",
        label: "Example Input",
        maxLength: 51,
        placeholder: "example input",
    }),

    new DynamicFormCheckboxModel({

        hideLabel: true,
        id: "exampleCheckbox",
        label: "I do agree",
        text: "I do agree"
    })
]);
