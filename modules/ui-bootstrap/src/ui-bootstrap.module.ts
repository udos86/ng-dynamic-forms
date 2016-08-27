import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormBootstrapComponent} from "./dynamic-form-bootstrap.component";

@NgModule({

    imports: [BrowserModule, FormsModule, ReactiveFormsModule, DynamicFormsCoreModule],
    declarations: [DynamicFormBootstrapComponent],
    exports: [DynamicFormsCoreModule, DynamicFormBootstrapComponent]
})

export class DynamicFormsBootstrapUIModule {
}