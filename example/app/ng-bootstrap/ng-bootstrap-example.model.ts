import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicTextAreaModel, DynamicDatePickerModel, DynamicTimePickerModel
} from "@ng2-dynamic-forms/core";

export const NG_BOOTSTRAP_EXAMPLE_MODEL = [

    new DynamicSelectModel<string>(
        {
            id: "ngbSelect",
            label: "Ngb Select",
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

    new DynamicDatePickerModel(
        {
            id: "ngbCalendar",
            inline: true,
            label: "Ngb Calendar"
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
            //hint: "Just a hint",
            label: "Ngb Input",
            placeholder: "Ngb input",
            prefix: "Prefix",
            suffix: "Suffix"
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
            label: "Ngb TimePicker"
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
            label: "Ngb Radio Group",
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

    new DynamicTextAreaModel(
        {
            id: "ngbTextArea",
            label: "Ngb Textarea",
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