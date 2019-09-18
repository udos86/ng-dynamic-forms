import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import {
    DynamicFormArrayModel,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormService,
    DynamicInputModel
} from "@ng-dynamic-forms/core";
import { BOOTSTRAP_SAMPLE_FORM_MODEL } from "./bootstrap-sample-form.model";
import { BOOTSTRAP_SAMPLE_FORM_LAYOUT } from "./bootstrap-sample-form.layout";

@Component({
    selector: "dynamic-bootstrap-sample-form",
    //styleUrls: ["../../../node_modules/bootstrap/dist/css/bootstrap.min.css"],
    templateUrl: "./bootstrap-sample-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class BootstrapSampleFormComponent implements OnInit {

    formModel: DynamicFormControlModel[] = BOOTSTRAP_SAMPLE_FORM_MODEL;
    formGroup: FormGroup;
    formLayout: DynamicFormLayout = BOOTSTRAP_SAMPLE_FORM_LAYOUT;

    sampleFormControl: FormControl;
    sampleFormControlModel: DynamicInputModel;

    formArray: FormArray;
    formArrayModel: DynamicFormArrayModel;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {

        this.formGroup = this.formService.createFormGroup(this.formModel);

        this.sampleFormControlModel = this.formService.findById("bsInput", this.formModel) as DynamicInputModel;
        this.sampleFormControl = this.formService.findControlByModel(this.sampleFormControlModel, this.formGroup) as FormControl;
    }

    getFormArray(model: DynamicFormArrayModel, group: FormGroup): FormArray {
        return this.formService.findControlByModel(model, group) as FormArray;
    }

    insert(context: DynamicFormArrayModel, index: number) {
        this.formService.insertFormArrayGroup(index, this.getFormArray(context, this.formGroup), context);
    }

    remove(context: DynamicFormArrayModel, index: number) {
        this.formService.removeFormArrayGroup(index, this.getFormArray(context, this.formGroup), context);
    }

    move(context: DynamicFormArrayModel, index: number, step: number) {
        this.formService.moveFormArrayGroup(index, step, this.getFormArray(context, this.formGroup), context);
    }

    clear() {
        this.formService.clearFormArray(this.formArray, this.formArrayModel);
    }

    test() {
        this.sampleFormControlModel.disabled = !this.sampleFormControlModel.disabled;
        this.sampleFormControlModel.value = "Hello Hello";
        //console.log(JSON.stringify(this.exampleModel));
        //this.arrayModel.get(1).group[0].valueUpdates.next("This is just a test");
        //this.formService.moveFormArrayGroup(2, -1, this.arrayControl, this.arrayModel);
        /*
        this.formService.addFormGroupControl(
            this.formGroup,
            this.formModel,
            new DynamicFormGroupModel({
                id: "bsFormGroup3",
                group: [new DynamicInputModel({id: "newInput"})]
            })
        );
        this.formService.addFormGroupControl(
            this.formGroup.get("bsFormGroup3") as FormGroup,
            this.formModel[2] as DynamicFormGroupModel,
            new DynamicInputModel({id: "newInput"})
        );
        */
        //this.exampleModel.add({label: "Option 5", value: "option-5"});
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
