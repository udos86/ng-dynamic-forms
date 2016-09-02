import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MdCheckboxModule} from "@angular2-material/checkbox";
import {MdInputModule} from "@angular2-material/input";
import {MdRadioModule} from "@angular2-material/radio";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormMaterialComponent} from "./dynamic-form-material.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MdCheckboxModule,
        MdInputModule,
        MdRadioModule,
        DynamicFormsCoreModule
    ],
    declarations: [DynamicFormMaterialComponent],
    exports: [DynamicFormMaterialComponent]
})
export class DynamicFormsMaterialUIModule {}