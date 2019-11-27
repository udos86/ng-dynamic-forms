import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import {
    DynamicCheckboxModel,
    DynamicFormArrayModel,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormService
} from "@ng-dynamic-forms/core";
import { FOUNDATION_SAMPLE_FORM_MODEL } from "./foundation-sample-form.model";
import { FOUNDATION_SAMPLE_FORM_LAYOUT } from "./foundation-sample-form.layout";

@Component({
    selector: "dynamic-foundation-sample-form",
    styleUrls: ["../../../node_modules/foundation-sites/dist/css/foundation.css"],
    templateUrl: "./foundation-sample-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class FoundationSampleFormComponent implements OnInit {

    formModel: DynamicFormControlModel[] = FOUNDATION_SAMPLE_FORM_MODEL;
    formGroup: FormGroup;
    formLayout: DynamicFormLayout = FOUNDATION_SAMPLE_FORM_LAYOUT;

    checkboxControl: FormControl;
    checkboxModel: DynamicCheckboxModel;

    arrayControl: FormArray;
    arrayModel: DynamicFormArrayModel;

    constructor(private formService: DynamicFormService) {
    }

    ngOnInit() {

        this.formGroup = this.formService.createFormGroup(this.formModel);

        this.checkboxModel = this.formService.findModelById<DynamicCheckboxModel>("foundationCheckbox", this.formModel);
        this.checkboxControl = this.formService.findControlByModel<FormControl>(this.checkboxModel, this.formGroup);

        this.arrayModel = this.formService.findModelById<DynamicFormArrayModel>("foundationFormArray", this.formModel);
        this.arrayControl = this.formService.findControlByModel <FormArray>(this.arrayModel, this.formGroup);
    }

    insert(context: DynamicFormArrayModel, index: number) {
        this.formService.insertFormArrayGroup(index, this.arrayControl, context);
    }

    remove(context: DynamicFormArrayModel, index: number) {
        this.formService.removeFormArrayGroup(index, this.arrayControl, context);
    }

    move(context: DynamicFormArrayModel, index: number, step: number) {
        this.formService.moveFormArrayGroup(index, step, this.arrayControl, context);
    }

    onBlur($event) {
        console.log(`BLUR event on ${$event.model.id}: `, $event);
    }

    onChange($event) {
        console.log(`CHANGE event on ${$event.model.id}: `, $event);
    }

    onFocus($event) {
        console.log(`FOCUS event on ${$event.model.id}: `, $event);
    }
}
