import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicSliderModel,
    DynamicSwitchModel,
    DynamicTextAreaModel
} from "@ng2-dynamic-forms/core";

export const PRIMENG_EXAMPLE_MODEL = [

    new DynamicSelectModel<string>(
        {
            id: "primeSelect",
            label: "Example Select",
            multiple: true,
            options: [
                {
                    label: "Option 1",
                    value: "option-1",
                },
                {
                    label: "Option 2",
                    value: "option-2"
                },
                {
                    label: "Option 3",
                    value: "option-3"
                }
            ],
            value: ["option-3"]
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row",
                control: "ui-grid-col-9",
                label: "ui-grid-col-3"
            }
        }
    ),

    new DynamicInputModel(
        {
            id: "primeInput",
            label: "Example Input",
            list: ["One", "Two", "Three", "Four", "Five"],
            maxLength: 51,
            placeholder: "example input"
        },
        {
            element: {
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
            id: "primeCheckboxGroup",
            legend: "Example Checkbox Group",
            group: [
                new DynamicCheckboxModel(
                    {
                        id: "primeCheckboxGroup1",
                        label: "Checkbox 1"
                    },
                    {
                        element: {
                            label: "ui-widget"
                        },
                        grid: {
                            container: "ui-grid-row"
                        }
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "primeCheckboxGroup2",
                        label: "Checkbox 2",
                        value: true
                    },
                    {
                        element: {
                            label: "ui-widget"
                        },
                        grid: {
                            container: "ui-grid-row"
                        }
                    }
                )
            ]
        }
    ),

    new DynamicRadioGroupModel<string>(
        {
            id: "primeRadioGroup",
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
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row"
            }
        }
    ),

    new DynamicSwitchModel(
        {
            id: "primeSwitch",
            label: "Example Switch",
            offLabel: "Off",
            onLabel: "On",
            value: false
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row",
                control: "ui-grid-col-9",
                label: "ui-grid-col-3"
            }
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "primeTextArea",
            label: "Example Textarea",
            rows: 5,
            placeholder: "example Textarea",
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row",
                control: "ui-grid-col-9",
                label: "ui-grid-col-3"
            }
        }
    ),

    new DynamicSliderModel(
        {
            id: "primeSlider",
            label: "Example Slider",
            min: 0,
            max: 10,
            step: 1,
            value: 3
        },
        {
            element: {
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
            id: "primeCheckbox",
            label: "I do agree"
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row"
            }
        }
    )
];