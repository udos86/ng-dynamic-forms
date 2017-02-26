export const DYNAMIC_FORM_UI_KENDO = "KENDO";

export const enum KendoFormControlType {

    Array = 1,
    AutoComplete = 2,
    Calendar = 3,
    //DateInput
    //DatePicker
    DropDownList = 4,
    Group = 5,
    MaskedTextBox = 6,
    MultiSelect = 7,
    NumericTextBox = 8,
    Slider = 9,
    Switch = 10,
    //TimePicker
    Upload = 11
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