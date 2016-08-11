import {NgModule} from "@angular/core";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormBootstrapComponent} from "./dynamic-form-bootstrap.component";

@NgModule({
    declarations: [DynamicFormBootstrapComponent],
    providers: [],
    exports: [DynamicFormsCoreModule, DynamicFormBootstrapComponent]
})
export class DynamicFormsBootstrapModule {
}