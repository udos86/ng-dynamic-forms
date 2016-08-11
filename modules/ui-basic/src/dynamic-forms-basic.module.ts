import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormBasicComponent} from "./dynamic-form-basic.component";

@NgModule({

    imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    declarations: [DynamicFormBasicComponent],
    providers: [],
    exports: [DynamicFormsCoreModule, DynamicFormBasicComponent]
})
export class DynamicFormsBasicModule {
}