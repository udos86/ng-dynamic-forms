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
    InputMask = 10, //"INPUT_MASK",
    InputSwitch = 11, //"INPUT_SWITCH",
    MultiSelect = 12, //"MULTI_SELECT",
    RadioGroup = 13, //"RADIO_GROUP",
    Rating = 14, // "RATING",
    Slider = 15, //"SLIDER",
    Spinner = 16, //"SPINNER,
    TextArea = 17, //"TEXTAREA"
}

export const PRIME_NG_VIEW_CHILD_SELECTOR = `pAutoComplete,pCalendar,pCheckbox,pChips,pDropdown,pEditor,pInputMask,
pInputSwitch,pInputText,pMultiSelect,pRating,pSlider,pSpinner,pInputTextarea`;

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