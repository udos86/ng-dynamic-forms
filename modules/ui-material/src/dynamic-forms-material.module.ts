import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormMaterialComponent} from "./dynamic-form-material.component";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    declarations: [DynamicFormMaterialComponent],
    providers: [],
    exports: [DynamicFormsCoreModule, DynamicFormMaterialComponent]
})
export class DynamicFormsMaterialModule {
}