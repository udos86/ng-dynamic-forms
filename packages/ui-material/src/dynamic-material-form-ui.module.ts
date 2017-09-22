import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import {
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule
} from "@angular/material";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicMaterialFormControlComponent } from "./dynamic-material-form-control.component";
import { DynamicMaterialFormComponent } from "./dynamic-material-form.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
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