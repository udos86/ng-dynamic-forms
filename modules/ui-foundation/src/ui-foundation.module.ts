import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormFoundationSitesComponent} from "./dynamic-form-foundation-sites.component";

@NgModule({

    imports: [BrowserModule, FormsModule, ReactiveFormsModule, DynamicFormsCoreModule],
    declarations: [DynamicFormFoundationSitesComponent],
    providers: [],
    exports: [DynamicFormsCoreModule, DynamicFormFoundationSitesComponent]
})

export class DynamicFormsFoundationUIModule {
}