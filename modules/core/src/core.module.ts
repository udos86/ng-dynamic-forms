import {NgModule, ModuleWithProviders} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormService} from "./service/dynamic-form.service";
import {DynamicFormAutoFillService} from "./service/dynamic-form-autofill.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class DynamicFormsCoreModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DynamicFormsCoreModule,
            providers: [DynamicFormService, DynamicFormAutoFillService]
        };
    }
}