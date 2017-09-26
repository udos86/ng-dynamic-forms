import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
//import { BsDatepickerModule } from "ngx-bootstrap";
//import { TimepickerModule } from "ngx-bootstrap";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicBootstrapFormControlComponent } from "./dynamic-bootstrap-form-control.component";
import { DynamicBootstrapFormComponent } from "./dynamic-bootstrap-form.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        //BsDatepickerModule,
        //TimePickerModule.forRoot()
        TextMaskModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicBootstrapFormControlComponent,
        DynamicBootstrapFormComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicBootstrapFormControlComponent,
        DynamicBootstrapFormComponent
    ]
})
export class DynamicFormsBootstrapUIModule {
}