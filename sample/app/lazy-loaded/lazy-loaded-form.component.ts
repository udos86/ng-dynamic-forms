import { Component } from "@angular/core";
import { DynamicFormService, DynamicFormControlModel } from "@ng-dynamic-forms/core";
import { LAZY_LOADED_FORM_MODEL } from "./lazy-loaded-form.model";
import { FormGroup } from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: "dynamic-lazy-loaded-form",
    templateUrl: "./lazy-loaded-form.component.html"
})
export class LazyLoadedFormComponent {

    formModel: DynamicFormControlModel[] = LAZY_LOADED_FORM_MODEL;
    formGroup: FormGroup;

    constructor(private formService: DynamicFormService) {
        this.formGroup = this.formService.createFormGroup(this.formModel);
    }
}
