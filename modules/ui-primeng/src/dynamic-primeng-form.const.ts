export const enum PrimeNGFormControlType {

    Array = 1, //"ARRAY",
    AutoComplete = 2, //"AUTOCOMPLETE",
    Calendar = 3, //"CALENDAR",
    Checkbox = 4, //"CHECKBOX",
    Chips = 5, //"CHIPS",
    Dropdown = 6, //"DROPDOWN",
    Editor = 7, //"EDITOR",
    Group = 8, //"GROUP",
    Input = 9, //"INPUT",
    InputSwitch = 10, //"INPUT_SWITCH",
    MultiSelect = 11, //"MULTI_SELECT",
    RadioGroup = 12, //"RADIO_GROUP",
    Rating = 13, // "RATING",
    Slider = 14, //"SLIDER",
    Spinner = 15, //"SPINNER,
    TextArea = 16, //"TEXTAREA"
}

export const PRIME_NG_VIEW_CHILD_SELECTOR = `pAutoComplete,pCalendar,pCheckbox,pChips,pDropdown,pEditor,pInputText,
    pInputSwitch,pMultiSelect,pRating,pSlider,pSpinner,pInputTextarea`;

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