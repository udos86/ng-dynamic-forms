import { Component, ViewEncapsulation } from "@angular/core";
import {
    DynamicFormService,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormControlEvent
} from "@ng-dynamic-forms/core";
import { MATERIAL_SAMPLE_FORM_MODEL } from "./material-sample-form.model";
import { MATERIAL_SAMPLE_FORM_LAYOUT } from "./material-sample-form.layout";

@Component({
    selector: "dynamic-material-sample-form",
    styleUrls: ["../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css"],
    templateUrl: "./material-sample-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class MaterialSampleFormComponent {
    formModel: DynamicFormControlModel[] = MATERIAL_SAMPLE_FORM_MODEL;
    formGroup = this.formService.createFormGroup(this.formModel);
    formLayout: DynamicFormLayout = MATERIAL_SAMPLE_FORM_LAYOUT;

    constructor(private formService: DynamicFormService) {
    }

    onBlur($event: DynamicFormControlEvent) {
        console.log(`Material blur event on: ${$event.model.id}: `, $event);
    }

    onChange($event: DynamicFormControlEvent) {
        console.log(`Material change event on: ${$event.model.id}: `, $event);
    }

    onFocus($event: DynamicFormControlEvent) {
        console.log(`Material focus event on: ${$event.model.id}: `, $event);
    }

    onMatEvent($event: DynamicFormControlEvent) {
        console.log(`Material ${$event.type} event on: ${$event.model.id}: `, $event);
    }
}
