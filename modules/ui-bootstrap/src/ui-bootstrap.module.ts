import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormBootstrapComponent} from "./dynamic-form-bootstrap.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicFormBootstrapComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFormBootstrapComponent
    ]
})
export class DynamicFormsBootstrapUIModule {}