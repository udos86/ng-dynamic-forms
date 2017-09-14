import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormService, DynamicFormControlModel } from "@ng-dynamic-forms/core";
import { MATERIAL_SAMPLE_FORM_MODEL } from "./material-sample-form.model";

@Component({
    moduleId: module.id,
    selector: "dynamic-material-sample-form",
    styleUrls: ["../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css"],
    templateUrl: "./material-sample-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class MaterialSampleFormComponent implements OnInit {

    formModel: DynamicFormControlModel[] = MATERIAL_SAMPLE_FORM_MODEL;
    formGroup: FormGroup;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {
        this.formGroup = this.formService.createFormGroup(this.formModel);
    }

    onChange($event) {
        console.log(`Material change event on: `, $event);
    }
}