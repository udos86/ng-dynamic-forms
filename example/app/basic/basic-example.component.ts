import {Component, OnInit} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, FormArray} from "@angular/forms";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormModel, DynamicFormArrayModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormBasicComponent} from "@ng2-dynamic-forms/ui-basic";
import {BASIC_EXAMPLE_MODEL_ARRAY} from "./basic-example.model";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES, DynamicFormBasicComponent],
    moduleId: module.id,
    providers: [DynamicFormService],
    selector: "dynamic-form-basic-example",
    templateUrl: "./basic-example.component.html",
})

export class BasicExampleComponent implements OnInit {

    dynamicFormModel: DynamicFormModel;
    dynamicFormService: DynamicFormService;

    form: FormGroup;

    exampleCheckboxControl: FormControl;
    exampleCheckboxModel: DynamicCheckboxModel;

    basicArrayControl: FormArray;
    basicArrayModel: DynamicFormArrayModel;

    constructor(dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = BASIC_EXAMPLE_MODEL_ARRAY;
        this.dynamicFormService = dynamicFormService;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createFormGroup(this.dynamicFormModel.group);

        //this.exampleCheckboxControl = <FormControl> this.form.controls["exampleCheckbox"]; // Type assertion for having updateValue method available
        //this.exampleCheckboxModel = <DynamicCheckboxModel> this.dynamicFormModel.findById("exampleCheckbox");

        this.basicArrayControl = <FormArray> this.form.controls["basicArray"]; // Type assertion for having updateValue method available
        this.basicArrayModel = <DynamicFormArrayModel> this.dynamicFormModel.findById("basicArray");

        //this.exampleCheckboxControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));
    }

    set modelEdit(value: string) {
        try {
            this.dynamicFormModel.group = JSON.parse(value);

        } catch (e) {
            // Just do nothing
        }
    }

    get modelEdit() {
        return JSON.stringify(this.dynamicFormModel.group, null, 2);
    }

    add() {

        let newGroup = this.dynamicFormService.createFormArrayGroup(this.basicArrayModel);

        this.basicArrayControl.push(newGroup);

        //this.exampleCheckboxModel.disabled = !this.exampleCheckboxModel.disabled;
        //this.dynamicFormModel.group[1].value = "42";
    }

    remove(index: number) {

        this.basicArrayControl.removeAt(index);
        this.basicArrayModel.removeGroup(index);
    }
}