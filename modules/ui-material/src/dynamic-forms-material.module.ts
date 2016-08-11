import {NgModule} from "@angular/core";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormMaterialComponent} from "./dynamic-form-material.component";

@NgModule({
    imports: [],
    declarations: [DynamicFormMaterialComponent],
    providers: [],
    exports: [DynamicFormsCoreModule, DynamicFormMaterialComponent]
})
export class DynamicFormsMaterialModule {
}