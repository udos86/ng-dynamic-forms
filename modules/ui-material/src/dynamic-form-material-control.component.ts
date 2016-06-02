import {Component, Input, ViewChild, AfterViewInit} from "@angular/core";
import {ControlGroup} from "@angular/common";
import {MdCheckbox} from "@angular2-material/checkbox";
import {MdInput} from "@angular2-material/input";
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from "@angular2-material/radio";
import {DynamicFormControlModel} from "@ng2-dynamic-forms/dynamic-form-control.model";
import {DynamicFormControlComponent} from "@ng2-dynamic-forms/dynamic-form-control.component";

@Component({

    directives: [MdCheckbox, MdInput, MdRadioButton, MdRadioGroup],
    moduleId: module.id,
    providers: [MdRadioDispatcher],
    selector: "dynamic-form-material-control",
    templateUrl: "./dynamic-form-material-control.component.html"
})

export class DynamicFormMaterialControlComponent extends DynamicFormControlComponent implements AfterViewInit {

    @Input() model: DynamicFormControlModel<any>;
    @Input() form: ControlGroup;

    @ViewChild(MdCheckbox) mdCheckbox: MdCheckbox;
    @ViewChild(MdInput) mdInput: MdInput;
    @ViewChild(MdRadioGroup) mdRadioGroup: MdRadioGroup;
    
    constructor() {
        super();
    }

    ngAfterViewInit() {
        console.log(this.mdCheckbox, this.mdInput, this.mdRadioGroup);
    }
    
    get characterCount () {
        return this.mdInput ? this.mdInput.characterCount : 0;
    }
}
