import {
    DynamicFormModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
} from "@ng2-dynamic-forms/core";

export const MATERIAL_EXAMPLE_MODEL: DynamicFormModel = new DynamicFormModel([

    new DynamicInputModel({
        
        id: "materialInput",
        label: "Example Input",
        maxLength: 51,
        placeholder: "example input"
    }),

    new DynamicRadioGroupModel<string>({

        id: "materialRadioGroup",
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

    new DynamicCheckboxModel({
        
        id: "materialCheckbox",
        label: "I do agree"
    })
]);
