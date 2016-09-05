import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormPrimeNGComponent} from "./dynamic-form-primeng.component";
import {CheckboxModule} from "primeng/components/checkbox/checkbox";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {InputTextareaModule} from "primeng/components/inputtextarea/inputtextarea";
import {RadioButtonModule} from "primeng/components/radiobutton/radiobutton";
import {SpinnerModule} from "primeng/components/spinner/spinner";

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
    declarations: [
        DynamicFormPrimeNGComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFormPrimeNGComponent
    ]
})
export class DynamicFormsPrimeNGUIModule {}