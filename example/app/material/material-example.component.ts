import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, FormArray} from "@angular/forms";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormControlModel,
    DynamicFormArrayModel
} from "@ng2-dynamic-forms/core";
import {MATERIAL_EXAMPLE_MODEL} from "./material-example.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-material-example",
    templateUrl: "./material-example.component.html",
})

export class MaterialExampleComponent implements OnInit {

    dynamicFormModel: Array<DynamicFormControlModel>;
    form: FormGroup;

    exampleCheckboxControl: FormControl;
    exampleCheckboxModel: DynamicCheckboxModel;

    sampleArrayControl: FormArray;
    sampleArrayModel: DynamicFormArrayModel;

    constructor(private dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = MATERIAL_EXAMPLE_MODEL;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createFormGroup(this.dynamicFormModel);

        this.exampleCheckboxControl = <FormControl> this.form.controls["exampleCheckbox"]; // Type assertion for having updateValue method available
        this.exampleCheckboxModel = <DynamicCheckboxModel> this.dynamicFormService.findById("exampleCheckbox", this.dynamicFormModel);

        this.sampleArrayControl = <FormArray> this.form.controls["materialFormArray"];
        this.sampleArrayModel = <DynamicFormArrayModel> this.dynamicFormService.findById("materialFormArray", this.dynamicFormModel);
    }

    add() {
        this.dynamicFormService.addFormArrayGroup(this.sampleArrayControl, this.sampleArrayModel);
    }

    remove(index: number) {
        this.dynamicFormService.removeFormArrayGroup(index, this.sampleArrayControl, this.sampleArrayModel);
    }
}