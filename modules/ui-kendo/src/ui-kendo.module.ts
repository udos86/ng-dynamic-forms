import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormKendoComponent} from "./dynamic-form-kendo.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicFormKendoComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFormKendoComponent
    ]
})
export class DynamicFormsKendoUIModule {}