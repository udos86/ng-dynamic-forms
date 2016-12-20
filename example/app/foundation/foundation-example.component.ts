import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormGroup, FormControl, FormArray} from "@angular/forms";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormControlModel,
    DynamicFormArrayModel
} from "@ng2-dynamic-forms/core";
import {FOUNDATION_EXAMPLE_MODEL} from "./foundation-example.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-foundation-example",
    styleUrls: ["../../../node_modules/foundation-sites/dist/css/foundation.css"],
    templateUrl: "./foundation-example.component.html",
    encapsulation: ViewEncapsulation.None
})

export class FoundationExampleComponent implements OnInit {

    formModel: Array<DynamicFormControlModel> = FOUNDATION_EXAMPLE_MODEL;
    form: FormGroup;

    checkboxControl: FormControl;
    checkboxModel: DynamicCheckboxModel;

    arrayControl: FormArray;
    arrayModel: DynamicFormArrayModel;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {

        this.form = this.formService.createFormGroup(this.formModel);

        this.checkboxControl = <FormControl> this.form.controls["foundationCheckbox"]; // Type assertion for having updateValue method available
        this.checkboxModel = <DynamicCheckboxModel> this.formService.findById("foundationCheckbox", this.formModel);

        //this.checkboxControl.valueChanges.subscribe((value: string) => console.log("foundation checkbox field changed to: ", value, typeof value));

        this.arrayControl = <FormArray> this.form.controls["foundationFormArray"];
        this.arrayModel = <DynamicFormArrayModel> this.formService.findById("foundationFormArray", this.formModel);
    }

    insert(context: DynamicFormArrayModel, index: number) {
        this.formService.insertFormArrayGroup(index, this.arrayControl, context);
    }

    remove(context: DynamicFormArrayModel, index: number) {
        this.formService.removeFormArrayGroup(index, this.arrayControl, context);
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