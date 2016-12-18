import {DynamicSelectModel} from "@ng2-dynamic-forms/core";

export const ASYNC_EXAMPLE_MODEL = [

    new DynamicSelectModel<string>({

        id: "asyncSelect",
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
            }
        ],
        value: "option-3"
    })
];