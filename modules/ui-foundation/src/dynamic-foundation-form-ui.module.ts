import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicFoundationFormControlComponent } from "./dynamic-foundation-form-control.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextMaskModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicFoundationFormControlComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFoundationFormControlComponent
    ]
})

export class DynamicFormsFoundationUIModule {
}