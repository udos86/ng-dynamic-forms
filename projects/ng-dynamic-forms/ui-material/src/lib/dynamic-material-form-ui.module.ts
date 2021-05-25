import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { TextMaskModule } from "angular2-text-mask";
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
        TextMaskModule,
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
    entryComponents: [
        DynamicMaterialCheckboxComponent,
        DynamicMaterialChipsComponent,
        DynamicMaterialDatePickerComponent,
        DynamicMaterialFormArrayComponent,
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
