import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormService, DynamicFormControlModel } from "@ng2-dynamic-forms/core";
import { NG_BOOTSTRAP_FORM_MODEL } from "./ng-bootstrap-sample-form.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-ng-bootstrap-example",
    styleUrls: [],
    templateUrl: "./ng-bootstrap-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class NGBootstrapExampleComponent implements OnInit {

    formModel: DynamicFormControlModel[] = NG_BOOTSTRAP_FORM_MODEL;
    formGroup: FormGroup;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {
        this.formGroup = this.formService.createFormGroup(this.formModel);
    }
}