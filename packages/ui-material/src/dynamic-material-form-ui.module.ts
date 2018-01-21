import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import {
    MatAutocompleteModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule
} from "@angular/material";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicMaterialFormControlComponent } from "./dynamic-material-form-control.component";
import { DynamicMaterialFormComponent } from "./dynamic-material-form.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        TextMaskModule,
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