import {
    DynamicFormModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicRadioModel,
    DynamicSelectModel,
    DynamicTextAreaModel,
} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_MODEL: DynamicFormModel = new DynamicFormModel([

    new DynamicSelectModel<string>({

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
    
    new DynamicInputModel({

        id: "exampleInput",
        label: "Example Input",
        maxLength: 51,
        placeholder: "example input"
    }),

    new DynamicTextAreaModel({

        id: "exampleTextArea",
        label: "Example Textarea",
        rows: 5,
        placeholder: "example Textarea",
    }),

    new DynamicCheckboxModel({

        hideLabel: true,
        id: "exampleCheckbox",
        label: "I do agree",
        text: "I do agree"
    })
]);
