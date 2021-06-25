import { Component, ViewEncapsulation } from "@angular/core";
import { DynamicFormService, DynamicFormControlModel, DynamicFormLayout, DynamicFormControlEvent } from "@ng-dynamic-forms/core";
import { PRIME_NG_SAMPLE_FORM_MODEL } from "./primeng-sample-form.model";
import { PRIME_NG_SAMPLE_FORM_LAYOUT } from "./primeng-sample-form.layout";

@Component({
    selector: "dynamic-primeng-sample-form",
    styleUrls: [
        "../../../node_modules/primeng/resources/themes/nova/theme.css",
        "../../../node_modules/primeng/resources/primeng.min.css",
        "../../../node_modules/quill/dist/quill.core.css",
        "../../../node_modules/quill/dist/quill.snow.css"
    ],
    templateUrl: "./primeng-sample-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class PrimeNGSampleFormComponent {
    formModel: DynamicFormControlModel[] = PRIME_NG_SAMPLE_FORM_MODEL;
    formLayout: DynamicFormLayout = PRIME_NG_SAMPLE_FORM_LAYOUT;
    formGroup = this.formService.createFormGroup(this.formModel);

    constructor(private formService: DynamicFormService) {
    }

    onChange($event: DynamicFormControlEvent) {
        console.log(`PrimeNG change event on ${$event.model.id}: `, $event);
    }

    onPEvent($event: DynamicFormControlEvent) {
        console.log(`PrimeNG ${$event.type} event on ${$event.model.id}: `, $event);
    }
}
