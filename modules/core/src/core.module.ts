import {NgModule, Optional, SkipSelf, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormService} from "./service/dynamic-form.service";
import {DynamicFormAutoFillService} from "./service/dynamic-form-autofill.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class DynamicFormsCoreModule {

    constructor(@Optional() @SkipSelf() parentModule: DynamicFormsCoreModule) {

        if (parentModule) {
            throw new Error("DynamicFormsCoreModule should only be imported in the root NgModule of the application!");
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DynamicFormsCoreModule,
            providers: [DynamicFormService, DynamicFormAutoFillService]
        };
    }
}