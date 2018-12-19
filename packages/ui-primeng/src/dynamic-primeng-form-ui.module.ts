import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicPrimeNGFormControlContainerComponent } from "./dynamic-primeng-form-control-container.component";
import {
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    ChipsModule,
    ColorPickerModule,
    DropdownModule,
    EditorModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    RadioButtonModule,
    RatingModule,
    SliderModule,
    SpinnerModule
} from "primeng/primeng";
import { DynamicPrimeNGFormComponent } from "./dynamic-primeng-form.component";
import { DynamicPrimeNGAutoCompleteComponent } from "./autocomplete/dynamic-primeng-autocomplete.component";
import { DynamicPrimeNGCalendarComponent } from "./calendar/dynamic-primeng-calendar.component";
import { DynamicPrimeNGCheckboxComponent } from "./checkbox/dynamic-primeng-checkbox.component";
import { DynamicPrimeNGChipsComponent } from "./chips/dynamic-primeng-chips.component";
import { DynamicPrimeNGColorPickerComponent } from "./colorpicker/dynamic-primeng-colorpicker.component";
import { DynamicPrimeNGDropdownComponent } from "./dropdown/dynamic-primeng-dropdown.component";
import { DynamicPrimeNGEditorComponent } from "./editor/dynamic-primeng-editor.component";
import { DynamicPrimeNGFormArrayComponent } from "./form-array/dynamic-primeng-form-array.component";
import { DynamicPrimeNGFormGroupComponent } from "./form-group/dynamic-primeng-form-group.component";
import { DynamicPrimeNGInputComponent } from "./input/dynamic-primeng-input.component";
import { DynamicPrimeNGInputMaskComponent } from "./input-mask/dynamic-primeng-input-mask.component";
import { DynamicPrimeNGInputSwitchComponent } from "./input-switch/dynamic-primeng-input-switch.component";
import { DynamicPrimeNGMultiSelectComponent } from "./multiselect/dynamic-primeng-multiselect.component";
import { DynamicPrimeNGRadioGroupComponent } from "./radio-group/dynamic-primeng-radio-group.component";
import { DynamicPrimeNGRatingComponent } from "./rating/dynamic-primeng-rating.component";
import { DynamicPrimeNGSliderComponent } from "./slider/dynamic-primeng-slider.component";
import { DynamicPrimeNGSpinnerComponent } from "./spinner/dynamic-primeng-spinner.component";
import { DynamicPrimeNGTextAreaComponent } from "./textarea/dynamic-primeng-textarea.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DynamicFormsCoreModule,
        AutoCompleteModule,
        CalendarModule,
        CheckboxModule,
        ChipsModule,
        ColorPickerModule,
        DropdownModule,
        EditorModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        MultiSelectModule,
        RadioButtonModule,
        RatingModule,
        SliderModule,
        SpinnerModule
    ],
    declarations: [
        DynamicPrimeNGAutoCompleteComponent,
        DynamicPrimeNGCalendarComponent,
        DynamicPrimeNGCheckboxComponent,
        DynamicPrimeNGChipsComponent,
        DynamicPrimeNGColorPickerComponent,
        DynamicPrimeNGDropdownComponent,
        DynamicPrimeNGEditorComponent,
        DynamicPrimeNGFormArrayComponent,
        DynamicPrimeNGFormComponent,
        DynamicPrimeNGFormControlContainerComponent,
        DynamicPrimeNGFormGroupComponent,
        DynamicPrimeNGInputComponent,
        DynamicPrimeNGInputMaskComponent,
        DynamicPrimeNGInputSwitchComponent,
        DynamicPrimeNGMultiSelectComponent,
        DynamicPrimeNGRadioGroupComponent,
        DynamicPrimeNGRatingComponent,
        DynamicPrimeNGSliderComponent,
        DynamicPrimeNGSpinnerComponent,
        DynamicPrimeNGTextAreaComponent
    ],
    entryComponents: [
        DynamicPrimeNGAutoCompleteComponent,
        DynamicPrimeNGCalendarComponent,
        DynamicPrimeNGCheckboxComponent,
        DynamicPrimeNGChipsComponent,
        DynamicPrimeNGColorPickerComponent,
        DynamicPrimeNGDropdownComponent,
        DynamicPrimeNGEditorComponent,
        DynamicPrimeNGFormArrayComponent,
        DynamicPrimeNGFormGroupComponent,
        DynamicPrimeNGInputComponent,
        DynamicPrimeNGInputMaskComponent,
        DynamicPrimeNGInputSwitchComponent,
        DynamicPrimeNGMultiSelectComponent,
        DynamicPrimeNGRadioGroupComponent,
        DynamicPrimeNGRatingComponent,
        DynamicPrimeNGSliderComponent,
        DynamicPrimeNGSpinnerComponent,
        DynamicPrimeNGTextAreaComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicPrimeNGAutoCompleteComponent,
        DynamicPrimeNGCalendarComponent,
        DynamicPrimeNGCheckboxComponent,
        DynamicPrimeNGChipsComponent,
        DynamicPrimeNGColorPickerComponent,
        DynamicPrimeNGDropdownComponent,
        DynamicPrimeNGEditorComponent,
        DynamicPrimeNGFormArrayComponent,
        DynamicPrimeNGFormComponent,
        DynamicPrimeNGFormControlContainerComponent,
        DynamicPrimeNGFormGroupComponent,
        DynamicPrimeNGInputComponent,
        DynamicPrimeNGInputMaskComponent,
        DynamicPrimeNGInputSwitchComponent,
        DynamicPrimeNGMultiSelectComponent,
        DynamicPrimeNGRadioGroupComponent,
        DynamicPrimeNGRatingComponent,
        DynamicPrimeNGSliderComponent,
        DynamicPrimeNGSpinnerComponent,
        DynamicPrimeNGTextAreaComponent
    ]
})
export class DynamicFormsPrimeNGUIModule {
}