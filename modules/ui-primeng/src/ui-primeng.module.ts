import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormPrimeNGComponent} from "./dynamic-form-primeng.component";
import {CheckboxModule} from "primeng/components/checkbox/checkbox";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {InputSwitchModule} from "primeng/components/inputswitch/inputswitch";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {InputTextareaModule} from "primeng/components/inputtextarea/inputtextarea";
import {RadioButtonModule} from "primeng/components/radiobutton/radiobutton";
import {SliderModule} from "primeng/components/slider/slider";
import {SpinnerModule} from "primeng/components/spinner/spinner";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        DynamicFormsCoreModule,
        CheckboxModule,
        DropdownModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
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

export class DynamicFormsPrimeNGUIModule {}