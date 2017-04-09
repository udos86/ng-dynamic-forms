import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "ionic-angular";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicFormIonicComponent } from "./dynamic-form-ionic.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicFormIonicComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFormIonicComponent
    ]
})

export class DynamicFormsIonicUIModule {
}