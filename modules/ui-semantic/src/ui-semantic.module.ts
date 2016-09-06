import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormSemanticComponent} from "./dynamic-form-semantic.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
export class DynamicFormsSemanticUIModule {}