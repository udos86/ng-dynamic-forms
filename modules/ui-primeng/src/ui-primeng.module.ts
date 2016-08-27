import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormPrimeNGComponent} from "./dynamic-form-primeng.component";
import {
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    SpinnerModule
} from "primeng/primeng";

@NgModule({

    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicFormsCoreModule,
        CheckboxModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        RadioButtonModule,
        SpinnerModule
    ],
    declarations: [DynamicFormPrimeNGComponent],
    exports: [DynamicFormsCoreModule, DynamicFormPrimeNGComponent]
})

export class DynamicFormsPrimeNGUIModule {
}