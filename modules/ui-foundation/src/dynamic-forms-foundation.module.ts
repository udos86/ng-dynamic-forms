import {NgModule} from "@angular/core";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormFoundationSitesComponent} from "./dynamic-form-foundation-sites.component";

@NgModule({
    declarations: [DynamicFormFoundationSitesComponent],
    providers: [],
    exports: [DynamicFormsCoreModule, DynamicFormFoundationSitesComponent]
})
export class DynamicFormsFoundationModule {
}