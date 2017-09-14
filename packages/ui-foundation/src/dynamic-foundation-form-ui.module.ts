import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFoundationFormControlComponent } from "./dynamic-foundation-form-control.component";
import { DynamicFoundationFormComponent } from "./dynamic-foundation-form.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextMaskModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicFoundationFormControlComponent,
        DynamicFoundationFormComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFoundationFormControlComponent,
        DynamicFoundationFormComponent
    ]
})

export class DynamicFormsFoundationUIModule {
}