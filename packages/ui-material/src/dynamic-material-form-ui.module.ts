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
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicMaterialFormControlComponent } from "./dynamic-material-form-control.component";
import { DynamicMaterialFormComponent } from "./dynamic-material-form.component";

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
        DynamicMaterialFormControlComponent,
        DynamicMaterialFormComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicMaterialFormControlComponent,
        DynamicMaterialFormComponent
    ]
})
export class DynamicFormsMaterialUIModule {
}