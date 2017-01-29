import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormControlModel,
    DynamicFormArrayModel
} from "@ng2-dynamic-forms/core";
import { BASIC_EXAMPLE_MODEL, BASIC_EXAMPLE_ARRAY_MODEL } from "./basic-example.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-basic-example",
    templateUrl: "./basic-example.component.html"
})

export class BasicExampleComponent implements OnInit {

    formModel1: Array<DynamicFormControlModel>;
    formModel2: Array<DynamicFormControlModel>;

    formGroup1: FormGroup;
    formGroup2: FormGroup;

    checkboxControl: FormControl;
    checkboxModel: DynamicCheckboxModel;

    arrayControl: FormArray;
    arrayModel: DynamicFormArrayModel;

    constructor(private formService: DynamicFormService) {

        //this.formModel1 = BASIC_EXAMPLE_MODEL;
        //this.formModel2 = BASIC_EXAMPLE_ARRAY_MODEL;

        this.formModel1 = this.formService.fromJSON(JSON.stringify(BASIC_EXAMPLE_MODEL));
        this.formModel2 = this.formService.fromJSON(JSON.stringify(BASIC_EXAMPLE_ARRAY_MODEL));

        this.formGroup1 = this.formService.createFormGroup(this.formModel1);
        this.formGroup2 = this.formService.createFormGroup(this.formModel2);
    }

    ngOnInit() {

        this.checkboxControl = <FormControl> this.formGroup1.controls["basicCheckbox"]; // Type assertion for having updateValue method available
        this.checkboxModel = <DynamicCheckboxModel> this.formService.findById("basicCheckbox", this.formModel1);

        this.arrayControl = <FormArray> this.formGroup2.controls["basicFormArray"]; // Type assertion for having updateValue method available
        this.arrayModel = <DynamicFormArrayModel> this.formService.findById("basicFormArray", this.formModel2);

        //this.checkboxControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));
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