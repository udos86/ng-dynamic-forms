import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicTextAreaModel,
    DynamicFormArrayModel,
    DynamicFormGroupModel
} from "@ng-dynamic-forms/core";
import { Observable } from "rxjs/Observable";

export const BOOTSTRAP_SAMPLE_FORM_MODEL = [

    new DynamicFormGroupModel({

        id: "bootstrapFormGroup1",
        legend: "Form Group 1",
        group: [
            new DynamicSelectModel<string>(
                {
                    id: "bootstrapSelect",
                    label: "Select",
                    options: Observable.of([
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
                },
                {
                    element: {
                        container: "form-group",
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
                },
                {
                    element: {
                        container: "form-group",
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
                    label: "Checkbox Group",
                    group: [
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
                    element: {
                        container: "form-group",
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
        legend: "Form Group 2",
        group: [
            new DynamicRadioGroupModel<string>(
                {
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
                },
                {
                    element: {
                        container: "form-group",
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
                },
                {
                    element: {
                        container: "form-group",
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
                    element: {
                        container: "form-group"
                    },
                    grid: {
                        control: "col-sm-offset-3 col-sm-9"
                    }
                }
            ),

            new DynamicFormArrayModel(
                {
                    id: "bootstrapFormArray",
                    initialCount: 5,
                    label: "Form Array",
                    groupFactory: () => {
                        return [
                            new DynamicInputModel(
                                {
                                    id: "bootstrapArrayGroupInput",
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
                        container: "form-group form-array",
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