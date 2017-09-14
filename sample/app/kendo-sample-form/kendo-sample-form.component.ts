import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormService, DynamicFormControlModel } from "@ng-dynamic-forms/core";
import { KENDO_SAMPLE_FORM_MODEL } from "./kendo-sample-form.model";

@Component({
    moduleId: module.id,
    selector: "dynamic-kendo-sample-form",
    styleUrls: ["../../../node_modules/@progress/kendo-theme-default/dist/all.css"],
    templateUrl: "./kendo-sample-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class KendoSampleFormComponent implements OnInit {

    formModel: DynamicFormControlModel[] = KENDO_SAMPLE_FORM_MODEL;
    formGroup: FormGroup;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {
        this.formGroup = this.formService.createFormGroup(this.formModel);
    }

    onChange($event) {
        console.log(`Kendo change event on: `, $event);
    }
}