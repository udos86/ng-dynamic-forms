import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormService, DynamicFormControlModel, DynamicFormLayout } from "@ng-dynamic-forms/core";
import { NG_BOOTSTRAP_SAMPLE_FORM_MODEL } from "./ng-bootstrap-sample-form.model";
import { NG_BOOTSTRAP_SAMPLE_FORM_LAYOUT } from "./ng-bootstrap-sample-form.layout";

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
    formLayout: DynamicFormLayout = NG_BOOTSTRAP_SAMPLE_FORM_LAYOUT;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {
        this.formGroup = this.formService.createFormGroup(this.formModel);
    }

    onBlur($event) {
        console.log(`NG Bootstrap blur event on: ${$event.model.id}: `, $event);
    }

    onChange($event) {
        console.log(`NG Bootstrap change event on: ${$event.model.id}: `, $event);
    }

    onFocus($event) {
        console.log(`NG Bootstrap focus event on: ${$event.model.id}: `, $event);
    }

    onNgbEvent($event) {
        console.log(`NG Bootstrap ${$event.type} event on: ${$event.model.id}: `, $event);
    }
}