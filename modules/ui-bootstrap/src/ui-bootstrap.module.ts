import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicFormBootstrapComponent } from "./dynamic-form-bootstrap.component";
import { Ng2DatetimePickerModule } from "ng2-datetime-picker";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        DynamicFormsCoreModule,
        Ng2DatetimePickerModule
    ],
    declarations: [
        DynamicFormBootstrapComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFormBootstrapComponent
    ]
})

export class DynamicFormsBootstrapUIModule {
}