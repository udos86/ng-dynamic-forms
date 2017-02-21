import {
    DynamicInputModel,
    DynamicSelectModel,
    DynamicSwitchModel,
    DynamicSliderModel,
    DynamicDatepickerModel,
    DynamicFileUploadModel
} from "@ng2-dynamic-forms/core";

export const KENDO_EXAMPLE_MODEL = [

    new DynamicSelectModel<string>(
        {
            id: "kendoDropDownList",
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

    new DynamicFileUploadModel(
        {
            autoUpload: true,
            id: "kendoUpload",
            multiple: true,
            removeUrl: "removeUrl",
            url: "saveUrl"
        }
    ),

    new DynamicDatepickerModel(
        {
            id: "kendoDatepicker",
            //focusedDate: new Date(2010, 11, 11)
            inline: true,
            value: new Date()
        }
    ),

    new DynamicInputModel(
        {
            id: "kendoAutocomplete",
            list: ["Football", "Basketball", "Baseball", "Hockey", "Rugby", "Volleyball"],
            placeholder: "Kendo Autocomplete"
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

    new DynamicInputModel(
        {
            id: "kendoNumericTextBox",
            inputType: "number",
            min: 0,
            max: 100,
            step: 1,
            value: 5
        }
    ),

    new DynamicSelectModel<string>(
        {
            id: "kendoMultiSelect",
            multiple: true,
            options: [
                {
                    label: "Football",
                    value: "football",
                },
                {
                    label: "Basketball",
                    value: "basketball"
                },
                {
                    label: "Baseball",
                    value: "baseball"
                },
                {
                    label: "Hockey",
                    value: "hockey"
                },
                {
                    label: "Rugby",
                    value: "rugby"
                },
                {
                    label: "Volleyball",
                    value: "volleyball"
                }
            ],
            placeholder: "Add another item",
            value: ["basketball"]
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

    new DynamicInputModel(
        {
            id: "kendoMaskedTextBox",
            mask: "0000-00-00",
            value: "2017-01-01"
        }
    ),
];