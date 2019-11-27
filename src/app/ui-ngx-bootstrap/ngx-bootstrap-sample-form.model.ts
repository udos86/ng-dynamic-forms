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
    DynamicFormGroupModel,
    MATCH_DISABLED,
    MATCH_HIDDEN,
    MATCH_REQUIRED
} from "@ng-dynamic-forms/core";
import { of } from "rxjs/observable/of";

export const NGX_BOOTSTRAP_SAMPLE_FORM_MODEL = [

    new DynamicFormGroupModel({

        id: "bsFormGroup1",
        legend: "Form Group 1",
        group: [

            new DynamicDatePickerModel({

                id: "bsDatePicker",
                label: "Datepicker",
                toggleLabel: "Open",
                placeholder: "Pick a date",
                value: new Date(),
                additional: {
                    containerClass: "theme-red"
                }
            }),

            new DynamicSelectModel<string>({

                id: "bsSelect",
                label: "Select",
                options: of([
                    {
                        label: "Option 1",
                        value: "option-1"
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
                id: "bsInput",
                label: "Input",
                maxLength: 51,
                placeholder: "Just some input",
                prefix: "Prefix",
                suffix: "Suffix",
                relations: [],
                validators: {
                    maxLength: 5
                },
                errorMessages: {
                    maxLength: "Max character count is 5"
                }
            }),

            new DynamicCheckboxGroupModel({

                id: "bsCheckboxGroup",
                label: "Checkbox Group",
                group: [
                    new DynamicCheckboxModel({

                        id: "checkboxGroup1",
                        label: "Checkbox 1",
                        value: true,
                        relations: [
                            {
                                match: MATCH_DISABLED,
                                when: [{rootPath: "bsFormGroup2.bsRadioGroup", value: "option-4"}]
                            }
                        ]

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

        id: "bsFormGroup2",
        legend: "Form Group 2",
        group: [
            new DynamicRadioGroupModel<string>({

                id: "bsRadioGroup",
                label: "Radio Group",
                options: [
                    {
                        label: "Textarea is disabled",
                        value: "option-1"
                    },
                    {
                        label: "Textarea is hidden",
                        value: "option-2"
                    },
                    {
                        label: "Textarea is required",
                        value: "option-3"
                    },
                    {
                        label: "Option 4",
                        value: "option-4"
                    }
                ],
                value: "option-4"
            }),

            new DynamicInputModel({

                id: "bsInput2",
                label: "Input",
                maxLength: 51,
                placeholder: "example input",
                validators: {
                    maxLength: 5
                },
                errorMessages: {
                    maxLength: "Max character count is 5"
                },
                value: "Test"
            }),

            new DynamicTextAreaModel({

                id: "bsTextArea",
                label: "Textarea",
                rows: 5,
                placeholder: "example Textarea",
                relations: [
                    {
                        match: MATCH_DISABLED,
                        when: [{id: "bsRadioGroup", value: "option-1"}]
                    },
                    {
                        match: MATCH_HIDDEN,
                        when: [{id: "bsRadioGroup", value: "option-2"}]
                    },
                    {
                        match: MATCH_REQUIRED,
                        when: [{id: "bsRadioGroup", value: "option-3"}]
                    }
                ],
                errorMessages: {
                    required: "This field is required"
                }
            }),

            new DynamicTimePickerModel({

                id: "bsTimePicker",
                label: "Timepicker",
                meridian: true,
                showSeconds: false,
                value: new Date()
            }),

            new DynamicCheckboxModel({

                id: "bsCheckbox",
                label: "I do agree"
            }),

            new DynamicFormArrayModel({

                id: "bsFormArray",
                initialCount: 5,
                label: "Form Array",
                groupFactory: () => {
                    return [
                        new DynamicInputModel({
                            id: "bsArrayInput",
                            // label: "Label",
                            placeholder: "Just some input"
                        })
                    ];
                }
            })
        ]
    })
];
