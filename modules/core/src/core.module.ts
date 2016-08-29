import {NgModule} from "@angular/core";
import {DynamicFormService} from "./service/dynamic-form.service";
import {DynamicFormAutoFillService} from "./service/dynamic-form-autofill.service";

@NgModule({
    providers: [DynamicFormService, DynamicFormAutoFillService]
})

export class DynamicFormsCoreModule {
}