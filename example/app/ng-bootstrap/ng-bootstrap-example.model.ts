import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicDatePickerModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicTextAreaModel,
    DynamicTimePickerModel
} from "@ng2-dynamic-forms/core";

export const NG_BOOTSTRAP_EXAMPLE_MODEL = [

    new DynamicSelectModel<string>(
        {
            id: "ngbSelect",
            label: "Select",
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
                label: "col-form-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    ),

    new DynamicInputModel(
        {
            id: "ngbFileInput",
            inputType: "file",
            label: "File Input"
        },
        {
            element: {
                container: "row",
                label: "col-form-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    ),

    new DynamicDatePickerModel(
        {
            id: "ngbDatepicker",
            inline: false,
            label: "Datepicker",
            placeholder: "Ngb Datepicker",
            toggleIcon: "../../assets/calendar-icon.svg"
        },
        {
            element: {
                container: "row",
                label: "col-form-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    ),

    new DynamicCheckboxGroupModel(
        {
            id: "ngbCheckboxGroup",
            label: "Checkbox Group",
            group: [
                new DynamicCheckboxModel(
                    {
                        id: "ngbCheckbox1",
                        label: "One"
                    },
                    {
                        element: {
                            control: "btn-primary"
                        }
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "ngbCheckbox2",
                        label: "Two",
                        value: true
                    },
                    {
                        element: {
                            control: "btn-primary"
                        }
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "ngbCheckbox3",
                        label: "Three"
                    },
                    {
                        element: {
                            control: "btn-primary"
                        }
                    }
                )
            ]
        },
        {
            element: {
                container: "row",
                label: "col-form-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    ),

    new DynamicInputModel(
        {
            id: "ngbInput",
            hint: "Just a hint",
            label: "Input",
            placeholder: "Ngb input",
            prefix: "Prefix",
            suffix: "Suffix",
            validators: {
                required: null,
                maxLength: 5
            },
            errorMessages: {
                required: "{{label}} is required",
                maxLength: "Max character count is 5"
            }
        },
        {
            element: {
                container: "row",
                label: "col-form-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    ),

    new DynamicTimePickerModel(
        {
            id: "ngbTimePicker",
            label: "TimePicker"
        },
        {
            element: {
                container: "row",
                label: "col-form-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    ),

    new DynamicRadioGroupModel<string>(
        {
            id: "ngbRadioGroup",
            label: "Radio Group",
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
                control: "btn-primary",
                label: "col-form-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "ngbTextArea",
            label: "Textarea",
            rows: 5,
            placeholder: "Ngb Textarea"
        },
        {
            element: {
                container: "row",
                label: "col-form-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    ),

    new DynamicCheckboxModel(
        {
            id: "ngbCheckbox",
            label: "I do agree"
        },
        {
            element: {
                container: "row",
            },
            grid: {
                control: "offset-sm-3 col-sm-9",
            }
        }
    )
];