import {
    DynamicFormModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicTextAreaModel,
} from "@ng2-dynamic-forms/core";

export const FOUNDATION_EXAMPLE_MODEL: DynamicFormModel = new DynamicFormModel([

    new DynamicSelectModel<string>(
        {
            id: "bootstrapSelect",
            label: {
                text: "Example Select"
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
            container: "row",
            grid: {
                label: "small-3 columns",
                control: "small-9 columns"
            },
            label: "text-right middle"
        }
    ),

    new DynamicInputModel(
        {
            help: "Just a sample help text",
            id: "bootstrapInput",
            label: {
                text: "Example Input"
            },
            maxLength: 51,
            placeholder: "example input",
            prefix: "Prefix",
            suffix: "Suffix"
        },
        {
            container: "row",
            grid: {
                label: "small-3 columns",
                control: "small-9 columns"
            },
            label: "text-right middle"
        }
    ),

    new DynamicRadioGroupModel<string>(
        {
            id: "bootstrapRadioGroup",
            label: {
                text: "Example Radio Group"
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
            container: "row",
            grid: {
                label: "small-3 columns",
                control: "small-9 columns"
            },
            label: "text-right"
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "bootstrapTextArea",
            label: {
                text: "Example Textarea"
            },
            rows: 5,
            placeholder: "example Textarea",
        },
        {
            container: "row",
            grid: {
                label: "small-3 columns",
                control: "small-9 columns"
            },
            label: "text-right"
        }
    ),

    new DynamicCheckboxModel(
        {
            id: "bootstrapCheckbox",
            label: {
                text: "I do agree"
            }
        },
        {
            container: "row",
            grid: {
                control: "small-offset-3 small-9 columns"
            }
        }
    )
]);
