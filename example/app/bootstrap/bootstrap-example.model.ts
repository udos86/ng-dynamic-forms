import {
    DynamicFormModel,
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicTextAreaModel,
} from "@ng2-dynamic-forms/core";

export const BOOTSTRAP_EXAMPLE_MODEL: DynamicFormModel = new DynamicFormModel([

    new DynamicSelectModel<string>(
        {
            id: "bootstrapSelect",
            label: "Example Select",
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
        },
        {
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            },
            label: "control-label"
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
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            },
            label: "control-label"
        }
    ),

    new DynamicCheckboxGroupModel(
        {
            id: "bootstrapCheckboxGroup",
            label: "Example Checkbox Group",
            items: [
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
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            },
            label: "control-label"
        }
    ),

    new DynamicRadioGroupModel<string>(
        {
            id: "bootstrapRadioGroup",
            label: "Example Radio Group",
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
        },
        {
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            },
            label: "control-label"
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
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            },
            label: "control-label"
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
]);
