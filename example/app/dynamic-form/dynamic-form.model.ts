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

        cls: "col-sm-10",
        id: "exampleOption",
        label: {
            cls: "control-label col-sm-2",
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
                selected: true,
                text: "Option 3",
                value: "option-3"
            }
        ]
    }),
    
    new DynamicInputModel({

        cls: "col-sm-10",
        id: "exampleInput",
        label: {
            cls: "control-label col-sm-2",
            text: "Example Input"
        },
        maxLength: 51,
        placeholder: "example input"
    }),

    new DynamicTextAreaModel({

        cls: "col-sm-10",
        id: "exampleTextArea",
        label: {
            cls: "control-label col-sm-2",
            text: "Example Textarea"
        },
        rows: 5,
        placeholder: "example Textarea",
    }),

    new DynamicCheckboxModel({
        
        cls: "col-sm-offset-2 col-sm-10",
        id: "exampleCheckbox",
        label: {
            text:  "I do agree"
        },
        text: "I do agree"
    })
]);
