import {
    DynamicFormModel,
    DynamicFormCheckboxModel,
    DynamicFormTextInputModel,
    DynamicFormRadioModel
} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_MODEL = new DynamicFormModel([

    new DynamicFormRadioModel<string>({

        id: "subject",
        label: "Subject",
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
        id: "grade",
        label: "Grade",
        maxLength: 51,
        placeholder: "Grade",
    }),

    new DynamicFormCheckboxModel({

        hideLabel: true,
        id: "agreement",
        label: "I do agree",
        text: "I do agree"
    })
]);
