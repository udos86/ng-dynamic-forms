import {
    DynamicInputModel,
    DynamicSelectModel,
    DynamicSwitchModel,
    DynamicSliderModel,
    DynamicDatePickerModel,
    DynamicFileUploadModel, DynamicRadioGroupModel, DynamicCheckboxModel, DynamicCheckboxGroupModel,
    DynamicTextAreaModel
} from "@ng2-dynamic-forms/core";

export const KENDO_EXAMPLE_MODEL = [

    new DynamicSelectModel<string>(
        {
            id: "kendoDropDownList",
            label: "Kendo DropDownList",
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
            label: "Kendo Upload",
            multiple: true,
            removeUrl: "removeUrl",
            url: "saveUrl"
        }
    ),

    new DynamicInputModel({

        id: "kendoTextBox",
        hint: "Just a hint",
        label: "Kendo TextBox",
        placeholder: "Kendo TextBox"
    }),

    new DynamicDatePickerModel(
        {
            id: "kendoDatePicker",
            //focusedDate: new Date(2010, 11, 11),
            inline: false,
            label: "Kendo DatePicker",
            value: new Date()
        }
    ),

    new DynamicCheckboxGroupModel({

        id: "kendoCheckboxGroup",
        legend: "Kendo Checkbox Group",
        group: [
            new DynamicCheckboxModel(
                {
                    id: "checkboxGroup1",
                    label: "Checkbox 1"
                }
            ),
            new DynamicCheckboxModel(
                {
                    id: "checkboxGroup2",
                    label: "Checkbox 2"
                }
            )
        ]
    }),

    new DynamicRadioGroupModel<string>(
        {
            id: "kendoRadioGroup",
            legend: "Kendo Radio Group",
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
            value: "option-2"
        }
    ),

    new DynamicInputModel(
        {
            id: "kendoAutocomplete",
            label: "Kendo Autocomplete",
            list: ["Football", "Basketball", "Baseball", "Hockey", "Rugby", "Volleyball"],
            placeholder: "Kendo Autocomplete"
        }
    ),

    new DynamicSliderModel(
        {
            id: "kendoSlider",
            label: "Kendo Slider",
            min: 0,
            max: 10,
            step: 1,
            value: 3
        }
    ),

    new DynamicInputModel(
        {
            id: "kendoNumericTextBox",
            label: "Kendo NumericTextBox",
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
            label: "Kendo MultiSelect",
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

    new DynamicInputModel(
        {
            id: "kendoDateInput",
            label: "Kendo DateInput",
            placeholder: "Kendo DateInput",
            inputType: "date"
        }
    ),

    new DynamicSwitchModel(
        {
            id: "kendoSwitch",
            label: "Kendo Switch",
            offLabel: "Off",
            onLabel: "On",
            value: true
        }
    ),

    new DynamicInputModel(
        {
            id: "kendoMaskedTextBox",
            label: "Kendo MaskedTextBox",
            mask: "0000-00-00",
            value: "2017-01-01"
        }
    ),

    new DynamicTextAreaModel({

        id: "kendoTextArea",
        label: "Kendo TextArea",
        rows: 5,
        placeholder: "Kendo TextArea"
    }),
];