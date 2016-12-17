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

    dynamicFormModel: Array<DynamicFormControlModel>;
    form: FormGroup;

    sampleCheckboxControl: FormControl;
    sampleCheckboxModel: DynamicCheckboxModel;

    sampleArrayControl: FormArray;
    sampleArrayModel: DynamicFormArrayModel;

    constructor(private dynamicFormService: DynamicFormService) {
        this.dynamicFormModel = FOUNDATION_EXAMPLE_MODEL;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createFormGroup(this.dynamicFormModel);

        this.sampleCheckboxControl = <FormControl> this.form.controls["foundationCheckbox"]; // Type assertion for having updateValue method available
        this.sampleCheckboxModel = <DynamicCheckboxModel> this.dynamicFormService.findById("foundationCheckbox", this.dynamicFormModel);
        //this.exampleCheckboxControl.valueChanges.subscribe((value: string) => console.log("foundation checkbox field changed to: ", value, typeof value));

        this.sampleArrayControl = <FormArray> this.form.controls["foundationFormArray"];
        this.sampleArrayModel = <DynamicFormArrayModel> this.dynamicFormService.findById("foundationFormArray", this.dynamicFormModel);
    }

    insert(context: DynamicFormArrayModel, index: number) {
        this.dynamicFormService.insertFormArrayGroup(index, this.sampleArrayControl, context);
    }

    remove(context: DynamicFormArrayModel, index: number) {
        this.dynamicFormService.removeFormArrayGroup(index, this.sampleArrayControl, context);
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