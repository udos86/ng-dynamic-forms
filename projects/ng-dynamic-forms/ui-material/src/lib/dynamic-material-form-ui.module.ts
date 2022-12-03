import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { MatLegacyCheckboxModule as MatCheckboxModule } from "@angular/material/legacy-checkbox";
import { MatLegacyChipsModule as MatChipsModule } from "@angular/material/legacy-chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyRadioModule as MatRadioModule } from "@angular/material/legacy-radio";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacySlideToggleModule as MatSlideToggleModule } from "@angular/material/legacy-slide-toggle";
import { MatLegacySliderModule as MatSliderModule } from "@angular/material/legacy-slider";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import {
    DynamicMaterialFormArrayComponent,
    DynamicMaterialFormControlContainerComponent,
    DynamicMaterialFormGroupComponent
} from "./dynamic-material-form-control-container.component";
import { DynamicMaterialFormComponent } from "./dynamic-material-form.component";
import { DynamicMaterialCheckboxComponent } from "./checkbox/dynamic-material-checkbox.component";
import { DynamicMaterialChipsComponent } from "./chips/dynamic-material-chips.component";
import { DynamicMaterialDatePickerComponent } from "./datepicker/dynamic-material-datepicker.component";
import { DynamicMaterialInputComponent } from "./input/dynamic-material-input.component";
import { DynamicMaterialRadioGroupComponent } from "./radio-group/dynamic-material-radio-group.component";
import { DynamicMaterialSelectComponent } from "./select/dynamic-material-select.component";
import { DynamicMaterialSlideToggleComponent } from "./slide-toggle/dynamic-material-slide-toggle.component";
import { DynamicMaterialSliderComponent } from "./slider/dynamic-material-slider.component";
import { DynamicMaterialTextAreaComponent } from "./textarea/dynamic-material-textarea.component";

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
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicMaterialCheckboxComponent,
        DynamicMaterialChipsComponent,
        DynamicMaterialDatePickerComponent,
        DynamicMaterialFormArrayComponent,
        DynamicMaterialFormComponent,
        DynamicMaterialFormControlContainerComponent,
        DynamicMaterialFormGroupComponent,
        DynamicMaterialInputComponent,
        DynamicMaterialRadioGroupComponent,
        DynamicMaterialSelectComponent,
        DynamicMaterialSlideToggleComponent,
        DynamicMaterialSliderComponent,
        DynamicMaterialTextAreaComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicMaterialCheckboxComponent,
        DynamicMaterialChipsComponent,
        DynamicMaterialDatePickerComponent,
        DynamicMaterialFormArrayComponent,
        DynamicMaterialFormComponent,
        DynamicMaterialFormControlContainerComponent,
        DynamicMaterialFormGroupComponent,
        DynamicMaterialInputComponent,
        DynamicMaterialRadioGroupComponent,
        DynamicMaterialSelectComponent,
        DynamicMaterialSlideToggleComponent,
        DynamicMaterialSliderComponent,
        DynamicMaterialTextAreaComponent
    ]
})
export class DynamicFormsMaterialUIModule {
}
