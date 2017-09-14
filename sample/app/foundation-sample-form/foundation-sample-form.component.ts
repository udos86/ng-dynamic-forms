import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormControlModel,
    DynamicFormArrayModel
} from "@ng-dynamic-forms/core";
import { FOUNDATION_SAMPLE_FORM_MODEL } from "./foundation-sample-form.model";

@Component({
    moduleId: module.id,
    selector: "dynamic-foundation-sample-form",
    styleUrls: ["../../../node_modules/foundation-sites/dist/css/foundation.css"],
    templateUrl: "./foundation-sample-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class FoundationSampleFormComponent implements OnInit {

    formModel: DynamicFormControlModel[] = FOUNDATION_SAMPLE_FORM_MODEL;
    formGroup: FormGroup;

    checkboxControl: FormControl;
    checkboxModel: DynamicCheckboxModel;

    arrayControl: FormArray;
    arrayModel: DynamicFormArrayModel;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {

        this.formGroup = this.formService.createFormGroup(this.formModel);

        this.checkboxControl = this.formGroup.controls["foundationCheckbox"] as FormControl;
        this.checkboxModel = this.formService.findById("foundationCheckbox", this.formModel) as DynamicCheckboxModel;

        this.arrayControl = this.formGroup.controls["foundationFormArray"] as FormArray;
        this.arrayModel = this.formService.findById("foundationFormArray", this.formModel) as DynamicFormArrayModel;
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