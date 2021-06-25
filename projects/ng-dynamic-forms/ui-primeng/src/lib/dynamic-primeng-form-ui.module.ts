import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import {
    DynamicPrimeNGFormArrayComponent,
    DynamicPrimeNGFormControlContainerComponent,
    DynamicPrimeNGFormGroupComponent
} from "./dynamic-primeng-form-control-container.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { ChipsModule } from "primeng/chips";
import { ColorPickerModule } from "primeng/colorpicker";
import { DropdownModule } from "primeng/dropdown";
import { EditorModule } from "primeng/editor";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MultiSelectModule } from "primeng/multiselect";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { SliderModule } from "primeng/slider";
import { SpinnerModule } from "primeng/spinner";
import { DynamicPrimeNGFormComponent } from "./dynamic-primeng-form.component";
import { DynamicPrimeNGAutoCompleteComponent } from "./autocomplete/dynamic-primeng-autocomplete.component";
import { DynamicPrimeNGCalendarComponent } from "./calendar/dynamic-primeng-calendar.component";
import { DynamicPrimeNGCheckboxComponent } from "./checkbox/dynamic-primeng-checkbox.component";
import { DynamicPrimeNGChipsComponent } from "./chips/dynamic-primeng-chips.component";
import { DynamicPrimeNGColorPickerComponent } from "./colorpicker/dynamic-primeng-colorpicker.component";
import { DynamicPrimeNGDropdownComponent } from "./dropdown/dynamic-primeng-dropdown.component";
import { DynamicPrimeNGEditorComponent } from "./editor/dynamic-primeng-editor.component";
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
