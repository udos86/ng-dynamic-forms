import {Component, OnInit} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/common";
import {Control, ControlGroup} from "@angular/common";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormMaterialComponent} from "@ng2-dynamic-forms/ui-material";
import {MATERIAL_EXAMPLE_MODEL} from "./material-example.model";

@Component({

    directives: [FORM_DIRECTIVES, DynamicFormMaterialComponent],
    moduleId: module.id,
    providers: [DynamicFormService],
    selector: "dynamic-form-material-example",
    templateUrl: "./material-example.component.html",
})

export class MaterialExampleComponent implements OnInit {

    dynamicFormModel: DynamicFormModel;
    dynamicFormService: DynamicFormService;

    form: ControlGroup;

    exampleCheckboxControl: Control;
    exampleCheckboxModel: DynamicCheckboxModel;

    constructor(dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = MATERIAL_EXAMPLE_MODEL;
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