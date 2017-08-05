import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicBasicFormControlComponent } from "./dynamic-basic-form-control.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextMaskModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicBasicFormControlComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicBasicFormControlComponent
    ]
})

export class DynamicFormsBasicUIModule {
}