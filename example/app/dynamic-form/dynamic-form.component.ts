import {Component, OnInit} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/common";
import {Control, ControlGroup} from "@angular/common";
import {DYNAMIC_FORM_MODEL} from "./dynamic-form.model";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicFormModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormBasicComponent} from "@ng2-dynamic-forms/ui-basic";
import {DynamicFormBootstrapComponent} from "@ng2-dynamic-forms/ui-bootstrap";
import {DynamicFormMaterialComponent} from "@ng2-dynamic-forms/ui-material";

@Component({

    directives: [FORM_DIRECTIVES, DynamicFormBasicComponent, DynamicFormBootstrapComponent, DynamicFormMaterialComponent],
    moduleId: module.id,
    providers: [DynamicFormService],
    selector: "dynamic-form",
    templateUrl: "./dynamic-form.component.html",
})

export class DynamicFormComponent implements OnInit {

    dynamicFormModel: DynamicFormModel;
    dynamicFormService: DynamicFormService;

    form: ControlGroup;

    exampleCheckboxControl: Control;
    exampleCheckboxModel: DynamicCheckboxModel;

    constructor(dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = DYNAMIC_FORM_MODEL;
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