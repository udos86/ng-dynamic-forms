import {
    DynamicFormModel,
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicTextAreaModel,
    DynamicFormArrayModel,
    DynamicFormGroupModel
} from "@ng2-dynamic-forms/core";

export const BASIC_EXAMPLE_MODEL: DynamicFormModel = new DynamicFormModel([

    new DynamicSelectModel<string>(
        {
            id: "basicSelect",
            label: "Example Select",
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
            value: "option-3"
        }
    ),

    new DynamicInputModel(
        {
            id: "basicInput",
            label: "Example Input",
            list: ["One", "Two", "Three", "Four", "Five"],
            maxLength: 51,
            placeholder: "example input",
            spellCheck: false,
            required: false
        }
    ),

    new DynamicCheckboxGroupModel(
        {
            id: "basicCheckboxGroup",
            legend: "Example Checkbox Group",
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
        }
    ),

    new DynamicRadioGroupModel<string>(
        {
            id: "basicRadioGroup",
            legend: "Example Radio Group",
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
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "basicTextArea",
            label: "Example Textarea",
            rows: 5,
            placeholder: "example Textarea"
        }
    ),

    new DynamicFormGroupModel({

        id: "basicFormGroup1",
        legend: "Nested Form Group 1",
        group: [
            new DynamicInputModel(
                {
                    id: "basicGroupInput1-1",
                    label: "Example Group Input 1-1",
                    value: "Test 1-1"
                }
            ),
            new DynamicInputModel(
                {
                    id: "basicGroupInput1-2",
                    label: "Example Group Input 1-2",
                    value: "Test 1-2"
                }
            )]
    }),

    new DynamicFormGroupModel({

        id: "basicFormGroup2",
        legend: "Nested Form Group 2",
        group: [
            new DynamicInputModel(
                {
                    id: "basicGroupInput2-1",
                    label: "Example Group Input 2-1",
                    value: "Test 2-1"
                }
            ),
            new DynamicInputModel(
                {
                    id: "basicGroupInput2-2",
                    label: "Example Group Input 2-2",
                    value: "Test 2-2"
                }
            )]
    }),

    new DynamicCheckboxModel(
        {
            id: "basicCheckbox",
            label: "I do agree"
        }
    )
]);

export const BASIC_EXAMPLE_ARRAY_MODEL = new DynamicFormModel([

    new DynamicFormArrayModel({

        id: "basicFormArray",
        initialCount: 5,
        label: "Example Array Model",
        createGroup: () => {
            return [
                new DynamicInputModel(
                    {
                        id: "basicArrayGroupInput",
                        label: "Example Array Group Input",
                        placeholder: "example array group input"
                    }
                )
            ];
        }
    })
]);