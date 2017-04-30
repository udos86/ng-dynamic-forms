import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { NgbDatepickerModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { DynamicFormNGBootstrapComponent } from "./dynamic-form-ng-bootstrap.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
        NgbTimepickerModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicFormNGBootstrapComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFormNGBootstrapComponent
    ]
})

export class DynamicFormsNGBootstrapUIModule {
}