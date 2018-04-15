import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicBasicFormControlContainerComponent } from "./dynamic-basic-form-control-container.component";
import { DynamicBasicFormComponent } from "./dynamic-basic-form.component";
import { DynamicBasicCheckboxComponent } from "./checkbox/dynamic-basic-checkbox.component";
import { DynamicBasicFormArrayComponent } from "./form-array/dynamic-basic-form-array.component";
import { DynamicBasicFormGroupComponent } from "./form-group/dynamic-basic-form-group.component";
import { DynamicBasicInputComponent } from "./input/dynamic-basic-input.component";
import { DynamicBasicRadioGroupComponent } from "./radio-group/dynamic-basic-radio-group.component";
import { DynamicBasicSelectComponent } from "./select/dynamic-basic-select.component";
import { DynamicBasicTextAreaComponent } from "./textarea/dynamic-basic-textarea.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextMaskModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicBasicCheckboxComponent,
        DynamicBasicFormArrayComponent,
        DynamicBasicFormGroupComponent,
        DynamicBasicInputComponent,
        DynamicBasicRadioGroupComponent,
        DynamicBasicSelectComponent,
        DynamicBasicTextAreaComponent,
        DynamicBasicFormControlContainerComponent,
        DynamicBasicFormComponent
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
        DynamicBasicFormControlContainerComponent,
        DynamicBasicFormComponent
    ]
})

export class DynamicFormsBasicUIModule {}