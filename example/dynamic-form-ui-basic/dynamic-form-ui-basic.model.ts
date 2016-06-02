import {
    DynamicFormModel,
    DynamicFormCheckboxModel,
    DynamicFormTextInputModel,
    DynamicFormRadioModel
} from "@ng2-dynamic-forms/core";


export const DYNAMIC_FORM_UI_BASIC_MODEL = new DynamicFormModel([

    new DynamicFormRadioModel<string>({

        id: "subject",
        label: "Subject",
        options: [
            {
                text: "Biology",
                value: "biology",
            },
            {
                disabled: true,
                text: "German",
                value: "german"
            },
            {
                selected: true,
                text: "Math",
                value: "math"
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
