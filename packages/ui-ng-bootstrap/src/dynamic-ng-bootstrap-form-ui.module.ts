import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { NgbDatepickerModule, NgbButtonsModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicNGBootstrapFormControlComponent } from "./dynamic-ng-bootstrap-form-control.component";
import { DynamicNGBootstrapFormComponent } from "./dynamic-ng-bootstrap-form.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbButtonsModule,
        NgbDatepickerModule,
        NgbTimepickerModule,
        TextMaskModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicNGBootstrapFormControlComponent,
        DynamicNGBootstrapFormComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicNGBootstrapFormControlComponent,
        DynamicNGBootstrapFormComponent
    ]
})

export class DynamicFormsNGBootstrapUIModule {
}