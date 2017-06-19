import {
    MdAutocomplete,
    MdCheckbox,
    MdDatepicker,
    MdInputContainer,
    MdRadioGroup,
    MdSelect,
    MdSlider,
    MdSlideToggle
} from "@angular/material";

export const enum MdFormControlType {

    Array = 1, //"ARRAY",
    Checkbox = 2, //"CHECKBOX",
    DatePicker = 3, //"DATEPICKER",
    Group = 4, //"GROUP",
    Input = 5, //"INPUT",
    RadioGroup = 6, //"RADIO_GROUP",
    Select = 7, //"SELECT",
    Slider = 8, //"SLIDER",
    SlideToggle = 9, //"SLIDE_TOGGLE",
    TextArea = 10, //"TEXTAREA"
}

export type MdFormControlComponent = MdAutocomplete | MdCheckbox | MdDatepicker<Date> | MdInputContainer |
    MdRadioGroup | MdSelect | MdSlider | MdSlideToggle;

export const MD_VIEW_CHILD_SELECTOR = `mdAutocomplete,mdCheckbox,mdDatepicker,mdInput,mdRadioGroup,mdSelect,
    mdSlider,mdSlideToggle,mdTextarea`;