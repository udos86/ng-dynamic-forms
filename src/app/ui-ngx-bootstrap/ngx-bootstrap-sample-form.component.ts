import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import {
    DynamicFormArrayModel,
    DynamicFormControlModel, DynamicFormGroupModel,
    DynamicFormLayout,
    DynamicFormService, DynamicFormValueControlModel,
    DynamicInputModel
} from "@ng-dynamic-forms/core";
import { NGX_BOOTSTRAP_SAMPLE_FORM_MODEL } from "./ngx-bootstrap-sample-form.model";
import { NGX_BOOTSTRAP_SAMPLE_FORM_LAYOUT } from "./ngx-bootstrap-sample-form.layout";

@Component({
    selector: "dynamic-ngx-bootstrap-sample-form",
    templateUrl: "./ngx-bootstrap-sample-form.component.html",
    encapsulation: ViewEncapsulation.None
})
export class NgxBootstrapSampleFormComponent implements OnInit {

    formModel: DynamicFormControlModel[] = NGX_BOOTSTRAP_SAMPLE_FORM_MODEL;
    formGroup: FormGroup;
    formLayout: DynamicFormLayout = NGX_BOOTSTRAP_SAMPLE_FORM_LAYOUT;

    sampleFormControl: FormControl;
    sampleFormControlModel: DynamicInputModel;

    formArray: FormArray;
    formArrayModel: DynamicFormArrayModel;

    constructor(private formService: DynamicFormService) {
    }

    ngOnInit() {

        this.formGroup = this.formService.createFormGroup(this.formModel);

        this.sampleFormControlModel = this.formService.findModelById<DynamicInputModel>("bsInput", this.formModel);
        this.formArrayModel = this.formService.findModelById<DynamicFormArrayModel>("bsFormArray", this.formModel);

        this.sampleFormControl = this.formService.findControlByModel<FormControl>(this.sampleFormControlModel, this.formGroup);
        this.formArray = this.formService.findControlByModel<FormArray>(this.formArrayModel, this.formGroup);
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

        (this.formArrayModel.get(1).group[0] as DynamicFormValueControlModel<any>).value = "This is just a test";

        this.formService.moveFormArrayGroup(2, -1, this.formArray, this.formArrayModel);

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

        this.formService.detectChanges();
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
