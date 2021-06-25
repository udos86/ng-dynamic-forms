import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import {
    DynamicBasicFormArrayComponent,
    DynamicBasicFormControlContainerComponent,
    DynamicBasicFormGroupComponent
} from "./dynamic-basic-form-control-container.component";
import { DynamicBasicFormComponent } from "./dynamic-basic-form.component";
import { DynamicBasicCheckboxComponent } from "./checkbox/dynamic-basic-checkbox.component";
import { DynamicBasicInputComponent } from "./input/dynamic-basic-input.component";
import { DynamicBasicRadioGroupComponent } from "./radio-group/dynamic-basic-radio-group.component";
import { DynamicBasicSelectComponent } from "./select/dynamic-basic-select.component";
import { DynamicBasicTextAreaComponent } from "./textarea/dynamic-basic-textarea.component";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxMaskModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicBasicCheckboxComponent,
        DynamicBasicFormArrayComponent,
        DynamicBasicFormComponent,
        DynamicBasicFormControlContainerComponent,
        DynamicBasicFormGroupComponent,
        DynamicBasicInputComponent,
        DynamicBasicRadioGroupComponent,
        DynamicBasicSelectComponent,
        DynamicBasicTextAreaComponent
    ],
    entryComponents: [
        DynamicBasicCheckboxComponent,
        DynamicBasicFormArrayComponent,
        DynamicBasicFormGroupComponent,
        DynamicBasicInputComponent,
        DynamicBasicRadioGroupComponent,
        DynamicBasicSelectComponent,
        DynamicBasicTextAreaComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicBasicCheckboxComponent,
        DynamicBasicFormArrayComponent,
        DynamicBasicFormComponent,
        DynamicBasicFormControlContainerComponent,
        DynamicBasicFormGroupComponent,
        DynamicBasicInputComponent,
        DynamicBasicRadioGroupComponent,
        DynamicBasicSelectComponent,
        DynamicBasicTextAreaComponent
    ]
})

export class DynamicFormsBasicUIModule {
}
