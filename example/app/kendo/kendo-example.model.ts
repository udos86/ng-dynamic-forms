import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicDatePickerModel,
    DynamicFileUploadModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicSwitchModel,
    DynamicSliderModel,
    DynamicTextAreaModel
} from "@ng2-dynamic-forms/core";

export const KENDO_EXAMPLE_MODEL = [

    new DynamicSelectModel<string>(
        {
            id: "kendoDropDownList",
            label: "DropDownList",
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
            label: "Upload",
            multiple: true,
            removeUrl: "removeUrl",
            url: "saveUrl"
        }
    ),

    new DynamicInputModel(
        {
            id: "kendoTextBox",
            hint: "Just a hint",
            label: "TextBox",
            placeholder: "Kendo TextBox",
            validators: {
                required: null
            },
            errorMessages: {
                required: "{{label}} is required"
            }
        }
    ),

    new DynamicDatePickerModel(
        {
            id: "kendoDatePicker",
            //focusedDate: new Date(2010, 11, 11),
            inline: false,
            label: "DatePicker",
            value: new Date()
        }
    ),

    new DynamicCheckboxGroupModel(
        {
            id: "kendoCheckboxGroup",
            legend: "Checkbox Group",
            group: [
                new DynamicCheckboxModel(
                    {
                        id: "kendoCheckbox1",
                        label: "Kendo Checkbox 1"
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "kendoCheckbox2",
                        label: "Kendo Checkbox 2"
                    }
                )
            ]
        }
    ),

    new DynamicRadioGroupModel<string>(
        {
            id: "kendoRadioGroup",
            legend: "Radio Group",
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
            label: "Autocomplete",
            list: ["Football", "Basketball", "Baseball", "Hockey", "Rugby", "Volleyball"],
            placeholder: "Kendo Autocomplete"
        }
    ),

    new DynamicSliderModel(
        {
            id: "kendoSlider",
            label: "Slider",
            min: 0,
            max: 10,
            step: 1,
            value: 3
        }
    ),

    new DynamicInputModel(
        {
            id: "kendoNumericTextBox",
            label: "NumericTextBox",
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
            label: "MultiSelect",
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
            label: "DateInput",
            placeholder: "Kendo DateInput",
            inputType: "date"
        }
    ),

    new DynamicSwitchModel(
        {
            id: "kendoSwitch",
            label: "Switch",
            offLabel: "Off",
            onLabel: "On",
            value: true
        }
    ),

    new DynamicInputModel(
        {
            id: "kendoMaskedTextBox",
            label: "MaskedTextBox",
            mask: "0000-00-00",
            value: "2017-01-01"
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "kendoTextArea",
            label: "TextArea",
            rows: 5,
            placeholder: "Kendo TextArea"
        }
    ),
];