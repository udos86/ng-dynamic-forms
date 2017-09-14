import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicBasicFormControlComponent } from "./dynamic-basic-form-control.component";
import { DynamicBasicFormComponent } from "./dynamic-basic-form.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextMaskModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicBasicFormControlComponent,
        DynamicBasicFormComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicBasicFormControlComponent,
        DynamicBasicFormComponent
    ]
})

export class DynamicFormsBasicUIModule {
}