import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormService, DynamicFormControlModel, DynamicFormLayout, DynamicInputModel } from "@ng-dynamic-forms/core";
import { NG_BOOTSTRAP_SAMPLE_FORM_MODEL } from "./ng-bootstrap-sample-form.model";
import { NG_BOOTSTRAP_SAMPLE_FORM_LAYOUT } from "./ng-bootstrap-sample-form.layout";
import { DynamicNGBootstrapFormComponent } from "@ng-dynamic-forms/ui-ng-bootstrap";

@Component({
    selector: "dynamic-ng-bootstrap-sample-form",
    styleUrls: [],
    templateUrl: "./ng-bootstrap-sample-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class NGBootstrapSampleFormComponent implements OnInit {

    formModel: DynamicFormControlModel[] = NG_BOOTSTRAP_SAMPLE_FORM_MODEL;
    formGroup: FormGroup;
    formLayout: DynamicFormLayout = NG_BOOTSTRAP_SAMPLE_FORM_LAYOUT;

    @ViewChild(DynamicNGBootstrapFormComponent) formComponent: DynamicNGBootstrapFormComponent;

    constructor(private formService: DynamicFormService) {
    }

    onClick() {
        const model = this.formService.findModelById<DynamicInputModel>("firstName", this.formModel);

        model.label = "Updated Label";
        this.formService.detectChanges();

        model.value = "Test Value";
        model.disabled = true;
    }

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
