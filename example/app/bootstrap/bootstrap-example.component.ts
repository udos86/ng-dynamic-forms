import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormGroup, FormControl, FormArray} from "@angular/forms";
import {
    DynamicFormService,
    DynamicFormControlModel,
    DynamicFormGroupModel,
    DynamicFormArrayModel,
    DynamicInputModel
} from "@ng2-dynamic-forms/core";
import {BOOTSTRAP_EXAMPLE_MODEL} from "./bootstrap-example.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-bootstrap-example",
    styleUrls: ["../../../node_modules/bootstrap/dist/css/bootstrap.min.css"],
    templateUrl: "./bootstrap-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class BootstrapExampleComponent implements OnInit {

    dynamicFormModel: Array<DynamicFormControlModel>;
    form: FormGroup;

    exampleControl: FormControl;
    exampleModel: DynamicInputModel;

    sampleArrayControl: FormArray;
    sampleArrayModel: DynamicFormArrayModel;

    constructor(private dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = BOOTSTRAP_EXAMPLE_MODEL;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createFormGroup(this.dynamicFormModel);

        this.exampleControl = <FormControl> this.form.get("bootstrapFormGroup1").get("bootstrapInput"); // Type assertion for having updateValue method available
        this.exampleModel = <DynamicInputModel> this.dynamicFormService.findById(
            "bootstrapInput", (<DynamicFormGroupModel> this.dynamicFormModel[0]).group);
        //this.exampleControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));

        this.sampleArrayControl = <FormArray> this.form.get("bootstrapFormGroup2").get("bootstrapFormArray");
        this.sampleArrayModel = <DynamicFormArrayModel> this.dynamicFormService.findById(
            "bootstrapFormArray", this.dynamicFormModel);
    }

    add() {
        this.dynamicFormService.addFormArrayGroup(this.sampleArrayControl, this.sampleArrayModel);
    }

    insert(context: DynamicFormArrayModel, index: number) {
        this.dynamicFormService.insertFormArrayGroup(index, this.sampleArrayControl, context);
    }

    remove(context: DynamicFormArrayModel, index: number) {
        this.dynamicFormService.removeFormArrayGroup(index, this.sampleArrayControl, context);
    }

    clear() {
        this.dynamicFormService.clearFormArray(this.sampleArrayControl, this.sampleArrayModel);
    }

    set modelEdit(value: string) {
        try {
            this.dynamicFormModel = JSON.parse(value);
            console.log(JSON.parse(value));
        } catch (e) {
            // Just do nothing
        }
    }

    get modelEdit() {
        return JSON.stringify(this.dynamicFormModel, null, 2);
    }

    test() {
        //this.exampleModel.disabledUpdates.next(!this.exampleModel.disabled);
        this.exampleModel.valueUpdates.next("Hello Hello");
        //console.log(JSON.stringify(this.exampleModel));
    }

    onBlur($event) {
        console.log(`blur event on ${$event.target.id}: `, $event);
    }

    onFocus($event) {
        console.log(`focus event on ${$event.target.id}: `, $event);
    }
}