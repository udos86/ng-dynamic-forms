import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicPrimeNGFormControlComponent } from "./dynamic-primeng-form-control.component";
import {
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    ChipsModule,
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

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        DynamicFormsCoreModule,
        AutoCompleteModule,
        CalendarModule,
        CheckboxModule,
        ChipsModule,
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
    exports: [
        DynamicFormsCoreModule,
        DynamicPrimeNGFormControlComponent,
        DynamicPrimeNGFormComponent
    ]
})

export class DynamicFormsPrimeNGUIModule {
}