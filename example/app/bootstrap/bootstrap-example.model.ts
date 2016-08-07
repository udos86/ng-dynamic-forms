import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicTextAreaModel,
} from "@ng2-dynamic-forms/core";

export const BOOTSTRAP_EXAMPLE_MODEL = [

    new DynamicSelectModel<string>(
        {
            id: "bootstrapSelect",
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
                },
                {
                    label: "Option 4",
                    value: "option-4"
                }
            ],
            value: "option-3"
        },
        {
            element: {
                label: "control-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    ),

    new DynamicInputModel(
        {
            help: "Just a sample help text",
            id: "bootstrapInput",
            label: "Example Input",
            maxLength: 51,
            placeholder: "example input",
            prefix: "Prefix",
            suffix: "Suffix"
        },
        {
            element: {
                label: "control-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    ),

    new DynamicCheckboxGroupModel(
        {
            id: "bootstrapCheckboxGroup",
            label: "Example Checkbox Group",
            group: [
                new DynamicCheckboxModel(
                    {
                        id: "checkboxGroup1",
                        label: "Checkbox 1",
                        value: true
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "checkboxGroup2",
                        label: "Checkbox 2",
                        value: true
                    }
                )
            ]
        },
        {
            element: {
                label: "control-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    ),

    new DynamicRadioGroupModel<string>(
        {
            id: "bootstrapRadioGroup",
            label: "Example Radio Group",
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
        },
        {
            element: {
                label: "control-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "bootstrapTextArea",
            label: "Example Textarea",
            rows: 5,
            placeholder: "example Textarea",
        },
        {
            element: {
                label: "control-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    ),

    new DynamicCheckboxModel(
        {
            id: "bootstrapCheckbox",
            label: "I do agree"
        },
        {
            grid: {
                control: "col-sm-offset-3 col-sm-9"
            }
        }
    )
];
