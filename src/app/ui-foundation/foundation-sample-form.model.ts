import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicFormArrayModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicSwitchModel,
    DynamicTextAreaModel,
} from "@ng-dynamic-forms/core";
import { customValidator } from "../app.validators";

export const FOUNDATION_SAMPLE_FORM_MODEL = [

    new DynamicSelectModel<string>({

        id: "foundationSelect",
        label: "Select",
        options: [
            {
                label: "Option 1",
                value: "option-1",
            },
            {
                disabled: true,
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

    new DynamicRadioGroupModel<string>({

        id: "foundationRadioGroup",
        label: "Radio Group",
        options: [
            {
                label: "Option 1",
                value: "option-1",
            },
            {
                disabled: true,
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

    new DynamicInputModel({

        hint: "Just a sample help text",
        id: "foundationInput",
        label: "Input",
        mask: ["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
        maxLength: 51,
        // placeholder: "example input",
        prefix: "Prefix",
        suffix: "Suffix",
        validators: {
            required: null
        },
        errorMessages: {
            required: "{{label}} is required"
        }
    }),

    new DynamicCheckboxGroupModel({

        id: "foundationCheckboxGroup",
        label: "Checkbox Group",
        group: [
            new DynamicCheckboxModel({

                id: "foundationCheckbox1",
                label: "Checkbox 1",
                value: true
            }),
            new DynamicCheckboxModel({

                id: "foundationCheckbox2",
                label: "Checkbox 2"
            })
        ]
    }),

    new DynamicSwitchModel({

        id: "foundationSwitch",
        label: "Switch",
        offLabel: "Off",
        onLabel: "On",
        value: false
    }),

    new DynamicTextAreaModel({

        id: "foundationTextArea",
        label: "Textarea",
        rows: 5,
        placeholder: "example Textarea",
        validators: {
            required: null,
            pattern: "[a-c]+",
            customValidator: {
                name: customValidator.name,
                args: null
            }
        },
        errorMessages: {
            required: "{{label}} is required",
            pattern: "{{label}} does not match pattern {{validator.requiredPattern}}",
            customValidator: "Test Test"
        }
    }),

    new DynamicCheckboxModel({

        id: "foundationCheckbox",
        label: "I do agree"
    }),

    new DynamicFormArrayModel({

        id: "foundationFormArray",
        initialCount: 5,
        label: "Form Array",
        groupFactory: () => {
            return [
                new DynamicInputModel({

                    id: "foundationFormArrayGroupInput",
                    placeholder: "example array group input"
                })
            ];
        }
    })
];
