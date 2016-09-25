import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSwitchModel
} from "@ng2-dynamic-forms/core";

export const MATERIAL_EXAMPLE_MODEL = [

    new DynamicInputModel({

        hint: "Just a simple hint text",
        id: "materialInput",
        label: "Example Input",
        maxLength: 51,
        placeholder: "example input"
    }),

    new DynamicCheckboxGroupModel(
        {
            id: "materialCheckboxGroup",
            group: [
                new DynamicCheckboxModel(
                    {
                        id: "materialCheckbox1",
                        label: "Checkbox 1"
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "materialCheckbox2",
                        label: "Checkbox 2"
                    }
                )
            ],
            label: "Example Checkbox Group"
        }
    ),

    new DynamicSwitchModel({

        id: "materialSwitch",
        label: "Get it on"
    }),

    new DynamicRadioGroupModel<string>({

        id: "materialRadioGroup",
        label: "Example Option",
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
        relation: [
            {
                action: "DISABLE",
                when: [
                    {
                        id: "materialSwitch",
                        value: true
                    }
                ]
            }
        ],
        value: "option-3"
    }),

    new DynamicCheckboxModel({

        id: "materialCheckbox",
        label: "I do agree"
    })
    /*
    new DynamicFormArrayModel(
        {
            id: "materialFormArray",
            initialCount: 5,
            label: "Example Array Model",
            createGroup: () => {
                return [
                    new DynamicInputModel(
                        {
                            id: "basicArrayGroupInput",
                            placeholder: "example array group input"
                        }
                    )
                ];
            }
        }
    )
    */
];
