import {
    DynamicFormModel,
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicTextAreaModel,
} from "@ng2-dynamic-forms/core";

export const FOUNDATION_EXAMPLE_MODEL: DynamicFormModel = new DynamicFormModel([

    new DynamicSelectModel<string>(
        {
            id: "foundationSelect",
            label: {
                text: "Example Select"
            },
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
                },
                {
                    text: "Option 4",
                    value: "option-4"
                }
            ],
            value: "option-3"
        },
        {
            container: "row",
            grid: {
                label: "small-3 columns",
                control: "small-9 columns"
            },
            label: "text-right middle"
        }
    ),

    new DynamicRadioGroupModel<string>(
        {
            id: "foundationRadioGroup",
            label: {
                text: "Example Radio Group"
            },
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
                },
                {
                    text: "Option 4",
                    value: "option-4"
                }
            ],
            value: "option-3"
        },
        {
            container: "row",
            grid: {
                label: "small-3 columns",
                control: "small-9 columns"
            },
            label: "text-right"
        }
    ),

    new DynamicInputModel(
        {
            help: "Just a sample help text",
            id: "foundationInput",
            label: {
                text: "Example Input"
            },
            maxLength: 51,
            placeholder: "example input",
            prefix: "Prefix",
            suffix: "Suffix"
        },
        {
            container: "row",
            grid: {
                label: "small-3 columns",
                control: "small-9 columns"
            },
            label: "text-right middle"
        }
    ),

    new DynamicCheckboxGroupModel(
        {
            id: "foundationCheckboxGroup",
            items: [
                new DynamicCheckboxModel({

                    id: "foundationCheckbox1",
                    label: {
                        text: "Test 1"
                    }
                }),
                new DynamicCheckboxModel({

                    id: "foundationCheckbox2",
                    label: {
                        text: "Test 2"
                    }
                })
            ],
            label: {
                text: "Example Checkbox Group"
            }
        },
        {
            container: "row",
            grid: {
                label: "small-3 columns",
                control: "small-9 columns"
            },
            label: "text-right"
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "foundationTextArea",
            label: {
                text: "Example Textarea"
            },
            rows: 5,
            placeholder: "example Textarea",
        },
        {
            container: "row",
            grid: {
                label: "small-3 columns",
                control: "small-9 columns"
            },
            label: "text-right"
        }
    ),

    new DynamicCheckboxModel(
        {
            id: "foundationCheckbox",
            label: {
                text: "I do agree"
            }
        },
        {
            container: "row",
            grid: {
                control: "small-offset-3 small-9 columns"
            }
        }
    )
]);
