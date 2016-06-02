import {Component, OnInit} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/common";
import {Control, ControlGroup} from "@angular/common";
import {DYNAMIC_FORM_UI_BASIC_MODEL} from "./dynamic-form-ui-basic.model";
import {
    DynamicFormService,
    DynamicFormControlModel,
    DynamicFormModel
} from "@ng2-dynamic-forms/core";
import {DynamicFormNativeControlComponent} from "@ng2-dynamic-forms/ui-basic";

@Component({

    directives: [FORM_DIRECTIVES, DynamicFormNativeControlComponent],
    moduleId: module.id,
    providers: [DynamicFormService],
    selector: "dynamic-form-ui-basic",
    templateUrl: "./dynamic-form-ui-basic.component.html",
})

export class DynamicFormUIBasicComponent implements OnInit {

    dynamicFormModel: DynamicFormModel;
    dynamicFormService: DynamicFormService;

    form: ControlGroup;

    agreementControl: Control;
    agreementModel: DynamicFormControlModel<boolean>;

    constructor(dynamicFormService: DynamicFormService) {

        this.dynamicFormModel = DYNAMIC_FORM_UI_BASIC_MODEL;
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
