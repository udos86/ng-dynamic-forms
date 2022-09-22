import { Component } from "@angular/core";
import { UntypedFormArray } from "@angular/forms";
import {
    DynamicFormService,
    DynamicFormArrayModel,
    DynamicFormControlEvent
} from "@ng-dynamic-forms/core";
import { BASIC_SAMPLE_FORM_MODEL, BASIC_SAMPLE_FORM_ARRAY_MODEL } from "./basic-sample-form.model";

@Component({
    selector: "dynamic-basic-sample-form",
    templateUrl: "./basic-sample-form.component.html"
})
export class BasicSampleFormComponent {
    formModel1 = this.formService.fromJSON(JSON.stringify(BASIC_SAMPLE_FORM_MODEL));
    formModel2 = this.formService.fromJSON(JSON.stringify(BASIC_SAMPLE_FORM_ARRAY_MODEL));

    formGroup1 = this.formService.createFormGroup(this.formModel1);
    formGroup2 = this.formService.createFormGroup(this.formModel2);

    arrayModel = this.formService.findModelById<DynamicFormArrayModel>("basicFormArray", this.formModel2) as DynamicFormArrayModel;
    arrayControl = this.formService.findControlByModel<UntypedFormArray>(this.arrayModel as DynamicFormArrayModel, this.formGroup2) as UntypedFormArray;

    constructor(private formService: DynamicFormService) {
    }

    add() {
        this.formService.addFormArrayGroup(this.arrayControl, this.arrayModel);
    }

    remove(index: number) {
        this.formService.removeFormArrayGroup(index, this.arrayControl, this.arrayModel);
    }

    clear() {
        this.formService.clearFormArray(this.arrayControl, this.arrayModel);
    }

    onBlur($event: DynamicFormControlEvent) {
        console.log(`BLUR event on ${$event.model.id}: `, $event);
    }

    onChange($event: DynamicFormControlEvent) {
        console.log(`CHANGE event on ${$event.model.id}: `, $event);
    }

    onFocus($event: DynamicFormControlEvent) {
        console.log(`FOCUS event on ${$event.model.id}: `, $event);
    }
}
