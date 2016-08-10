import {Component, OnInit} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, FormArray} from "@angular/forms";
import {DynamicFormService, DynamicCheckboxModel, DynamicFormControlModel, DynamicFormArrayModel} from "@ng2-dynamic-forms/core";
import {DynamicFormBasicComponent} from "@ng2-dynamic-forms/ui-basic";
import {BASIC_EXAMPLE_MODEL, BASIC_EXAMPLE_ARRAY_MODEL} from "./basic-example.model";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES, DynamicFormBasicComponent],
    moduleId: module.id,
    providers: [DynamicFormService],
    selector: "dynamic-form-basic-example",
    templateUrl: "./basic-example.component.html"
})

export class BasicExampleComponent implements OnInit {

    dynamicFormModel1: Array<DynamicFormControlModel>;
    dynamicFormModel2: Array<DynamicFormControlModel>;

    form1: FormGroup;
    form2: FormGroup;

    exampleCheckboxControl: FormControl;
    exampleCheckboxModel: DynamicCheckboxModel;

    basicArrayControl: FormArray;
    basicArrayModel: DynamicFormArrayModel;

    constructor(private dynamicFormService: DynamicFormService) {

        this.dynamicFormModel1 = BASIC_EXAMPLE_MODEL;
        this.dynamicFormModel2 = BASIC_EXAMPLE_ARRAY_MODEL;

        this.form1 = this.dynamicFormService.createFormGroup(this.dynamicFormModel1);
        this.form2 = this.dynamicFormService.createFormGroup(this.dynamicFormModel2);
    }

    ngOnInit() {

        this.exampleCheckboxControl = <FormControl> this.form1.controls["basicCheckbox"]; // Type assertion for having updateValue method available
        this.exampleCheckboxModel = <DynamicCheckboxModel> this.dynamicFormService.findById("basicCheckbox", this.dynamicFormModel1);

        this.basicArrayControl = <FormArray> this.form2.controls["basicFormArray"]; // Type assertion for having updateValue method available
        this.basicArrayModel = <DynamicFormArrayModel> this.dynamicFormService.findById("basicFormArray", this.dynamicFormModel2);

        //this.exampleCheckboxControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));
    }

    add() {
        this.dynamicFormService.addFormArrayGroup(this.basicArrayControl, this.basicArrayModel);
    }

    remove(index: number) {
        this.dynamicFormService.removeFormArrayGroup(index, this.basicArrayControl, this.basicArrayModel);
    }

    clear() {
        this.dynamicFormService.clearFormArray(this.basicArrayControl, this.basicArrayModel);
    }
}