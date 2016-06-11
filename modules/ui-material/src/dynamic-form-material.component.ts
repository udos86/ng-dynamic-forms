import {Component, Input, ViewChild, AfterViewInit} from "@angular/core";
import {ControlGroup} from "@angular/common";
import {MdCheckbox} from "@angular2-material/checkbox";
import {MdInput} from "@angular2-material/input";
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from "@angular2-material/radio";
import {DynamicFormControlModel} from "@ng2-dynamic-forms/core";
import {
    DynamicFormControlComponent,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA
} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_MATERIAL = "MATERIAL";

@Component({

    directives: [MdCheckbox, MdInput, MdRadioButton, MdRadioGroup],
    moduleId: module.id,
    providers: [MdRadioDispatcher],
    selector: "dynamic-form-material-control",
    templateUrl: "./dynamic-form-material.component.html"
})

export class DynamicFormMaterialComponent extends DynamicFormControlComponent implements AfterViewInit {

    @Input() model: DynamicFormControlModel<any>;
    @Input() form: ControlGroup;

    @ViewChild(MdCheckbox) mdCheckbox: MdCheckbox;
    @ViewChild(MdInput) mdInput: MdInput;
    @ViewChild(MdRadioGroup) mdRadioGroup: MdRadioGroup;

    incompatibilities: Array<string> = [DYNAMIC_FORM_CONTROL_TYPE_SELECT, DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA];
    type: string = DYNAMIC_FORM_UI_MATERIAL;

    constructor() {
        super();
    }

    ngAfterViewInit() {
        console.log(this.mdCheckbox, this.mdInput, this.mdRadioGroup);
    }

    get characterCount() {
        return this.mdInput ? this.mdInput.characterCount : 0;
    }
}
