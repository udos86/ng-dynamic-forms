import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import {
    MdAutocompleteModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdInputModule,
    MdRadioModule,
    MdSelectModule,
    MdSliderModule,
    MdSlideToggleModule
} from "@angular/material";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicFormMaterialComponent } from "./dynamic-form-material.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        MdAutocompleteModule,
        MdCheckboxModule,
        MdDatepickerModule,
        MdInputModule,
        MdRadioModule,
        MdSelectModule,
        MdSliderModule,
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
export class DynamicFormsMaterialUIModule {
}