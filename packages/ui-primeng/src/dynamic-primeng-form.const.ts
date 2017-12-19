export enum PrimeNGFormControlType {

    Array = 1, //"ARRAY",
    AutoComplete = 2, //"AUTOCOMPLETE",
    Calendar = 3, //"CALENDAR",
    Checkbox = 4, //"CHECKBOX",
    Chips = 5, //"CHIPS",
    ColorPicker = 6, //COLOR_PICKER
    Dropdown = 7, //"DROPDOWN",
    Editor = 8, //"EDITOR",
    Group = 9, //"GROUP",
    Input = 10, //"INPUT",
    InputMask = 11, //"INPUT_MASK",
    InputSwitch = 12, //"INPUT_SWITCH",
    MultiSelect = 13, //"MULTI_SELECT",
    RadioGroup = 14, //"RADIO_GROUP",
    Rating = 15, // "RATING",
    Slider = 16, //"SLIDER",
    Spinner = 17, //"SPINNER,
    TextArea = 18, //"TEXTAREA"
}

export const PRIME_NG_VIEW_CHILD_SELECTOR = `pAutoComplete,pCalendar,pCheckbox,pChips,pColorPicker,pDropdown,pEditor,
pInputMask,pInputSwitch,pInputText,pMultiSelect,pRating,pSlider,pSpinner,pInputTextarea`;

export const PRIME_NG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES = {

    itemTemplate: "itemTemplate",
    selectedItemTemplate: "selectedItemTemplate"
};

export const PRIME_NG_CHIPS_TEMPLATE_DIRECTIVES = {

    itemTemplate: "itemTemplate"
};

export const PRIME_NG_DROPDOWN_LIST_TEMPLATE_DIRECTIVES = {

    itemTemplate: "itemTemplate"
};