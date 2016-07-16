import {
    DynamicFormModel,
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicTextAreaModel,
} from "@ng2-dynamic-forms/core";

export const PRIMENG_EXAMPLE_MODEL: DynamicFormModel = new DynamicFormModel([

    new DynamicSelectModel<string>(
        {
            id: "basicSelect",
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
            placeholder: "example input"
        },
        {
            element: {
                container: "ui-grid ui-grid-responsive",
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row",
                control: "ui-grid-col-9",
                label: "ui-grid-col-3"
            }
        }
    ),

    new DynamicCheckboxGroupModel(
        {
            id: "basicCheckboxGroup",
            legend: "Example Checkbox Group",
            items: [
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
        },
        {
            element: {
                container: "ui-grid ui-grid-responsive",
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row"
            }
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "basicTextArea",
            label: "Example Textarea",
            rows: 5,
            placeholder: "example Textarea",
        },
        {
            element: {
                container: "ui-grid ui-grid-responsive",
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row",
                control: "ui-grid-col-9",
                label: "ui-grid-col-3"
            }
        }
    ),

    new DynamicCheckboxModel(
        {
            id: "basicCheckbox",
            label: "I do agree"
        },
        {
            element: {
                container: "ui-grid ui-grid-responsive",
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row"
            }
        }
    )
]);