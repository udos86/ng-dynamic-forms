import {NgModule} from "@angular/core";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormBasicComponent} from "./dynamic-form-basic.component";

@NgModule({
    declarations: [DynamicFormBasicComponent],
    providers: [],
    exports: [DynamicFormsCoreModule, DynamicFormBasicComponent]
})
export class DynamicFormsBasicModule {
}