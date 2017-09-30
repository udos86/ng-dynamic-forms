import { Component } from "@angular/core";
import { DynamicFormService, DynamicFormControlModel } from "@ng-dynamic-forms/core";
import { ASYNC_SAMPLE_FORM_MODEL } from "./async-sample-form.model";
import { FormGroup } from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: "dynamic-async-sample-form",
    templateUrl: "./async-sample-form.component.html"
})
export class AsyncSampleFormComponent {

    formModel: DynamicFormControlModel[] = ASYNC_SAMPLE_FORM_MODEL;
    formGroup: FormGroup;

    constructor(private formService: DynamicFormService) {
        this.formGroup = this.formService.createFormGroup(this.formModel);
    }
}