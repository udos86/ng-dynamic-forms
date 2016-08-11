import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormPrimeNGComponent} from "./dynamic-form-primeng.component";

@NgModule({

    imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    declarations: [DynamicFormPrimeNGComponent],
    providers: [],
    exports: [DynamicFormsCoreModule, DynamicFormPrimeNGComponent]
})
export class DynamicFormsPrimeNGModule {
}