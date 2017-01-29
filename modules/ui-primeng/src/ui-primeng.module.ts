import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicFormPrimeNGComponent } from "./dynamic-form-primeng.component";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { CheckboxModule } from "primeng/components/checkbox/checkbox";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { InputSwitchModule } from "primeng/components/inputswitch/inputswitch";
import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { InputTextareaModule } from "primeng/components/inputtextarea/inputtextarea";
import { MultiSelectModule } from "primeng/components/multiselect/multiselect";
import { RadioButtonModule } from "primeng/components/radiobutton/radiobutton";
import { SliderModule } from "primeng/components/slider/slider";
import { SpinnerModule } from "primeng/components/spinner/spinner";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        DynamicFormsCoreModule,
        CalendarModule,
        CheckboxModule,
        DropdownModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        MultiSelectModule,
        RadioButtonModule,
        SliderModule,
        SpinnerModule
    ],
    declarations: [
        DynamicFormPrimeNGComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFormPrimeNGComponent
    ]
})

export class DynamicFormsPrimeNGUIModule {
}