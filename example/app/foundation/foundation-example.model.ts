import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicTextAreaModel,
    DynamicFormArrayModel
} from "@ng2-dynamic-forms/core";

export const FOUNDATION_EXAMPLE_MODEL = [

    new DynamicSelectModel<string>(
        {
            id: "foundationSelect",
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
                container: "row",
                label: "text-right middle font-bold"
            },
            grid: {
                control: "small-9 columns",
                label: "small-3 columns"
            }
        }
    ),

    new DynamicRadioGroupModel<string>(
        {
            id: "foundationRadioGroup",
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
                container: "row",
                label: "text-right font-bold"
            },
            grid: {
                control: "small-9 columns",
                label: "small-3 columns"
            }
        }
    ),

    new DynamicInputModel(
        {
            help: "Just a sample help text",
            id: "foundationInput",
            label: "Example Input",
            maxLength: 51,
            placeholder: "example input",
            prefix: "Prefix",
            suffix: "Suffix"
        },
        {
            element: {
                container: "row",
                label: "text-right middle font-bold"
            },
            grid: {
                control: "small-9 columns",
                label: "small-3 columns"
            }
        }
    ),

    new DynamicCheckboxGroupModel(
        {
            id: "foundationCheckboxGroup",
            group: [
                new DynamicCheckboxModel(
                    {
                        id: "foundationCheckbox1",
                        label: "Checkbox 1"
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "foundationCheckbox2",
                        label: "Checkbox 2"
                    }
                )
            ],
            label: "Example Checkbox Group"
        },
        {
            element: {
                container: "row",
                label: "text-right font-bold"
            },
            grid: {
                control: "small-9 columns",
                label: "small-3 columns"
            }
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "foundationTextArea",
            label: "Example Textarea",
            rows: 5,
            placeholder: "example Textarea",
        },
        {
            element: {
                container: "row",
                label: "text-right font-bold"
            },
            grid: {
                control: "small-9 columns",
                label: "small-3 columns"
            }
        }
    ),

    new DynamicCheckboxModel(
        {
            id: "foundationCheckbox",
            label: "I do agree"
        },
        {
            element: {
                container: "row"
            },
            grid: {
                control: "small-offset-3 small-9 columns"
            }
        }
    ),

    new DynamicFormArrayModel(
        {
            id: "foundationFormArray",
            initialCount: 5,
            label: "Example Array Model",
            createGroup: () => {
                return [
                    new DynamicInputModel(
                        {
                            id: "basicArrayGroupInput",
                            placeholder: "example array group input"
                        },
                        {
                            grid: {
                                control: "small-9 columns",
                            }
                        }
                    )
                ];
            }
        },
        {
            element: {
                container: "row float-clear",
                control: "row",
                label: "text-right font-bold"
            },
            grid: {
                control: "small-9 columns",
                label: "small-3 columns"
            }
        }
    )
];
