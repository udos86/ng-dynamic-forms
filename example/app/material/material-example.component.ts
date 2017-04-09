import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormControlModel,
    DynamicFormArrayModel
} from "@ng2-dynamic-forms/core";
import { MATERIAL_EXAMPLE_MODEL } from "./material-example.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-material-example",
    styleUrls: ["../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css"],
    templateUrl: "./material-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class MaterialExampleComponent implements OnInit {

    formModel: DynamicFormControlModel[] = MATERIAL_EXAMPLE_MODEL;
    formGroup: FormGroup;

    checkboxControl: FormControl;
    checkboxModel: DynamicCheckboxModel;

    arrayControl: FormArray;
    arrayModel: DynamicFormArrayModel;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {

        this.formGroup = this.formService.createFormGroup(this.formModel);

        this.checkboxControl = this.formGroup.controls["exampleCheckbox"] as FormControl;
        this.checkboxModel = this.formService.findById("exampleCheckbox", this.formModel) as DynamicCheckboxModel;

        this.arrayControl = this.formGroup.controls["materialFormArray"] as FormArray;
        this.arrayModel = this.formService.findById("materialFormArray", this.formModel) as DynamicFormArrayModel;
    }

    add() {
        this.formService.addFormArrayGroup(this.arrayControl, this.arrayModel);
    }

    remove(index: number) {
        this.formService.removeFormArrayGroup(index, this.arrayControl, this.arrayModel);
    }

    onChange($event) {
        console.log(`CHANGE event on: `, $event);
    }
}