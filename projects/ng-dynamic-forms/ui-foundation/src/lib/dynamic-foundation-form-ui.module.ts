import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import {
    DynamicFoundationFormArrayComponent,
    DynamicFoundationFormControlContainerComponent,
    DynamicFoundationFormGroupComponent
} from "./dynamic-foundation-form-control-container.component";
import { DynamicFoundationFormComponent } from "./dynamic-foundation-form.component";
import { DynamicFoundationCheckboxComponent } from "./checkbox/dynamic-foundation-checkbox.component";
import { DynamicFoundationRadioGroupComponent } from "./radio-group/dynamic-foundation-radio-group.component";
import { DynamicFoundationInputComponent } from "./input/dynamic-foundation-input.component";
import { DynamicFoundationSelectComponent } from "./select/dynamic-foundation-select.component";
import { DynamicFoundationSwitchComponent } from "./switch/dynamic-foundation-switch.component";
import { DynamicFoundationTextAreaComponent } from "./textarea/dynamic-foundation-textarea.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxMaskModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicFoundationCheckboxComponent,
        DynamicFoundationFormArrayComponent,
        DynamicFoundationFormComponent,
        DynamicFoundationFormControlContainerComponent,
        DynamicFoundationFormGroupComponent,
        DynamicFoundationInputComponent,
        DynamicFoundationRadioGroupComponent,
        DynamicFoundationSelectComponent,
        DynamicFoundationSwitchComponent,
        DynamicFoundationTextAreaComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFoundationCheckboxComponent,
        DynamicFoundationFormArrayComponent,
        DynamicFoundationFormComponent,
        DynamicFoundationFormControlContainerComponent,
        DynamicFoundationFormGroupComponent,
        DynamicFoundationInputComponent,
        DynamicFoundationRadioGroupComponent,
        DynamicFoundationSelectComponent,
        DynamicFoundationSwitchComponent,
        DynamicFoundationTextAreaComponent
    ]
})
export class DynamicFormsFoundationUIModule {
}
