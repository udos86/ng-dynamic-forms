import {Component, OnInit} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/common";
import {Control, ControlGroup} from "@angular/common";
import {DYNAMIC_FORM_MODEL} from "./dynamic-form.model";
import {
    DynamicFormService,
    DynamicFormControlModel,
    DynamicFormModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormNativeControlComponent} from "@ng2-dynamic-forms/ui-basic";
import {DynamicFormMaterialControlComponent} from "@ng2-dynamic-forms/ui-material";

@Component({

    directives: [FORM_DIRECTIVES, DynamicFormNativeControlComponent, DynamicFormMaterialControlComponent],
    moduleId: module.id,
    providers: [DynamicFormService],
    selector: "dynamic-form",
    templateUrl: "./dynamic-form.component.html",
})

export class DynamicFormComponent implements OnInit {

    dynamicFormModel: DynamicFormModel;
    dynamicFormService: DynamicFormService;

    form: ControlGroup;

    agreementControl: Control;
    agreementModel: DynamicFormControlModel<boolean>;

    constructor(dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = DYNAMIC_FORM_MODEL;
        this.dynamicFormService = dynamicFormService;
    }

    ngOnInit() {

        this.form = this.dynamicFormService.createControlGroup(this.dynamicFormModel);

        this.agreementControl = <Control> this.form.controls["agreement"]; // Type assertion for having updateValue method available
        this.agreementModel = this.dynamicFormModel.findById("agreement");

        //this.agreementControl.valueChanges.subscribe((value: string) => console.log("agreement field changed to: ", value, typeof value));
    }

    test() {
        this.agreementModel.disabled = !this.agreementModel.disabled;
        this.dynamicFormModel.items[1].value = "42";
    }
}
