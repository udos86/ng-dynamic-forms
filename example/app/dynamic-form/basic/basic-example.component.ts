import {Component, OnInit} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/common";
import {Control, ControlGroup} from "@angular/common";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormBasicComponent} from "@ng2-dynamic-forms/ui-basic";
import {BASIC_EXAMPLE_MODEL} from "./basic-example.model";

@Component({

    directives: [FORM_DIRECTIVES, DynamicFormBasicComponent],
    moduleId: module.id,
    providers: [DynamicFormService],
    selector: "dynamic-form-basic-example",
    templateUrl: "./basic-example.component.html",
})

export class BasicExampleComponent implements OnInit {

    dynamicFormModel: DynamicFormModel;
    dynamicFormService: DynamicFormService;

    form: ControlGroup;

    exampleCheckboxControl: Control;
    exampleCheckboxModel: DynamicCheckboxModel;

    constructor(dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = BASIC_EXAMPLE_MODEL;
        this.dynamicFormService = dynamicFormService;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createControlGroup(this.dynamicFormModel);

        this.exampleCheckboxControl = <Control> this.form.controls["exampleCheckbox"]; // Type assertion for having updateValue method available
        this.exampleCheckboxModel = <DynamicCheckboxModel> this.dynamicFormModel.findById("exampleCheckbox");

        //this.exampleCheckboxControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));
    }

    test() {
        this.exampleCheckboxModel.disabled = !this.exampleCheckboxModel.disabled;
        this.dynamicFormModel.model[1].value = "42";
    }
}