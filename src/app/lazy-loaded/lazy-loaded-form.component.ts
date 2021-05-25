import { Component } from "@angular/core";
import { DynamicFormService, DynamicFormControlModel } from "@ng-dynamic-forms/core";
import { LAZY_LOADED_FORM_MODEL } from "./lazy-loaded-form.model";

@Component({
    selector: "dynamic-lazy-loaded-form",
    templateUrl: "./lazy-loaded-form.component.html"
})
export class LazyLoadedFormComponent {
    formModel: DynamicFormControlModel[] = LAZY_LOADED_FORM_MODEL;
    formGroup = this.formService.createFormGroup(this.formModel);

    constructor(private formService: DynamicFormService) {
    }
}
