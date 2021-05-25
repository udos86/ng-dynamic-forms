import { Component, ViewEncapsulation } from "@angular/core";
import { DynamicFormService, DynamicFormControlEvent, DynamicFormControlModel, DynamicFormLayout } from "@ng-dynamic-forms/core";
import { KENDO_SAMPLE_FORM_MODEL } from "./kendo-sample-form.model";
import { KENDO_SAMPLE_FORM_LAYOUT } from "./kendo-sample-form.layout";

@Component({
    selector: "dynamic-kendo-sample-form",
    styleUrls: ["../../../node_modules/@progress/kendo-theme-default/dist/all.css"],
    templateUrl: "./kendo-sample-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class KendoSampleFormComponent {
    formModel: DynamicFormControlModel[] = KENDO_SAMPLE_FORM_MODEL;
    formLayout: DynamicFormLayout = KENDO_SAMPLE_FORM_LAYOUT;
    formGroup = this.formService.createFormGroup(this.formModel);

    constructor(private formService: DynamicFormService) {
    }

    onBlur($event: DynamicFormControlEvent) {
        console.log(`Kendo blur event on: ${$event.model.id}: `, $event);
    }

    onChange($event: DynamicFormControlEvent) {
        console.log(`Kendo change event on: ${$event.model.id}: `, $event);
    }

    onFocus($event: DynamicFormControlEvent) {
        console.log(`Kendo focus event on: ${$event.model.id}: `, $event);
    }

    onKendoEvent($event: DynamicFormControlEvent) {
        console.log(`Kendo ${$event.type} event on: ${$event.model.id}: `, $event);
    }
}
