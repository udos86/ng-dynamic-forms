import {NgModule} from "@angular/core";
import {DynamicFormService} from "./service/dynamic-form.service";
import {DynamicFormAutoFillService} from "./service/dynamic-form-autofill.service";

@NgModule({

    declarations: [],
    providers: [DynamicFormService, DynamicFormAutoFillService],
    exports: []
})
export class DynamicFormsCoreModule {
}