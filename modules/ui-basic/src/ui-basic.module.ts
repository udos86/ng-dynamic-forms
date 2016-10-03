import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormBasicComponent} from "./dynamic-form-basic.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicFormBasicComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFormBasicComponent
    ]
})
export class DynamicFormsBasicUIModule {}