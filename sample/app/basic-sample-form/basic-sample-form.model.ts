import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicTextAreaModel,
    DynamicFormArrayModel,
    DynamicFormGroupModel
} from "@ng-dynamic-forms/core";
import { customValidator } from "../app.validators";

export const BASIC_SAMPLE_FORM_MODEL = [

    new DynamicSelectModel<string>({

        id: "basicSelect",
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
            }
        ],
        value: "option-1"
    }),

    new DynamicInputModel({

        id: "basicInput",
        hint: "Just a hint",
        label: "Input",
        list: ["One", "Two", "Three", "Four", "Five"],
        //mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        maxLength: 51,
        placeholder: "example input",
        spellCheck: false,
        required: false,
        validators: {
            required: null,
            minLength: 2,
            maxLength: 5,
            customValidator: {
                name: customValidator.name,
                args: null
            }
        },
        errorMessages: {
            required: "{{label}} is required",
            customValidator: "{{label}} cannot start with abc"
        }
    }),

    new DynamicCheckboxGroupModel({

        id: "basicCheckboxGroup",
        legend: "Checkbox Group",
        group: [
            new DynamicCheckboxModel(
                {
                    id: "checkboxGroup1",
                    label: "Checkbox 1"
                }
            ),
            new DynamicCheckboxModel(
                {
                    id: "checkboxGroup2",
                    label: "Checkbox 2"
                }
            )
        ]
    }),

    new DynamicRadioGroupModel<string>({

        id: "basicRadioGroup",
        legend: "Radio Group",
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

    new DynamicTextAreaModel({

        id: "basicTextArea",
        label: "Textarea",
        rows: 5,
        placeholder: "example Textarea"
    }),

    new DynamicFormGroupModel({

        id: "basicFormGroup1",
        legend: "Form Group 1",
        group: [
            new DynamicInputModel(
                {
                    id: "basicGroupInput1-1",
                    label: "Nested Input 1-1",
                    value: "Test 1-1"
                }
            ),
            new DynamicInputModel(
                {
                    id: "basicGroupInput1-2",
                    label: "Nested Input 1-2",
                    value: "Test 1-2"
                }
            )]
    }),

    new DynamicFormGroupModel({

        id: "basicFormGroup2",
        legend: "Form Group 2",
        group: [
            new DynamicInputModel(
                {
                    id: "basicGroupInput2-1",
                    label: "Nested Input 2-1",
                    value: "Test 2-1"
                }
            ),
            new DynamicInputModel(
                {
                    id: "basicGroupInput2-2",
                    label: "Nested Input 2-2",
                    value: "Test 2-2"
                }
            )]
    }),

    new DynamicCheckboxModel({

        id: "basicCheckbox",
        label: "I do agree"
    })
];

export const BASIC_SAMPLE_FORM_ARRAY_MODEL = [

    new DynamicFormArrayModel(
        {
            id: "basicFormArray",
            initialCount: 2,
            label: "Form Array",
            groupFactory: () => {
                return [
                    new DynamicCheckboxModel({

                        label: "Mon",
                        id: "monday"
                    }),
                    new DynamicCheckboxModel({

                        label: "Tue",
                        id: "tuesday"
                    }),
                    new DynamicCheckboxModel({

                        label: "Wen",
                        id: "wednesday"
                    }),
                    new DynamicCheckboxModel({

                        label: "Thu",
                        id: "thursday"
                    }),
                    new DynamicCheckboxModel({

                        label: "Fri",
                        id: "friday"
                    }),
                    new DynamicCheckboxModel({

                        label: "Sat",
                        id: "saturday"
                    }),
                    new DynamicCheckboxModel({

                        label: "Sun",
                        id: "sunday"
                    })
                ];
            }
        })
];