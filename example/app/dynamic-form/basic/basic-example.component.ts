import {Component, OnInit} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl} from "@angular/forms";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormBasicComponent} from "@ng2-dynamic-forms/ui-basic";
import {BASIC_EXAMPLE_MODEL} from "./basic-example.model";

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

    constructor(dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = BASIC_EXAMPLE_MODEL;
        this.dynamicFormService = dynamicFormService;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createFormGroup(this.dynamicFormModel);

        this.exampleCheckboxControl = <FormControl> this.form.controls["exampleCheckbox"]; // Type assertion for having updateValue method available
        this.exampleCheckboxModel = <DynamicCheckboxModel> this.dynamicFormModel.findById("exampleCheckbox");

        //this.exampleCheckboxControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));
    }

    set modelEdit(value: string) {
        try {
            this.dynamicFormModel.items = JSON.parse(value);

        } catch (e) {
            // Just do nothing
        }
    }

    get modelEdit() {
        return JSON.stringify(this.dynamicFormModel.items, null, 2);
    }

    test() {
        this.exampleCheckboxModel.disabled = !this.exampleCheckboxModel.disabled;
        this.dynamicFormModel.items[1].value = "42";
    }
}