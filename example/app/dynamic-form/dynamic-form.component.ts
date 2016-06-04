import {Component, OnInit} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/common";
import {Control, ControlGroup} from "@angular/common";
import {DYNAMIC_FORM_MODEL} from "./dynamic-form.model";
import {
    DynamicFormService,
    DynamicFormControlModel,
    DynamicFormModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormBasicControlComponent} from "@ng2-dynamic-forms/ui-basic";
import {DynamicFormBootstrapControlComponent} from "@ng2-dynamic-forms/ui-bootstrap";
import {DynamicFormMaterialControlComponent} from "@ng2-dynamic-forms/ui-material";

@Component({

    directives: [FORM_DIRECTIVES, DynamicFormBasicControlComponent, DynamicFormBootstrapControlComponent,
        DynamicFormMaterialControlComponent],
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
    exampleCheckboxModel: DynamicFormControlModel<boolean>;

    constructor(dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = DYNAMIC_FORM_MODEL;
        this.dynamicFormService = dynamicFormService;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createControlGroup(this.dynamicFormModel);

        this.exampleCheckboxControl = <Control> this.form.controls["exampleCheckbox"]; // Type assertion for having updateValue method available
        this.exampleCheckboxModel = this.dynamicFormModel.findById("exampleCheckbox");

        //this.exampleCheckboxControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));
    }

    test() {
        this.exampleCheckboxModel.disabled = !this.exampleCheckboxModel.disabled;
        this.dynamicFormModel.model[1].value = "42";
    }
}
