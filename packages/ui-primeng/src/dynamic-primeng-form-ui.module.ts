import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicPrimeNGFormControlComponent } from "./dynamic-primeng-form-control.component";
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
        DynamicPrimeNGFormControlComponent,
        DynamicPrimeNGFormComponent
    ],
    entryComponents: [
        DynamicPrimeNGAutoCompleteComponent,
        DynamicPrimeNGCalendarComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicPrimeNGFormControlComponent,
        DynamicPrimeNGFormComponent
    ]
})
export class DynamicFormsPrimeNGUIModule {
}