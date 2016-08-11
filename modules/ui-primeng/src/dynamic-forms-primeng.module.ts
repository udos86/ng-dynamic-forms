import {NgModule} from "@angular/core";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormPrimeNGComponent} from "./dynamic-form-primeng.component";

@NgModule({
    imports: [],
    declarations: [DynamicFormPrimeNGComponent],
    providers: [],
    exports: [DynamicFormsCoreModule, DynamicFormPrimeNGComponent]
})
export class DynamicFormsPrimeNGModule {
}