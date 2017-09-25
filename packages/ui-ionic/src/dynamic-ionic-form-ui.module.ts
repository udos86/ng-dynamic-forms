import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "ionic-angular";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicIonicFormControlComponent } from "./dynamic-ionic-form-control.component";
import { DynamicIonicFormComponent } from "./dynamic-ionic-form.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        TextMaskModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicIonicFormControlComponent,
        DynamicIonicFormComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicIonicFormControlComponent,
        DynamicIonicFormComponent
    ]
})
export class DynamicFormsIonicUIModule {
}