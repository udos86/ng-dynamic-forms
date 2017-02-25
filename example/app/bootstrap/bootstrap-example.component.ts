import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import {
    DynamicFormService,
    DynamicFormControlModel,
    DynamicFormGroupModel,
    DynamicFormArrayModel,
    DynamicInputModel
} from "@ng2-dynamic-forms/core";
import { BOOTSTRAP_EXAMPLE_MODEL } from "./bootstrap-example.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-bootstrap-example",
    styleUrls: ["../../../node_modules/bootstrap/dist/css/bootstrap.min.css"],
    templateUrl: "./bootstrap-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class BootstrapExampleComponent implements OnInit {

    formModel: DynamicFormControlModel[] = BOOTSTRAP_EXAMPLE_MODEL;
    formGroup: FormGroup;

    exampleControl: FormControl;
    exampleModel: DynamicInputModel;

    arrayControl: FormArray;
    arrayModel: DynamicFormArrayModel;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {

        this.formGroup = this.formService.createFormGroup(this.formModel);

        this.exampleControl = this.formGroup.get("bootstrapFormGroup1").get("bootstrapInput") as FormControl;
        this.exampleModel = this.formService.findById("bootstrapInput", this.formModel) as DynamicInputModel;

        this.arrayControl = this.formGroup.get("bootstrapFormGroup2").get("bootstrapFormArray") as FormArray;
        this.arrayModel = this.formService.findById("bootstrapFormArray", this.formModel) as DynamicFormArrayModel;
    }

    add() {
        this.formService.addFormArrayGroup(this.arrayControl, this.arrayModel);
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

    clear() {
        this.formService.clearFormArray(this.arrayControl, this.arrayModel);
    }

    test() {
        //this.exampleModel.disabledUpdates.next(!this.exampleModel.disabled);
        //this.exampleModel.valueUpdates.next("Hello Hello");
        //console.log(JSON.stringify(this.exampleModel));
        //this.arrayModel.get(1).group[0].valueUpdates.next("This is just a test");
        //this.formService.moveFormArrayGroup(2, -1, this.arrayControl, this.arrayModel);
        this.formService.removeFormGroupControl(
            1,
            this.formGroup.get("bootstrapFormGroup1") as FormGroup,
            this.formModel[0] as DynamicFormGroupModel
        );
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