import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MdCheckboxModule} from "@angular2-material/checkbox";
import {MdInputModule} from "@angular2-material/input";
import {MdRadioModule} from "@angular2-material/radio";
import {MdSlideToggleModule} from "@angular2-material/slide-toggle";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormMaterialComponent} from "./dynamic-form-material.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MdCheckboxModule,
        MdInputModule,
        MdRadioModule,
        MdSlideToggleModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicFormMaterialComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFormMaterialComponent
    ]
})
export class DynamicFormsMaterialUIModule {}