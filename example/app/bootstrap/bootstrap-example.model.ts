import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicTextAreaModel,
    DynamicFormArrayModel,
    DynamicFormGroupModel
} from "@ng2-dynamic-forms/core";

export const BOOTSTRAP_EXAMPLE_MODEL = [

    new DynamicFormGroupModel({

        id: "bootstrapFormGroup1",
        legend: "Bootstrap Form Group 1",
        group: [
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
                    hint: "Just a sample help text",
                    id: "bootstrapInput",
                    label: "Example Input",
                    maxLength: 51,
                    placeholder: "example input",
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
                        label: "control-label"
                    },
                    grid: {
                        control: "col-sm-9",
                        errors: "col-sm-offset-3 col-sm-9",
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
                            },
                            {
                                grid: {
                                    control: "col-sm-12"
                                }
                            }
                        ),
                        new DynamicCheckboxModel(
                            {
                                id: "checkboxGroup2",
                                label: "Checkbox 2",
                                value: true
                            },
                            {
                                grid: {
                                    control: "col-sm-12"
                                }
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
            )
        ]
    }),

    new DynamicFormGroupModel({

        id: "bootstrapFormGroup2",
        legend: "Bootstrap Form Group 2",
        group: [
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
            ),

            new DynamicFormArrayModel(
                {
                    id: "bootstrapFormArray",
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
                                        container: "col-sm-8"
                                    }
                                }
                            )
                        ];
                    }
                },
                {
                    element: {
                        container: "form-array",
                        label: "control-label"
                    },
                    grid: {
                        control: "col-sm-9",
                        label: "col-sm-3"
                    }
                }
            )]
    })

];