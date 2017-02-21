import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
//import { NgSemanticModule } from "ng-semantic";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicFormSemanticComponent } from "./dynamic-form-semantic.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        //NgSemanticModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicFormSemanticComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFormSemanticComponent
    ]
})

export class DynamicFormsSemanticUIModule {
}