import {Validators, AbstractControl} from "@angular/forms";
import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicTextAreaModel,
    DynamicFormArrayModel
} from "@ng2-dynamic-forms/core";

export function testValidator(control: AbstractControl): {[errorId: string]: boolean} {

    return {
        testValidator: true
    };
}

export const BOOTSTRAP_EXAMPLE_MODEL = [

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
            validators: [Validators.required]
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
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "checkboxGroup2",
                        label: "Checkbox 2",
                        value: true
                    }
                )
            ],
            validator: testValidator,
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
            depends: [
                {
                    on: "bootstrapSelect",
                    enableValue: "option-4"
                },
                {
                    on: "bootstrapRadioGroup",
                    enableValue: "option-4"
                }
            ],
            id: "bootstrapTextArea",
            label: "Example Textarea",
            rows: 5,
            placeholder: "example Textarea",
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
                label: "control-label"
            },
            grid: {
                control: "col-sm-9",
                label: "col-sm-3"
            }
        }
    )
];