export const enum KendoFormControlType {

    Array = 1, //"ARRAY",
    AutoComplete = 2, //"AUTOCOMPLETE",
    Calendar = 3, //"CALENDAR",
    Checkbox = 4, //"CHECKBOX",
    CheckboxGroup = 5, //"CHECKBOX_GROUP",
    DateInput = 6, //"DATE_INPUT",
    DatePicker = 7, //"DATEPICKER",
    DropDownList = 8, //"DROPDOWNLIST",
    Group = 9, //"GROUP",
    Input = 10, //"INPUT",
    MaskedTextBox = 11, //"MASKED_TEXTBOX",
    MultiSelect = 12, //"MULTI_SELECT",
    NumericTextBox = 13, //"NUMERIC_TEXTBOX",
    RadioGroup = 14, //"RADIO_GROUP",
    Slider = 15, //"SLIDER",
    Switch = 16, //"SWITCH",
    TextArea = 17, //"TEXTAREA",
    TimePicker = 18, //"TIMEPICKER",
    Upload = 19, //"UPLOAD"
}

export const KENDO_AUTOCOMPLETE_TEMPLATE_DIRECTIVES = {

    footerTemplate: "kendoAutoCompleteFooterTemplate",
    headerTemplate: "kendoAutoCompleteHeaderTemplate",
    itemTemplate: "kendoAutoCompleteItemTemplate",
    noDataTemplate: "kendoAutoCompleteNoDataTemplate"
};

export const KENDO_CALENDAR_TEMPLATE_DIRECTIVES = {

    cellTemplate: "kendoCalendarCellTemplate"
};

export const KENDO_DROPDOWN_LIST_TEMPLATE_DIRECTIVES = {

    footerTemplate: "kendoDropDownListFooterTemplate",
    headerTemplate: "kendoDropDownListHeaderTemplate",
    itemTemplate: "kendoDropDownListItemTemplate",
    noDataTemplate: "kendoDropDownListNoDataTemplate",
    valueTemplate: "kendoDropDownListValueTemplate"
};

export const KENDO_MULTI_SELECT_TEMPLATE_DIRECTIVES = {

    footerTemplate: "kendoMultiSelectFooterTemplate",
    headerTemplate: "kendoMultiSelectHeaderTemplate",
    itemTemplate: "kendoMultiSelectItemTemplate",
    noDataTemplate: "kendoMultiSelectNoDataTemplate",
    tagTemplate: "kendoMultiSelectTagTemplate"
};

export const KENDO_UPLOAD_TEMPLATE_DIRECTIVES = {

    fileTemplate: "kendoUploadFileTemplate"
};

export const KENDO_VIEW_CHILD_SELECTOR = `kendoAutocomplete,kendoCalendar,kendoDateInput,kendoDatePicker,
kendoDropDownList,kendoMaskedTextBox,kendoMultiSelect,kendoNumericTextBox,kendoSlider,kendoSwitch,kendoTimePicker,
kendoUpload`;