import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicDatePickerModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicTextAreaModel,
    DynamicTimePickerModel,
    DynamicFormArrayModel,
    DynamicFormGroupModel
} from "@ng-dynamic-forms/core";
import { of } from "rxjs/observable/of";

export const BOOTSTRAP_SAMPLE_FORM_MODEL = [

    new DynamicFormGroupModel({

        id: "bootstrapFormGroup1",
        legend: "Form Group 1",
        group: [

            new DynamicDatePickerModel({

                id: "bootstrapDatePicker",
                label: "Datepicker",
                toggleLabel: "Open",
                placeholder: "Pick a date",
                value: new Date(),
                additional: {
                    containerClass: "theme-red"
                }
            }),

            new DynamicSelectModel<string>({

                id: "bootstrapSelect",
                label: "Select",
                options: of([
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
                ]),
                value: "option-3"
            }),

            new DynamicInputModel({

                hint: "Just a sample help text",
                id: "bootstrapInput",
                label: "Input",
                maxLength: 51,
                placeholder: "example input",
                prefix: "Prefix",
                suffix: "Suffix",
                validators: {
                    required: null,
                    maxLength: 5
                },
                errorMessages: {
                    required: "{{ label }} is required",
                    maxLength: "Max character count is 5"
                }
            }),

            new DynamicCheckboxGroupModel({

                id: "bootstrapCheckboxGroup",
                label: "Checkbox Group",
                group: [
                    new DynamicCheckboxModel({

                        id: "checkboxGroup1",
                        label: "Checkbox 1",
                        value: true
                    }),
                    new DynamicCheckboxModel({

                        id: "checkboxGroup2",
                        label: "Checkbox 2",
                        value: true
                    })
                ]
            })
        ]
    }),

    new DynamicFormGroupModel({

        id: "bootstrapFormGroup2",
        legend: "Form Group 2",
        group: [
            new DynamicRadioGroupModel<string>({

                id: "bootstrapRadioGroup",
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
            }),

            new DynamicTextAreaModel({

                id: "bootstrapTextArea",
                label: "Textarea",
                rows: 5,
                placeholder: "example Textarea",
                relation: [
                    {
                        action: "DISABLE",
                        connective: "OR",
                        when: [
                            {
                                id: "bootstrapRadioGroup",
                                value: "option-2"
                            },
                            {
                                id: "bootstrapRadioGroup",
                                value: "option-4",
                            }
                        ]
                    }
                ],
            }),

            new DynamicTimePickerModel({

                id: "bootstrapTimePicker",
                label: "Timepicker",
                meridian: true,
                showSeconds: false,
                value: new Date()
            }),

            new DynamicCheckboxModel({

                id: "bootstrapCheckbox",
                label: "I do agree"
            }),

            new DynamicFormArrayModel({

                id: "bootstrapFormArray",
                initialCount: 5,
                label: "Form Array",
                groupFactory: () => {
                    return [
                        new DynamicInputModel({

                            id: "bootstrapArrayGroupInput",
                            placeholder: "example array group input"
                        })
                    ];
                }
            })
        ]
    })
];