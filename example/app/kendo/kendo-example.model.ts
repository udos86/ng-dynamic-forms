import {
    DynamicSelectModel,
    DynamicSwitchModel,
    DynamicSliderModel
} from "@ng2-dynamic-forms/core";

export const KENDO_EXAMPLE_MODEL = [

    new DynamicSelectModel<string>(
        {
            id: "kendoSelect",
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
        }
    ),

    new DynamicSliderModel(
        {
            id: "kendoSlider",
            min: 0,
            max: 10,
            step: 1,
            value: 3
        }
    ),

    new DynamicSwitchModel(
        {
            id: "kendoSwitch",
            offLabel: "Off",
            onLabel: "On",
            value: true
        }
    ),
];