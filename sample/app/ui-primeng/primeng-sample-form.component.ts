import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormService, DynamicFormControlModel } from "@ng-dynamic-forms/core";
import { PRIME_NG_SAMPLE_FORM_MODEL } from "./primeng-sample-form.model";

@Component({
    moduleId: module.id,
    selector: "dynamic-primeng-sample-form",
    styleUrls: [
        "../../../node_modules/primeng/resources/themes/omega/theme.css",
        "../../../node_modules/primeng/resources/primeng.min.css",
        "../../../node_modules/quill/dist/quill.core.css",
        "../../../node_modules/quill/dist/quill.snow.css",
    ],
    templateUrl: "./primeng-sample-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class PrimeNGSampleFormComponent implements OnInit {

    formModel: DynamicFormControlModel[] = PRIME_NG_SAMPLE_FORM_MODEL;
    formGroup: FormGroup;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {
        this.formGroup = this.formService.createFormGroup(this.formModel);
    }

    onChange($event) {
        console.log(`PrimeNG change event on ${$event.model.id}: `, $event);
    }
}