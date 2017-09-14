import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormService, DynamicFormControlModel } from "@ng-dynamic-forms/core";
import { NG_BOOTSTRAP_SAMPLE_FORM_MODEL } from "./ng-bootstrap-sample-form.model";

@Component({
    moduleId: module.id,
    selector: "dynamic-ng-bootstrap-sample-form",
    styleUrls: [],
    templateUrl: "./ng-bootstrap-sample-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class NGBootstrapSampleFormComponent implements OnInit {

    formModel: DynamicFormControlModel[] = NG_BOOTSTRAP_SAMPLE_FORM_MODEL;
    formGroup: FormGroup;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {
        this.formGroup = this.formService.createFormGroup(this.formModel);
    }
}